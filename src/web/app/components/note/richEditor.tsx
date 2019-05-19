import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import DraftJsEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import { convertFromRaw, convertToRaw } from 'draft-js';

import { getRichEditorStyle as getStyle } from '../../styles/jss/note/richEditor';
import createStyleToPropsPlugin from 'draft-js-styletoprops-plugin';
import RichEditorToolbar from './richEditorToolbar';

export interface IRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  hide: boolean;
  toggleHide: (hide: boolean) => void;
}

const richButtonsPlugin = createRichButtonsPlugin();
const styleToPropsPlugin = createStyleToPropsPlugin();

function RichEditor({ value, hide, toggleHide, onChange, className }: IRichEditorProps) {
  const classes = makeStyles(getStyle)();
  const [editorState, setEditorState] = useState(
    value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  );

  const onEditorChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
    const editorContent = editorState.getCurrentContent();

    if (editorContent.hasText()) {
      const serializedEditorContent = JSON.stringify(convertToRaw(editorContent));
      onChange(serializedEditorContent);
    } else {
      onChange('');
    }
  }, []);

  return (
    <div {...{ ...(className && { className }) }}>
      <FormControlLabel control={
        <Switch checked={!hide} color="primary"
          onChange={evt => toggleHide(!evt.target.checked)}
          classes={{ switchBase: classes.switchBase }} />
        } label="Content" className={classes.switchLabelWrapper}
        classes={{ label: classes.switchLabelText }} />

      <Collapse in={!hide}>
        <div className={classes.editorWrapper}>
          <RichEditorToolbar EditorPlugins={{
            StyleToPropsPlugin: styleToPropsPlugin,
            RichButtonsPlugin: richButtonsPlugin
          }} />

          <div className="p-2">
            <DraftJsEditor editorState={editorState}
              onChange={onEditorChange}
              plugins={[styleToPropsPlugin, richButtonsPlugin]} />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

RichEditor.propTypes = {
  className: propTypes.string
};

export default RichEditor;