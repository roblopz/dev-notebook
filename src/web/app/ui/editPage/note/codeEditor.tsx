import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import ResizableBlock from '../../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import { Subscription, Subject } from 'rxjs';

import { ISnippet } from '../../../graphql/models';

const getStyles = (theme: any) => ({
  languagesSelect: {
    display: 'flex',
    alignItems: 'center'

  },
  noteTitleIcon: {
    marginRight: '2px',
    position: 'relative' as 'relative',
    top: -1
  },
  switchBase: {
    height: 'unset !important'
  },
  switchLabelWrapper: {
    marginLeft: '-8px',
    marginBottom: 0
  },
  switchLabelText: {
    position: 'relative' as 'relative',
    left: '-8px',
    fontWeight: 500
  }
});

export interface ICodeEditorProps {
  snippet: ISnippet;
  className?: string;
  hide: boolean;
  persistValues: ({ snippet, hideSnippet }: { snippet: ISnippet, hideSnippet: boolean }) => void;
  persistSubject: Subject<void>;
}

function CodeEditor({ snippet, hide, className, persistValues, persistSubject }: ICodeEditorProps) {
  const classes = makeStyles(getStyles)({});
  const editorRef = useRef<MonacoEditor>(null);
  const [state, setState] = useState({
    hideSnippet: hide,
    code: snippet.code,
    language: snippet.language
  });

  const availableLanguages = useMemo(() => {
    return monaco.languages.getLanguages().sort((a, b) => {
      return a.aliases[0].localeCompare(b.aliases[0]);
    });
  }, []);

  const onCodeChange = useCallback((code: string) => {
    setState(state => ({ ...state, code }));
  }, []);

  const onHideChange = useCallback((hide: boolean) => {
    setState(state => ({ ...state, hideSnippet: hide }));
  }, []);

  const onLanguageChange = useCallback((language: string) => {
    setState(state => ({ ...state, language }));
  }, []);

  const persistSubscription = useRef<Subscription>(null);
  useEffect(() => {
    persistSubscription.current = persistSubject.subscribe(() => {
      const htmlCode = (editorRef.current.editor as any)._modelData.viewModel.getHTMLToCopy(
        [editorRef.current.editor.getModel().getFullModelRange()], false
      );

      persistValues({
        snippet: { code: state.code, language: state.language, htmlCode: htmlCode || '' },
        hideSnippet: state.hideSnippet
      });
    });

    return () => persistSubscription.current && persistSubscription.current.unsubscribe();
  }, [state, persistSubject, persistValues]);

  return (
    <div {...{...(className && { className })}}>
      <div className="position-relative">
        <FormControlLabel control={
          <Switch checked={!state.hideSnippet} color="primary"
            onChange={evt => onHideChange(!evt.target.checked)}
            classes={{ switchBase: classes.switchBase }} />
          } label="Code" className={classes.switchLabelWrapper}
          classes={{ label: classes.switchLabelText, root: 'mb-0' }} />
      </div>

      <Collapse in={!state.hideSnippet}>
        <select className="mb-2" value={state.language}
          onChange={evt => onLanguageChange(evt.target.value)}>
          {availableLanguages.map(language => (
            <option key={language.id} value={language.id}>{language.aliases[0]}</option>
          ))}
        </select>

        <ResizableBlock className="position-relative" axis="y" resizerPosition="left"
          limits={{ heightMin: 100, heightMax: 700 }}>
          {({ dimensionStyles }) => {
            return (
              <MonacoEditor theme="vs" ref={editorRef}
                value={state.code}
                onChange={val => onCodeChange(val)}
                language={state.language}
                height={dimensionStyles.height || 100}
                width={dimensionStyles.width || 0}
                options={{
                  minimap: { enabled: false },
                  showUnused: false,
                  lineNumbersMinChars: 3,
                  scrollBeyondLastLine: false
                }} />
            );
          }}
        </ResizableBlock>
      </Collapse>
    </div>
  );
}

CodeEditor.propTypes = {
  snippet: propTypes.object.isRequired,
  className: propTypes.string,
  hide: propTypes.bool,
  persistValues: propTypes.func.isRequired,
  persistSubject: propTypes.object.isRequired
};

export default CodeEditor;