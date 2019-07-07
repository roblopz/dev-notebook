import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { PageFilters } from '../../../graphql/appState';
import { initialState } from '../../../graphql/appState';

export const searchInputStyles = (theme: Theme) => ({
  searchInputWrapper: {
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    flex: 1
  },
  inputSearchIconWrapper: {
    padding: 3,
    color: theme.palette.text.secondary
  },
  inputSearchIcon: {
    fontSize: '1.2rem'
  },
});

export const getDrawerTitleStyles = (theme: Theme) => ({
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '.5rem'
  },
  clearIcon: {
    color: theme.palette.secondary.dark,
    marginRight: 3,
    position: 'relative' as 'relative',
    top: -1
  }
});

const getStyles = (theme: Theme) => {
  return {
    tabsRoot: {
      marginRight: -1 * theme.spacing(2),
      marginLeft: -1 * theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    tabsRootNoClear: {
      marginTop: -1 * theme.spacing(2),
    },
    clearButtonWrapper: {
      marginTop: -1 * theme.spacing(1),
      marginRight: -1 * theme.spacing(1),
      textAlign: 'right' as 'right'
    },
    tabLabel: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      textTransform: 'none' as 'none',
      minWidth: 'unset'
    },
    ...searchInputStyles(theme),
    ...getDrawerTitleStyles(theme)
  };
};

export interface ISearchNotesOptions {
  content: boolean;
  code: boolean;
  header: boolean;
  subheader: boolean;
}

export interface IDrawerSearchProps {
  pageFilters: PageFilters;
  setFilters: (filters: PageFilters) => void;
}

function DrawerSearch({ pageFilters, setFilters }: IDrawerSearchProps) {
  const classes = makeStyles(getStyles)({});
  const [pageSearchVal, setPageSearchVal] = useState(pageFilters.pageSearch.search || '');
  const [noteSearchVal, setNoteSearchVal] = useState(pageFilters.noteSearch.search || '');

  const [searchNotesIn, _setSearchNotesIn] = useState<ISearchNotesOptions>({
    code: pageFilters.noteSearch.code,
    content: pageFilters.noteSearch.content,
    header: pageFilters.noteSearch.header,
    subheader: pageFilters.noteSearch.subheader
  });

  const [tabNumber, setTabNumber] = React.useState(
    pageFilters.pageSearch.search || !pageFilters.noteSearch.search ? 0 : 1
  );

  const setSearchNotesIn = useCallback((key: keyof ISearchNotesOptions) => {
    _setSearchNotesIn(currentSearchIn => {
      let newSearchIn: ISearchNotesOptions = { ...currentSearchIn, [key]: !currentSearchIn[key] };

      if (Object.keys(newSearchIn).every(k => !newSearchIn[k]))
        newSearchIn = { content: true, code: true, header: true, subheader: true };

      return newSearchIn;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNoteSearchVal('');
    setPageSearchVal('');
    setFilters(initialState.pageFilters);
  }, [setFilters]);

  const fireSearch = useCallback((type: 'note' | 'page') => {
    if (type === 'note') {
      setFilters({
        ...pageFilters,
        pageSearch: initialState.pageFilters.pageSearch,
        noteSearch: noteSearchVal ?
          { ...pageFilters.noteSearch, ...searchNotesIn, search: noteSearchVal }
          : initialState.pageFilters.noteSearch
      });
    } else { // page
      setFilters({
        ...pageFilters,
        noteSearch: initialState.pageFilters.noteSearch,
        pageSearch: pageSearchVal ?
          { ...pageFilters.pageSearch, title: true, search: pageSearchVal }
          : initialState.pageFilters.pageSearch
      });
    }
  }, [pageFilters, noteSearchVal, pageSearchVal, searchNotesIn, setFilters]);

  const showClear = pageFilters.noteSearch.search || pageFilters.pageSearch.search;

  return (
    <React.Fragment>
      {showClear ?
        <div className={classes.clearButtonWrapper}>
          <Button size="small" onClick={clearAll}>
            <FontAwesomeIcon icon={faTimes} className={classes.clearIcon} /> Clear
        </Button>
        </div> : null}

      <Tabs value={tabNumber} onChange={(evt, tabNumber) => setTabNumber(tabNumber)}
        variant="fullWidth" className={classnames(classes.tabsRoot, { [classes.tabsRootNoClear]: !showClear })}>
        <Tab label="Search pages" className={classes.tabLabel} />
        <Tab label="Search notes" className={classes.tabLabel} />
      </Tabs>

      {tabNumber === 0 && // Search in pages
        <div>
          <Paper className={classes.searchInputWrapper}>
            <div className={classes.inputSearchIconWrapper}>
              <SearchIcon className={classes.inputSearchIcon} />
            </div>
            <InputBase value={pageSearchVal} onChange={evt => setPageSearchVal(evt.target.value)}
              onKeyDown={evt => {
                if (evt.key === 'Enter')
                  fireSearch('page');
              }}
              className={classes.searchInput} placeholder="Search by title..." />
          </Paper>
        </div>}

      {tabNumber === 1 && // Search in notes
        <div>
          <Paper className={classes.searchInputWrapper}>
            <div className={classes.inputSearchIconWrapper}>
              <SearchIcon className={classes.inputSearchIcon} />
            </div>
            <InputBase value={noteSearchVal} onChange={evt => setNoteSearchVal(evt.target.value)}
              onKeyDown={evt => {
                if (evt.key === 'Enter')
                  fireSearch('note');
              }}
              className={classes.searchInput} placeholder="Search..." />
          </Paper>
          <div className="mt-3">
            <FormControlLabel label="Content" className="mb-0"
              control={
                <Switch size="small" checked={!!searchNotesIn.content} onChange={() => setSearchNotesIn('content')}
                  value="checkedB" color="primary" />
              } />
            <FormControlLabel label="Code" className="mb-0"
              control={
                <Switch size="small" checked={!!searchNotesIn.code} onChange={() => setSearchNotesIn('code')}
                  value="checkedB" color="primary" />
              } />
            <FormControlLabel label="Header" className="mb-0"
              control={
                <Switch size="small" checked={!!searchNotesIn.header} onChange={() => setSearchNotesIn('header')}
                  value="checkedB" color="primary" />
              } />
            <FormControlLabel label="Subheader" className="mb-0"
              control={
                <Switch size="small" checked={!!searchNotesIn.subheader} onChange={() => setSearchNotesIn('subheader')}
                  value="checkedB" color="primary" />
              } />
          </div>
        </div>}
    </React.Fragment>
  );
}

DrawerSearch.propTypes = {
  pageFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default DrawerSearch;