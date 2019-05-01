import React, { useState } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DraftJsEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import Typography from '@material-ui/core/Typography';
import RateReviewIcon from '@material-ui/icons/RateReviewOutlined';

import { getRichEditorStyle as getStyle } from '../../styles/jss/note/richEditor';
import createStyleToPropsPlugin from 'draft-js-styletoprops-plugin';
import RichEditorToolbar from './richEditorToolbar';

export interface IRichEditorProps {
  className?: string;
}

const richButtonsPlugin = createRichButtonsPlugin();
const styleToPropsPlugin = createStyleToPropsPlugin();

function RichEditor({ className }: IRichEditorProps) {
  const classes = makeStyles(getStyle)();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div {...{ ...(className && { className }) }}>
      <Typography variant="subtitle2" className="font-weight-bold mb-2" component="label">
        <RateReviewIcon fontSize="small" className={classes.noteTitleIcon} />
        Content
      </Typography>

      <div className={classes.editorWrapper}>
        <RichEditorToolbar EditorPlugins={{
          StyleToPropsPlugin: styleToPropsPlugin,
          RichButtonsPlugin: richButtonsPlugin
        }} />

        <div className="p-2">
          <DraftJsEditor editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
            plugins={[styleToPropsPlugin, richButtonsPlugin]} />
        </div>
      </div>
    </div>
  );
}

RichEditor.propTypes = {
  className: propTypes.string
};

export default RichEditor;