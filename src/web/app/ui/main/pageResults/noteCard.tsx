import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { Editor, EditorState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import MonacoEditor from 'react-monaco-editor';

import ResizableBlock from '../../common/resizableBlock';
import { IPageCardEvents } from './pageCard';
import { PageNoteResult } from '../../../graphql/queries/pageQueries';

const getStyles = (theme: any) => {
  return {
    noteHeader: {
      fontSize: '1rem',
    },
    noteSubheader: {
      fontSize: '.85rem'
    },
    expandIcon: {
      padding: 8,
      marginTop: 10
    },
    snippetLanguage: {
      textAlign: 'right' as 'right',
      fontStyle: 'italic'
    },
    contentView: {
      border: '1px solid #d1d1d1',
      borderRadius: '2px'
    }
  };
};

export interface INoteCardProps {
  note: PageNoteResult;
  className?: string;
  pageEmitter: StrictEventEmitter<EventEmitter, IPageCardEvents>;
}

function NoteCard({
  note,
  className,
  pageEmitter
}: INoteCardProps) {
  const classes = makeStyles(getStyles)({});
  const [isOpen, setIsOpen] = useState(false);
  const [contentEditorState] = useState(
    note.content ? EditorState.createWithContent(convertFromRaw(JSON.parse(note.content))) : EditorState.createEmpty()
  );

  useEffect(() => {
    const toggleExpand = (expand: boolean) => setIsOpen(expand);
    pageEmitter.on('expandNotes', toggleExpand);
    return () => {
      pageEmitter.removeListener('expandNotes', toggleExpand);
    };
  }, []);

  return (
    <Card className={className}>
      <CardHeader title={note.header} subheader={note.subheader}
        action={
          <IconButton onClick={() => setIsOpen(!isOpen)} className={classes.expandIcon}>
            {isOpen ? <ExpandLessIcon fontSize="small" />
              : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        } className="py-1"
        classes={{ title: classes.noteHeader, subheader: classes.noteSubheader }} />
      <Collapse in={isOpen} timeout="auto">
        <CardContent className="pt-1 pb-2">

          {/* Note content */}
          {note.content ?
            <Editor editorState={contentEditorState} onChange={() => { }} readOnly={true} />
            : null}

          {/* Read only snippet */}
          {note.snippet && (note.snippet.language && note.snippet.code) ?
            <React.Fragment>
              <Typography variant="caption" className={'mr-1 mt-0 mb-1 ' + classes.snippetLanguage}>
                {note.snippet.language}
              </Typography>
              <ResizableBlock className="position-relative" axis="y" resizerPosition="right"
                limits={{ heightMin: 100, heightMax: 700 }}>
                {({ dimensionStyles }) => {
                  return (
                    <MonacoEditor theme="vs"
                      value={note.snippet.code}
                      language={note.snippet.language}
                      height={dimensionStyles.height || 100}
                      width={dimensionStyles.width || 0}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        showUnused: false,
                        lineNumbersMinChars: 3,
                        scrollBeyondLastLine: false
                      }} />
                  );
                }}
              </ResizableBlock>
            </React.Fragment>
            : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default NoteCard;