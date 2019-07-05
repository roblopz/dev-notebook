import React, { useState, useCallback, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import DraftJsEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Subscription, Subject } from 'rxjs';

import createStyleToPropsPlugin from 'draft-js-styletoprops-plugin';
import RichEditorToolbar, { toHtmlInlineStyles } from './richEditorToolbar';

const getStyles = (theme: any) => ({
  editorWrapper: {
    border: '1px solid #d1d1d1',
    borderRadius: '4px'
  },
  noteTitleIcon: {
    marginRight: '2px'
  },
  switchBase: {
    height: 'unset !important'
  },
  switchLabelWrapper: {
    marginLeft: '-8px',
  },
  switchLabelText: {
    position: 'relative' as 'relative',
    left: '-8px',
    fontWeight: 500
  }
});

const richButtonsPlugin = createRichButtonsPlugin();
const styleToPropsPlugin = createStyleToPropsPlugin();

export interface IPersisteValues {
  editorContent: string;
  plainTextContent: string;
  htmlContent: string;
  hideContent: boolean;
}

export interface IRichEditorProps {
  value: string;
  className?: string;
  hide: boolean;
  persistValues: ({ editorContent, plainTextContent, htmlContent, hideContent }: IPersisteValues) => void;
  persistSubject: Subject<void>;
}

function RichEditor({ value, hide, className, persistValues, persistSubject }: IRichEditorProps) {
  const classes = makeStyles(getStyles)({});
  const [state, setState] = useState({
    hidecontent: hide,
    editorState: value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  });

  const onEditorChange = useCallback((editorState: EditorState) => {
    setState(state => ({ editorState, hidecontent: state.hidecontent }));
  }, []);

  const onHideChange = useCallback((hide: boolean) => {
    setState(state => ({ editorState: state.editorState, hidecontent: hide }));
  }, []);

  const persistSubscription = useRef<Subscription>(null);
  useEffect(() => {
    persistSubscription.current = persistSubject.subscribe(() => {
      const editorContent = state.editorState.getCurrentContent();

      let serializedEditorContent = '';
      if (editorContent.hasText())
        serializedEditorContent = JSON.stringify(convertToRaw(editorContent));
      
      const htmlContent = stateToHTML(state.editorState.getCurrentContent(), { inlineStyles: toHtmlInlineStyles });

      persistValues({
        editorContent: serializedEditorContent,
        plainTextContent: state.editorState.getCurrentContent().getPlainText(),
        htmlContent: htmlContent && htmlContent !== '<p><br></p>' ? htmlContent  : '',
        hideContent: state.hidecontent
      });
    });

    return () => persistSubscription.current && persistSubscription.current.unsubscribe();
  }, [state, persistSubject, persistValues]);

  return (
    <div {...{ ...(className && { className }) }}>
      <FormControlLabel control={
        <Switch checked={!state.hidecontent} color="primary"
          onChange={evt => onHideChange(!evt.target.checked)}
          classes={{ switchBase: classes.switchBase }} />
        } label="Content" className={classes.switchLabelWrapper}
        classes={{ label: classes.switchLabelText, root: 'mb-0' }} />

      <Collapse in={!state.hidecontent}>
        <div className={classes.editorWrapper}>
          <RichEditorToolbar EditorPlugins={{
            StyleToPropsPlugin: styleToPropsPlugin,
            RichButtonsPlugin: richButtonsPlugin
          }} />

          <div className="p-2">
            <DraftJsEditor editorState={state.editorState}
              onChange={onEditorChange}
              plugins={[styleToPropsPlugin, richButtonsPlugin]} />
          </div>
        </div>
      </Collapse>
    </div>
  );
}

RichEditor.propTypes = {
  value: propTypes.string,
  className: propTypes.string,
  hide: propTypes.bool,
  persistValues: propTypes.func.isRequired,
  persistSubject: propTypes.object.isRequired
};

export default RichEditor;