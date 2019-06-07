import React, { useState, useRef, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FilterIcon from '@material-ui/icons/FilterListRounded';
import SettingsIconActive from '@material-ui/icons/SettingsApplicationsRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { getStyles } from '../../styles/jss/main/navbarSearch';

export type NoteFilterOption = 'header' | 'subheader' | 'content' | 'snippet.code';

const allOptions: Array<(NoteFilterOption)> =
  ['header', 'subheader', 'content', 'snippet.code'];

function NavbarFilterNotes() {
  const classes = makeStyles(getStyles)({});
  const [filterBy, setFilterBy] = useState<Array<(NoteFilterOption)>>(null);
  const [filterSettingsOpen, setFilterSettingsOpen] = useState(false);
  const iconButtonRef = useRef(null);

  const toggleFilterSettingsOpen = useCallback(() => {
    setFilterSettingsOpen(!filterSettingsOpen);
  }, [filterSettingsOpen]);

  const toggleFilterBy = useCallback((
    evt: React.ChangeEvent<HTMLInputElement>,
    option: NoteFilterOption | null
  ) => {
    let newFilterBy = filterBy;

    if (!option) {
      if (evt.target.checked)
        newFilterBy = allOptions;
    } else {
      if (evt.target.checked) {
        newFilterBy = newFilterBy ? [...newFilterBy, option] : [option];
      } else { // Not checked
        if (newFilterBy)
          newFilterBy = [...newFilterBy.filter(f => f !== option)];
        else
          newFilterBy = allOptions.filter(f => f !== option);
      }
    }

    if (!(newFilterBy || []).length)
      newFilterBy = null;

    if (newFilterBy !== filterBy)
      setFilterBy(newFilterBy);
  }, [filterBy]);

  const noFiltering = !filterBy || filterBy.length === allOptions.length;

  return (
    <div className={classes.searchControlsContainer}>
      <div className={classes.searchInput}>
        <div className={classes.searchIconContainer}>
          <FilterIcon />
        </div>
        <InputBase placeholder="Filter notes"
          classes={{ root: classes.inputRoot, input: classes.inputInput }} />
      </div>
      <div className={classes.settingsIconContainer} ref={iconButtonRef} onClick={toggleFilterSettingsOpen}>
        {noFiltering ? <SettingsIcon className={classes.settingsIcon} />
          : <SettingsIconActive className={classes.settingsIcon} />}
      </div>
      <Popper className={classes.filterSettingsRoot}
        open={filterSettingsOpen} anchorEl={iconButtonRef.current} transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <ClickAwayListener onClickAway={(evt) => {
              if (!iconButtonRef.current.contains(evt.target))
                toggleFilterSettingsOpen();
            }}>
              <Paper className={classes.filterSettingsPaper}>
                <Typography variant="subtitle2" className="mb-2">Filter by:</Typography>
                <div>
                  <FormGroup>
                    <FormControlLabel label="Everything"
                      control={
                        <Checkbox checked={noFiltering}
                          onChange={evt => toggleFilterBy(evt, null)}
                          className={classes.filterCheckbox} color="primary" />
                      } disabled={noFiltering} />
                    <FormControlLabel label="Note header"
                      control={
                        <Checkbox checked={!filterBy || filterBy.includes('header')}
                          onChange={evt => toggleFilterBy(evt, 'header')}
                          className={classes.filterCheckbox} color="primary" />
                      } />
                    <FormControlLabel label="Note subheader"
                      control={
                        <Checkbox checked={!filterBy || filterBy.includes('subheader')}
                          onChange={evt => toggleFilterBy(evt, 'subheader')}
                          className={classes.filterCheckbox} color="primary" />
                      } />
                    <FormControlLabel label="Note content"
                      control={
                        <Checkbox checked={!filterBy || filterBy.includes('content')}
                          onChange={evt => toggleFilterBy(evt, 'content')}
                          className={classes.filterCheckbox} color="primary" />
                      } />
                    <FormControlLabel label="Note snippet"
                      control={
                        <Checkbox checked={!filterBy || filterBy.includes('snippet.code')}
                          onChange={evt => toggleFilterBy(evt, 'snippet.code')}
                          className={classes.filterCheckbox} color="primary" />
                      } />
                  </FormGroup>
                </div>
              </Paper>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

NavbarFilterNotes.propTypes = {

};

export default NavbarFilterNotes;