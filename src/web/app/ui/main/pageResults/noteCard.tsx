import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

import ResizableBlock from '../../common/resizableBlock';
import { INote } from '../../../graphql/models';
import { BehaviorSubject } from 'rxjs';

const getStyles = (theme: Theme) => {
  return {
    cardHeader: {
      padding: '8px 12px'
    },
    cardActions: {
      marginTop: 4,
      marginRight: 0
    },
    noteHeader: {
      fontSize: '1rem',
    },
    noteSubheader: {
      fontSize: '.85rem'
    },
    expandIcon: {
      padding: 5
    },
    snippetLanguage: {
      textAlign: 'right' as 'right',
      fontStyle: 'italic'
    },
    contentView: {
      border: '1px solid #d1d1d1',
      borderRadius: '2px',
      padding: theme.spacing(1),
      marginBottom: '1rem',
      '& p': {
        marginBottom: '.25rem !important'
      }
    },
    codeView: {
      border: '1px solid #d1d1d1',
      borderRadius: '2px',
      padding: `0 ${theme.spacing(1)}px`,
      marginTop: '.25rem'
    }
  };
};

export interface INoteCardProps {
  note: INote;
  className?: string;
  collapseSubject: BehaviorSubject<boolean>;
}

function NoteCard({ note, className, collapseSubject }: INoteCardProps) {
  const classes = makeStyles(getStyles)({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    collapseSubject.subscribe((collapse) => {
      setIsCollapsed(collapse);
    });

    return () => collapseSubject.unsubscribe();
  }, []);

  return (
    <Card className={className}>
      <CardHeader title={note.header} subheader={note.subheader} className={classes.cardHeader}
        classes={{ title: classes.noteHeader, subheader: classes.noteSubheader, action: classes.cardActions }}
        action={
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className={classes.expandIcon}>
            {isCollapsed ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        } />

      <Collapse in={isCollapsed} timeout="auto">
        <CardContent className="pt-1 pb-2">
          {/* Note content */}
          {note.htmlContent ?
            <div className={classes.contentView} dangerouslySetInnerHTML={{ __html: note.htmlContent }} /> : null}

          {/* Read only snippet */}
          {note.snippet && (note.snippet.language && note.snippet.htmlCode) ?
            <React.Fragment>
              <Typography variant="caption" className={'mr-1 mt-0' + classes.snippetLanguage}>
                [&nbsp;{note.snippet.language}&nbsp;]
              </Typography>
              <div className={classes.codeView}>
                <ResizableBlock className="position-relative mt-1" axis="y" resizerPosition="right"
                  limits={{ heightMin: 100, heightMax: 500 }}>
                  {({ dimensionStyles }) => {
                    return (
                      <div style={{
                        overflow: 'auto',
                        height: dimensionStyles.height,
                        width: dimensionStyles.width,
                        minHeight: 100,
                        maxHeight: 500
                      }} dangerouslySetInnerHTML={{ __html: note.snippet.htmlCode }} />
                    );
                  }}
                </ResizableBlock>
              </div>
            </React.Fragment>
            : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  className: PropTypes.string,
  collapseSubject: PropTypes.object.isRequired
};

export default NoteCard;