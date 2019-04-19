import React, { useState } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DraftJSEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';

import { getRichEditorStyle as getStyle } from '../../styles/jss/note/richEditor';
import createStyleToPropsPlugin from '../../lib/draftJsStyleToProps';
import RichEditorToolbar from './richEditorToolbar';

const richButtonsPlugin = createRichButtonsPlugin();
const styleToPropsPlugin = createStyleToPropsPlugin();

function RichEditor() {
  const classes = makeStyles(getStyle)();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>     
      <div className={classes.editorWrapper}>
        <RichEditorToolbar EditorPlugins={{ 
          StyleToPropsPlugin: styleToPropsPlugin, 
          RichButtonsPlugin: richButtonsPlugin 
          }} />

        <div className="p-2">
          <DraftJSEditor editorState={editorState}
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