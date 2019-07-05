import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVertRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Theme } from '@material-ui/core';

import NoteCard from './noteCard';
import { PageType } from '../../../graphql/queries/pages';

const getStyles = (theme: Theme) => {
  return {
    cardHeader: {
      padding: 12
    },
    cardActions: {
      margin: 0
    },
    pageTitle: {
      fontSize: '1.2rem'
    },
    expandButton: {
      padding: 5
    },
    pageSettingsItem: {
      padding: '6px 8px',
      minHeight: 'unset'
    }
  };
};

export interface IPageCardProps {
  page: PageType;
  className?: string;
}

function PageCard({ page, className }: IPageCardProps) {
  const classes = makeStyles(getStyles)({});
  const [settingsOpen, setSettinsOpen] = useState(false);
  const [collapsePage, setCollapsePage] = useState(false);
  const settingsBtnRef = useRef(null);
  const collapseNotesSubject = useRef<BehaviorSubject<boolean>>(new BehaviorSubject(false).pipe(skip(1)) as BehaviorSubject<boolean>);
  const pendingToCollapseNotes = useRef(false);

  const toggleSettingsOpen = useCallback(() => {
    setSettinsOpen(!settingsOpen);
  }, [settingsOpen]);
  
  const collapseNotes = useCallback((collapse: boolean) => {
    // Collapse page first
    if (!collapsePage) {
      pendingToCollapseNotes.current = true;
      setCollapsePage(true);
      return;
    }

    collapseNotesSubject.current.next(collapse);
  }, [collapsePage]);

  return (
    <Card className={className}>
      <CardHeader title={page.title} subheader={page.notebook.name} className={classes.cardHeader}
        classes={{ title: classes.pageTitle, action: classes.cardActions }}
        action={
          <React.Fragment>
            <IconButton className={classes.expandButton} buttonRef={settingsBtnRef} onClick={toggleSettingsOpen}>
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={() => setCollapsePage(!collapsePage)} className={classes.expandButton}>
              {collapsePage ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>

            <Popper open={settingsOpen} anchorEl={settingsBtnRef.current} transition>
              {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={(evt) => {
                  if (!settingsBtnRef.current.contains(evt.target))
                    toggleSettingsOpen();
                }}>
                  <Grow {...TransitionProps}>
                    <Paper>
                      <MenuList className="p-0">
                        <MenuItem className={classes.pageSettingsItem} onClick={() => {
                          collapseNotes(true);
                          toggleSettingsOpen();
                        }}> Expand notes </MenuItem>

                        {collapsePage ?
                        <MenuItem className={classes.pageSettingsItem} onClick={() => {
                          collapseNotes(false);
                          toggleSettingsOpen();
                        }}> Collapse notes</MenuItem> : null}
                      </MenuList>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              )}
            </Popper>
          </React.Fragment>
        } />

      <Collapse in={collapsePage} timeout="auto" onEntered={() => {
        if (pendingToCollapseNotes.current) {
          collapseNotes(true);
          pendingToCollapseNotes.current = false;
        }
      }}>
        <CardContent className="pt-0 pb-3">
          {page.notes.map((n, idx) => (
            <NoteCard key={idx} note={n} collapseSubject={collapseNotesSubject.current}
              className={(idx + 1) < page.notes.length ? 'mb-3' : ''} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

PageCard.propTypes = {
  page: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default PageCard;