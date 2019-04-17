import React from 'react';
import { EditorState, EditorProps, Editor, RichUtils, SelectionState, Modifier } from 'draft-js';
import { KeyValueOf } from 'src/web/app/lib/tsUtil';

export interface DraftJsPluginFunctions {
  getPlugins: () => [any];
  getProps: () => EditorProps;
  getEditorState: () => EditorState;
  getReadOnly: () => boolean;
  setReadOnly: (readOnly: boolean) => void;
  setEditorState: (editorState: EditorState) => void;
  getEditorRef: () => Editor;
}

export interface StyleRenderComponentProps<T extends {}> {
  children(props: {
    styleKeys: { [K in keyof T]: K };
    activeStyles: string[],
    toggleInlineStyle: (style: string) => (evt: React.SyntheticEvent) => void;
    onMouseDown: React.EventHandler<React.MouseEvent>;
  }): JSX.Element;
}

interface StyleRenderPropsPlugin<T> {  
  editorState: EditorState | null;
  setEditorState: (editorState: EditorState) => void;  
  customStyleMap: KeyValueOf<T>;
  styleKeys: {[K in keyof T]: K};
  initialize: (pluginFunctions: DraftJsPluginFunctions) => void;
  onChange: (newEditorState: EditorState) => EditorState;
  StyleRenderProps?: React.FunctionComponent<StyleRenderComponentProps<T>>;  
}

const plugin = <T extends {}>(customStyleMap: KeyValueOf<T>): StyleRenderPropsPlugin<T> => {
  const styleKeys = Object.keys(customStyleMap).reduce((acc, curr) => {
    acc[curr] = curr;
    return acc;
  }, {}) as {[K in keyof T]: K};

  let _plugin: StyleRenderPropsPlugin<T> = {
    editorState: null,
    setEditorState: null,
    customStyleMap,
    styleKeys,

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

  _plugin.StyleRenderProps = function (this: StyleRenderPropsPlugin<T>, { children }: StyleRenderComponentProps<T>) {
    const activeStyles = this.editorState ? Object.keys(this.customStyleMap).map(style => {            
      return (style && this.editorState.getCurrentInlineStyle().has(style)) ? style : ''
    }).filter(v => !!v) : [];

    return children({
      activeStyles,
      styleKeys: this.styleKeys,

      toggleInlineStyle: (style: string) => {
        return async (evt) => {          
          evt.preventDefault();
          this.setEditorState && this.setEditorState(RichUtils.toggleInlineStyle(this.editorState, style))          
        }
      },

      onMouseDown: (evt) => evt.preventDefault()
    });
  }.bind(_plugin)

  return _plugin as StyleRenderPropsPlugin<T>;
};

export default plugin;