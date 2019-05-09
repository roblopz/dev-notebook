import React, { useRef, useState, useMemo } from 'react';
import ResizableBlock from '../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/CodeRounded';

import { getStyles } from '../../styles/jss/note/codeEditor';

export interface ICodeEditorProps {
  className?: string;
}

function CodeEditor({ className }: ICodeEditorProps) {
  const classes = makeStyles(getStyles)();
  const editorRef = useRef<MonacoEditor>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const availableLanguages = useMemo(() => {
    return monaco.languages.getLanguages().sort((a, b) => {
      return a.aliases[0].localeCompare(b.aliases[0]);
    });
  }, []);

  return (
    <div {...{...(className && { className })}}>
      <div className="position-relative">
        <Typography variant="subtitle2" className="font-weight-bold mb-2" component="label">
          <CodeIcon fontSize="small" className={classes.noteTitleIcon} />
          Code
        </Typography>

        <div className={classes.languagesSelect}>
          <Typography variant="subtitle2" component="label" className="mx-2" color="textSecondary">
            Language
          </Typography>

          <select onChange={(evt) => setSelectedLanguage(evt.target.value)} value={selectedLanguage}>
            {availableLanguages.map(language => (
              <option key={language.id} value={language.id}>{language.aliases[0]}</option>
            ))}
          </select>
        </div>
      </div>

      <ResizableBlock className="position-relative" axis="y" resizerPosition="left"
        limits={{ heightMin: 100, heightMax: 700 }}>
        {({ dimensionStyles }) => {
          return (
            <MonacoEditor ref={editorRef}
              language={selectedLanguage} theme="vs"
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
    </div>
  );
}

export default CodeEditor;