import React, { useRef, useMemo } from 'react';
import ResizableBlock from '../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';

import { getStyles } from '../../styles/jss/note/codeEditor';
import { ISnippet } from '../../redux/store/definitions';

export interface ICodeEditorProps {
  onChange: (val: ISnippet) => void;
  snippet: ISnippet;
  className?: string;
  hide: boolean;
  toggleHide: (hide: boolean) => void;
}

function CodeEditor({ snippet, hide, toggleHide, onChange, className }: ICodeEditorProps) {
  const classes = makeStyles(getStyles)();
  const editorRef = useRef<MonacoEditor>(null);

  const availableLanguages = useMemo(() => {
    return monaco.languages.getLanguages().sort((a, b) => {
      return a.aliases[0].localeCompare(b.aliases[0]);
    });
  }, []);

  return (
    <div {...{...(className && { className })}}>
      <div className="position-relative">
        <FormControlLabel control={
          <Switch checked={!hide} color="primary"
            onChange={evt => toggleHide(!evt.target.checked)}
            classes={{ switchBase: classes.switchBase }} />
          } label="Code" className={classes.switchLabelWrapper}
          classes={{ label: classes.switchLabelText }} />
      </div>

      <Collapse in={!hide}>
        <select className="my-2" value={snippet.language}
          onChange={evt => onChange({ code: snippet.code, language: evt.target.value })}>
          {availableLanguages.map(language => (
            <option key={language.id} value={language.id}>{language.aliases[0]}</option>
          ))}
        </select>

        <ResizableBlock className="position-relative" axis="y" resizerPosition="left"
          limits={{ heightMin: 100, heightMax: 700 }}>
          {({ dimensionStyles }) => {
            return (
              <MonacoEditor theme="vs" ref={editorRef}
                value={snippet.code}
                onChange={val => onChange({ code: val, language: snippet.language })}
                language={snippet.language}
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

export default CodeEditor;