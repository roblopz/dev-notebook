import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import ResizableBlock from '../../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { Subscription, Subject } from 'rxjs';

import { ISnippet } from '../../../graphql/models';

export interface ICodeEditorProps {
  snippet: ISnippet;
  className?: string;
  persistValues: ({ snippet }: { snippet: ISnippet }) => void;
  persistSubject: Subject<void>;
}

const editorLineHeight = 18;
const editorMinHeight = 100;
const editorMaxHeight = 350;

function CodeEditor({ snippet, className, persistValues, persistSubject }: ICodeEditorProps) {
  const editorRef = useRef<MonacoEditor>(null);
  const adjustEditor = useRef<(height?: number, width?: number) => void>(null);

  const [state, setState] = useState({
    code: snippet.code,
    language: snippet.language
  });
  
  useEffect(() => {
    const codeLines = (snippet.code || '').split(/\r\n|\r|\n/).length;
    const targetEditorHeight = codeLines * editorLineHeight;

    const newHeight = targetEditorHeight > editorMaxHeight ? editorMaxHeight : targetEditorHeight;
    adjustEditor.current(newHeight);

    setState({
      code: snippet.code,
      language: snippet.language
    });
  }, [snippet]);

  const availableLanguages = useMemo(() => {
    return monaco.languages.getLanguages().sort((a, b) => {
      return a.aliases[0].localeCompare(b.aliases[0]);
    });
  }, []);

  const onCodeChange = useCallback((code: string) => {
    setState(state => ({ ...state, code }));
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
        snippet: { code: state.code, language: state.language, htmlCode: htmlCode || '' }
      });
    });

    return () => persistSubscription.current && persistSubscription.current.unsubscribe();
  }, [state, persistSubject, persistValues]);

  const getLanguageID = useCallback((languageAlias) => {
    const lang = availableLanguages.find(l => l.aliases[0] === languageAlias);
    return lang ? lang.id : 'javascript';
  }, [availableLanguages]);

  return (
    <div {...{ ...(className && { className }) }}>
      <select className="mb-2" value={state.language}
        onChange={evt => onLanguageChange(evt.target.value)}>
        {availableLanguages.map(language => (
          <option key={language.id} value={language.aliases[0]}>{language.aliases[0]}</option>
        ))}
      </select>
      
      <ResizableBlock className="position-relative" axis="y" resizerPosition="left"
        limits={{ heightMin: editorMinHeight, heightMax: editorMaxHeight }}>
        {({ dimensionStyles, adjust }) => {
          if (!adjustEditor.current)
            adjustEditor.current = adjust;
          
          return (
            <MonacoEditor theme="vs" ref={editorRef}
              value={state.code}
              onChange={val => onCodeChange(val)}
              height={dimensionStyles.height || editorMaxHeight}
              width={dimensionStyles.width}
              language={getLanguageID(state.language)}
              options={{
                minimap: { enabled: false },
                showUnused: false,
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false
              }} />
          );
        }}
      </ResizableBlock>
    </div>
  );
}

CodeEditor.propTypes = {
  className: propTypes.string,
  snippet: propTypes.object.isRequired,
  persistValues: propTypes.func.isRequired,
  persistSubject: propTypes.object.isRequired
};

export default CodeEditor;