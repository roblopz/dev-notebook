import React, { useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';
import RemoveIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import AddIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { getStyles } from '../../styles/jss/note/noteHeader';

export interface INoteHeaderProps {
  setCollapsed: (collapsed: boolean) => void;
  isCollapsed: boolean;
  onNoteDelete: () => void;
}

function NoteHeader({
  setCollapsed,
  isCollapsed,
  onNoteDelete
 }: INoteHeaderProps) {
  const classes = makeStyles(getStyles)();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const iconButtonRef = useRef(null);

  const toggleSettings = useCallback(() => {
    setSettingsOpen(!settingsOpen);
    setDeleteMode(false);
  }, [settingsOpen]);

  const deleteNoteMenuItem = useMemo(() => {
    return (
      <MenuItem className="d-flex flex-column align-items-start h-auto" onClick={() => setDeleteMode(true)}>
        {deleteMode ? 'Delete note?' : 'Delete'}
        {deleteMode ?
          <div className="d-flex w-100 mt-2">
            <Button className="p-0 mr-2" size="small" variant="outlined" color="primary"
              onClick={(evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                setDeleteMode(false);
              }}>
              No
            </Button>
            <Button className="p-0" size="small" variant="outlined" color="secondary"
              onClick={() => {
                toggleSettings();
                onNoteDelete();
              }}>
              Yes
            </Button>
          </div> : null}
      </MenuItem>
    );
  }, [deleteMode, toggleSettings]);

  return (
    <div className={classes.root}>
      <IconButton className={classes.headerIcon} color="default"
        onClick={toggleSettings} buttonRef={iconButtonRef}>
        <MoveVertIcon fontSize="small" />
      </IconButton>
      <Popper className={classes.settingsMenuRoot}
        open={settingsOpen} anchorEl={iconButtonRef.current} transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={(evt) => {
                if (!iconButtonRef.current.contains(event.target))
                  toggleSettings();
              }}>
                <MenuList className={classes.settingsMenu}>
                  <MenuItem>Move to notebook...</MenuItem>
                  {deleteNoteMenuItem}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <IconButton className={classes.headerIcon} color="default"
        onClick={() => setCollapsed(!isCollapsed)}>
        {isCollapsed ? <AddIcon fontSize="small" /> : <RemoveIcon fontSize="small" />}
      </IconButton>
    </div>
  );
}

NoteHeader.propTypes = {
  setCollapsed: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onNoteDelete: PropTypes.func.isRequired
};

export default NoteHeader;