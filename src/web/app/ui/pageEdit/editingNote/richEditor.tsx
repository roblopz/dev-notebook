import React, { useState, useCallback, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
  }
});

const richButtonsPlugin = createRichButtonsPlugin();
const styleToPropsPlugin = createStyleToPropsPlugin();

export interface IPersisteValues {
  editorContent: string;
  plainTextContent: string;
  htmlContent: string;
}

export interface IRichEditorProps {
  value: string;
  className?: string;
  persistValues: ({ editorContent, plainTextContent, htmlContent }: IPersisteValues) => void;
  persistSubject: Subject<void>;
}

function RichEditor({ value, className, persistValues, persistSubject }: IRichEditorProps) {
  const classes = makeStyles(getStyles)({});

  const [state, setState] = useState({
    editorState: value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  });

  useEffect(() => {
    setState({
      editorState: value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
    });
  }, [value]);

  const onEditorChange = useCallback((editorState: EditorState) => {
    setState(state => ({ editorState }));
  }, []);

  const persistSubscription = useRef<Subscription>(null);
  useEffect(() => {
    persistSubscription.current = persistSubject.subscribe(() => {
      const editorContent = state.editorState.getCurrentContent();

      let serializedEditorContent = '';
      if (editorContent.hasText())
        serializedEditorContent = JSON.stringify(convertToRaw(editorContent));
      
      const htmlContent = stateToHTML(state.editorState.getCurrentContent(), { inlineStyles: toHtmlInlineStyles });
      const plainTextContent = state.editorState.getCurrentContent().getPlainText();

      persistValues({
        editorContent: serializedEditorContent,
        plainTextContent,
        htmlContent: plainTextContent ? htmlContent : ''
      });
    });

    return () => persistSubscription.current && persistSubscription.current.unsubscribe();
  }, [state, persistSubject, persistValues]);

  return (
    <div {...{ ...(className && { className }) }}>
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
    </div>
  );
}

RichEditor.propTypes = {
  value: propTypes.string,
  className: propTypes.string,
  persistValues: propTypes.func.isRequired,
  persistSubject: propTypes.object.isRequired
};

export default RichEditor;