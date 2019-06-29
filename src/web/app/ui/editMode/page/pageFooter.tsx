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

const getStyles = (theme: any) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-end',
      margin: '1rem 0'
    },
    pageOptionBtns: {
      position: 'relative' as 'relative',
      display: 'flex',
      width: '100%'
    },
    saveBtn: {
      marginRight: theme.spacing(1),
      flexGrow: 1
    },
    optionsBtn: {
      padding: 5
    },
    settingsMenuRoot: {
      left: '45px !important',
      zIndex: theme.zIndex.modal + 1 
    },
    settingsMenu: {
      padding: '4px 0',
      '& > li': {
        padding: '8px 16px',
        '&:focus': {
          backgroundColor: 'white'
        }
      }
    }
  };
};

export interface IPageFooterProps {
  onPageSubmit: () => void;
  onPageDelete: () => void;
}

function PageFooter({
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

PageFooter.propTypes = {
  onPageSubmit: PropTypes.func.isRequired,
  onPageDelete: PropTypes.func.isRequired
};

export default PageFooter;