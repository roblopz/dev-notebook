import React, { useRef, useMemo } from 'react';
import ResizableBlock from '../../common/resizableBlock';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';

import { ISnippet } from '../../../models';

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
  onChange: (val: ISnippet) => void;
  snippet: ISnippet;
  className?: string;
  hide: boolean;
  toggleHide: (hide: boolean) => void;
}

function CodeEditor({ snippet, hide, toggleHide, onChange, className }: ICodeEditorProps) {
  const classes = makeStyles(getStyles)({});
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
          classes={{ label: classes.switchLabelText, root: 'mb-0' }} />
      </div>

      <Collapse in={!hide}>
        <select className="mb-2" value={snippet.language}
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