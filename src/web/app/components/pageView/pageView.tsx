import React, { useState, useEffect, useRef, useCallback } from 'react';
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';
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

import { getStyles } from '../../styles/jss/pageView/pageView';
import { IPage } from '../../models';
import NoteCard from './noteCard';

export interface IPageViewProps {
  page: IPage;
  className?: string;
}

export interface IPageEvents {
  expandNotes: (expand: boolean) => void;
}

function PageView({ page, className }: IPageViewProps) {
  const classes = makeStyles(getStyles)({});
  const [settingsOpen, setSettinsOpen] = useState(false);
  const [pageExpander, setPageExpander] = useState({ expandPage: false, expandingNotes: false });
  const settingsBtnRef = useRef(null);
  const pageEmitter = useRef<StrictEventEmitter<EventEmitter, IPageEvents>>(new EventEmitter());

  useEffect(() => {
    return () => pageEmitter.current.removeAllListeners();
  }, []);

  const toggleSettingsOpen = useCallback(() => {
    setSettinsOpen(!settingsOpen);
  }, [settingsOpen]);

  const expandNotes = useCallback((expandNotes: boolean) => {
    if (!pageExpander.expandPage && expandNotes) {
      setPageExpander({ expandPage: true, expandingNotes: true });
      return;
    }

    pageEmitter.current.emit('expandNotes', expandNotes);
  }, [pageExpander]);

  const onPageExpanded = useCallback(() => {
    if (pageExpander.expandingNotes) {
      setPageExpander({ expandPage: true, expandingNotes: false });
      pageEmitter.current.emit('expandNotes', true);
    }
  }, [pageExpander]);

  return (
    <Card className={className}>
      <CardHeader title={page.title} subheader={page.notebook.name}
        action={
          <React.Fragment>
            <IconButton className={classes.headerBtn} buttonRef={settingsBtnRef}
              onClick={toggleSettingsOpen}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Popper open={settingsOpen} anchorEl={settingsBtnRef.current} transition>
              {({ TransitionProps }) => (
                <ClickAwayListener onClickAway={(evt) => {
                  if (!settingsBtnRef.current.contains(evt.target))
                    toggleSettingsOpen();
                }}>
                  <Grow {...TransitionProps}>
                    <Paper>
                      <MenuList>
                        <MenuItem className="py-1" onClick={() => expandNotes(true)}>Expand all notes</MenuItem>
                        <MenuItem className="py-1" onClick={() => expandNotes(false)}>Collapse all notes</MenuItem>
                      </MenuList>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              )}
            </Popper>

            <IconButton className={classes.headerBtn}
              onClick={() => setPageExpander({ expandPage: !pageExpander.expandPage, expandingNotes: false })}>
              {pageExpander.expandPage ? <ExpandLessIcon fontSize="small" />
                : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          </React.Fragment>
        } className="py-3" classes={{ title: classes.pageTitle }} />

      <Collapse in={pageExpander.expandPage} timeout="auto" onEntered={onPageExpanded}>
        <CardContent className="pt-0 pb-3">
          {page.notes.map((n, idx) => (
            <NoteCard key={idx} note={n} pageEmitter={pageEmitter.current}
              className={(idx + 1) < page.notes.length ? 'mb-3' : ''} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

PageView.propTypes = {
  page: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default PageView;