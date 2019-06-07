import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import Paper from '@material-ui/core/Paper';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';

import { getStyles } from '../../styles/jss/pageEdit/pageFooter';

export interface IPageFooterProps {
  onPageSubmit: () => void;
  onPageDelete: () => void;
}

function Footer({
  onPageSubmit,
  onPageDelete
}: IPageFooterProps) {
  const classes = makeStyles(getStyles)({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const iconButtonRef = useRef(null);

  const toggleSettings = useCallback(() => {
    setSettingsOpen(!settingsOpen);
    setDeleteMode(false);
  }, [settingsOpen]);

  return (
    <div className={classes.root}>
      <div className={classes.pageOptionBtns}>
        <Button className={classes.saveBtn} type="button" onClick={onPageSubmit}
          size="small" variant="contained" color="primary">
          <SaveIcon fontSize="small" />&nbsp;Save
        </Button>

        <IconButton className={classes.optionsBtn} color="default"
          buttonRef={iconButtonRef} onClick={toggleSettings}>
          <MoveVertIcon fontSize="small" />
        </IconButton>
        <Popper className={classes.settingsMenuRoot}
          open={settingsOpen} anchorEl={iconButtonRef.current} transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={(evt) => {
                  if (!iconButtonRef.current.contains(evt.target))
                    toggleSettings();
                }}>
                  <MenuList className={classes.settingsMenu}>
                    <MenuItem className="d-flex flex-column align-items-start h-auto" onClick={() => setDeleteMode(true)}>
                      {deleteMode ? 'Delete page?' : 'Delete page'}
                      {deleteMode ?
                        <div className="d-flex mt-2">
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
                              onPageDelete();
                            }}>
                            Yes
                          </Button>
                        </div> : null}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

Footer.propTypes = {
  onPageSubmit: PropTypes.func.isRequired,
  onPageDelete: PropTypes.func.isRequired
};

export default Footer;