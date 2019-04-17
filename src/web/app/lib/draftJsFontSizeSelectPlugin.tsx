import React from 'react';
import { EditorState, EditorProps, Editor, RichUtils, SelectionState, Modifier } from 'draft-js';

export interface DraftJsPluginFunctions {
  getPlugins: () => [any];
  getProps: () => EditorProps;
  getEditorState: () => EditorState;
  getReadOnly: () => boolean;
  setReadOnly: (readOnly: boolean) => void;
  setEditorState: (editorState: EditorState) => void;
  getEditorRef: () => Editor;
}

export interface FontSizeSelectComponentProps {  
}

interface FontSizeDropdownPlugin {
  // js-draft-plugin
  editorState: EditorState | null;
  customStyleMap: { [style: string]: { fontSize: string } };
  setEditorState: (editorState: EditorState) => void;
  initialize: (pluginFunctions: DraftJsPluginFunctions) => void;
  onChange: (newEditorState: EditorState) => EditorState;
  // custom  
  fonts: { style: string, display: string }[];
  getActiveFont?(): string | null;
  toggleFontStyle?(evt: React.ChangeEvent<HTMLSelectElement>): void;
  multipleFontsSelected?(): boolean;
  FontSizeSelect?: React.FunctionComponent;
}

type PluginBuilder = 
  (fontSizesParam: { style: string, display: string }[] | string[] | number[]) => FontSizeDropdownPlugin;

const isNumbArr = (arr: any): arr is number[] =>
  Array.isArray(arr) && arr.length && typeof arr[0] === 'number';

const isStrArr = (arr: any): arr is string[] =>
  Array.isArray(arr) && arr.length && typeof arr[0] === 'string';

// From js-utils
function getSelectedBlocksList(editorState: EditorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  
  return blockMap.toSeq()
                 .skipUntil((_, k) => k === startKey)
                 .takeUntil((_, k) => k === endKey)
                 .concat([[endKey, blockMap.get(endKey)]])
                 .toList();
}

const pluginBuilder: PluginBuilder = (fontSizesParam) => {   
  let customStyleMap: { [style: string]: { fontSize: string } }, fonts: { style: string, display: string }[];

  if (isNumbArr(fontSizesParam)) {
    customStyleMap = {
      ...fontSizesParam.reduce((acc, curr) => {
        acc[`FONTSIZE_${curr}`] = { fontSize: `${curr}px` };
        return acc;
      }, {})
    };
  } else if (isStrArr(fontSizesParam)) {
    customStyleMap = {
      ...fontSizesParam.reduce((acc, curr) => {
        acc[`FONTSIZE_${curr}`] = { fontSize: curr };
        return acc;
      }, {})
    };
  } else {
    customStyleMap = {
      ...fontSizesParam.reduce((acc, curr) => {
        acc[`FONTSIZE_${curr.display}`] = { fontSize: curr.style }
        return acc;
      }, {})
    };

    fonts = fontSizesParam.map(f => ({ style: f.style, display: f.display }));
  }

  let _plugin: FontSizeDropdownPlugin = {
    editorState: null,
    setEditorState: null,
    customStyleMap,
    fonts: fonts || Object.keys(customStyleMap).map(k => ({ style: k, display: customStyleMap[k].fontSize })),

    initialize({ getEditorState, setEditorState }) {
      this.editorState = getEditorState();
      this.setEditorState = setEditorState;
    },

    onChange(newEditorState: EditorState) {
      if (newEditorState !== this.editorState) {
        this.editorState = newEditorState;
      }

      return newEditorState;
    }    
  };

  _plugin.getActiveFont = function(this: FontSizeDropdownPlugin) {
    return this.editorState ? this.editorState.getCurrentInlineStyle().findKey((v, k) => {
      return Object.keys(this.customStyleMap).some(csk => csk === k);
    }) : null;
  }.bind(_plugin);

  _plugin.multipleFontsSelected = function (this: FontSizeDropdownPlugin) {
    if (!this.editorState)
      return false;

    const currentSelection = this.editorState.getSelection();
    if (currentSelection.isCollapsed())
      return false;

    let inlineKey, toggledFontStyles: string[] = [], allFontStyles = this.fonts.map(f => f.style);
    const start = currentSelection.getStartOffset();
    const end = currentSelection.getEndOffset();
    const selectedBlocks = getSelectedBlocksList(this.editorState);

    if (selectedBlocks.size > 0) {
      for (let i = 0; i < selectedBlocks.size; i += 1) {
        let blockStart = i === 0 ? start : 0;
        let blockEnd = i === (selectedBlocks.size - 1) ? end : selectedBlocks.get(i).getText().length;
        if (blockStart === blockEnd && blockStart === 0) {
          blockStart = 1;
          blockEnd = 2;
        } else if (blockStart === blockEnd) {
          blockStart -= 1;
        }

        for (let j = blockStart; j < blockEnd; j += 1) {
          const inlineStylesAtOffset = selectedBlocks.get(i).getInlineStyleAt(j);

          if (inlineStylesAtOffset) {
            inlineKey = Object.keys(inlineStylesAtOffset.toObject())[0];
            if (allFontStyles.includes(inlineKey) && !toggledFontStyles.includes(inlineKey)) {
              toggledFontStyles.push(inlineKey);
              if (toggledFontStyles.length > 1)
                return true;
            }
          }
        }
      }
    }

    return false;
  }.bind(_plugin);

  _plugin.toggleFontStyle = function (this: FontSizeDropdownPlugin, evt: React.ChangeEvent<HTMLSelectElement>) {
    let toggleFontStyle: string;

    if ((toggleFontStyle = evt.target.value) && this.customStyleMap[toggleFontStyle]) {
      let newEditorState = this.editorState;
      const selectionState = this.editorState.getSelection();
      
      // Restore focus to last position, if not there already
      if (!selectionState.getHasFocus()) {
        const restoreFocusSelection = selectionState.merge({
          anchorOffset: selectionState.getAnchorOffset(),
          focusOffset: selectionState.getFocusOffset(),
          hasFocus: true
        }) as SelectionState;

        newEditorState = EditorState.forceSelection(this.editorState, restoreFocusSelection);
      }

      // Selecting text -> Make sure any font style is overlapping
      if ((selectionState.getFocusOffset() - selectionState.getAnchorOffset()) > 0) {
        Object.keys(this.customStyleMap).forEach(fontStyle => {
          newEditorState = EditorState.push(
            newEditorState,
            Modifier.removeInlineStyle(newEditorState.getCurrentContent(), selectionState, fontStyle),
            'change-inline-style'
          );
        });
      } else { // Cursor only
        const activeFont = this.getActiveFont();
        if (activeFont)
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, activeFont);         
      }

      this.setEditorState(RichUtils.toggleInlineStyle(newEditorState, toggleFontStyle));
    }
  }.bind(_plugin);

  _plugin.FontSizeSelect = function (this: FontSizeDropdownPlugin) {
    const activeFont = this.getActiveFont();
    const multipleActive = this.multipleFontsSelected();    

    return (
      <select value={multipleActive ? '' : this.getActiveFont() || ''} onChange={this.toggleFontStyle}>
        {!activeFont && !multipleActive ? <option value={''}>Default</option> : null}
        {multipleActive ? <option value={''} /> : null}
        {this.fonts.map(font => (
          <option key={font.style} value={font.style}>{font.display}</option>
        ))}
      </select>
    );
  }.bind(_plugin)

  return _plugin as FontSizeDropdownPlugin;
};

export default pluginBuilder;