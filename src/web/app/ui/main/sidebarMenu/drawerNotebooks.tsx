import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { searchInputStyles, getDrawerTitleStyles } from './drawerSearch';
import { sharedStyles } from '../../../styles/shared';
import { DrawerNotebooksResp, drawerNotebooksQuery } from '../../../graphql/queries/drawerNotebooks';
import { PageFilters } from '../../../graphql/appState';

const getStyles = (theme: Theme) => {
  return {
    notebookItem: {
      paddingLeft: theme.spacing(1),
      '&:hover': {
        color: sharedStyles.hoverColor
      }
    },
    notebookItemSelected: {
      color: sharedStyles.hoverColor
    },
    ...getDrawerTitleStyles(theme),
    ...searchInputStyles(theme)
  };
};

export interface IDrawerNotebooksProps {
  close: () => void;
  filters: PageFilters;
  setFilters: (pageFilters: PageFilters) => void;
}

function DrawerNotebooks({ filters, setFilters, close }: IDrawerNotebooksProps) {
  const classes = makeStyles(getStyles)({});
  const [searchVal, setSearchVal] = useState('');
  const { data: { notebooks = [] } } = useQuery<DrawerNotebooksResp>(drawerNotebooksQuery);

  const setNotebookFilter = useCallback(async (notebookID: string) => {
    setFilters({ ...filters, notebook: notebookID });
  }, [filters, setFilters]);

  return (
    <React.Fragment>
      <div className={classes.titleWrapper}>
        <Typography variant="h6">Notebooks</Typography>
        {filters.notebook ?
          <Button size="small" onClick={() => setNotebookFilter(null)}>
            <FontAwesomeIcon icon={faTimes} className={classes.clearIcon} /> Clear
          </Button> : null}
      </div>

      <Paper className={classes.searchInputWrapper}>
        <div className={classes.inputSearchIconWrapper}>
          <SearchIcon className={classes.inputSearchIcon} />
        </div>
        <InputBase value={searchVal} onChange={evt => setSearchVal(evt.target.value)}
          className={classes.searchInput} placeholder="Search notebooks..." />
      </Paper>
      
      <List dense={true}>
        {notebooks.map((n, idx) => {
          if (searchVal && !(new RegExp(searchVal, 'i').test(n.name)))
            return null;

          return (
            <ListItem key={idx} button selected={n._id === filters.notebook}
              className={classes.notebookItem} classes={{ selected: classes.notebookItemSelected }}
              onClick={() => setNotebookFilter(n._id)}>
              <ListItemText primary={n.name} primaryTypographyProps={{ variant: 'body1' }} />
            </ListItem>
          );
        })}
      </List >
    </React.Fragment>
  );
}

DrawerNotebooks.propTypes = {
  close: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default DrawerNotebooks;