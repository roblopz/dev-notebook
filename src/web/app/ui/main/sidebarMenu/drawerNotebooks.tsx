import React, { useCallback, useState } from 'react';
import useRouter from 'use-react-router';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
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
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { searchInputStyles, getDrawerTitleStyles } from './drawerSearch';
import { sharedStyles } from '../../../styles/shared';
import { NotebooksResp, notebooksQuery } from '../../../graphql/queries/notebooks';
import { PageFilters } from '../../../graphql/appState';
import { appRoutes } from '../../../lib/routes';

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
    editIcon: {
      top: 0,
      color: theme.palette.primary.light,
      position: 'relative' as 'relative',
      cursor: 'pointer',
      '&:hover': {
        color: sharedStyles.hoverColor
      }
    },
    ...getDrawerTitleStyles(theme),
    ...searchInputStyles(theme)
  };
};

export interface IDrawerNotebooksProps {
  pageFilters: PageFilters;
  setFilters: (pageFilters: PageFilters) => void;
}

function DrawerNotebooks({ pageFilters, setFilters }: IDrawerNotebooksProps) {
  const classes = makeStyles(getStyles)({});
  const [searchVal, setSearchVal] = useState('');
  const { data: { notebooks = [] } } = useQuery<NotebooksResp>(notebooksQuery, { fetchPolicy: 'cache-and-network' as any });
  const { history } = useRouter();

  const setNotebookFilter = useCallback(async (notebookID: string) => {
    setFilters({ ...pageFilters, notebook: notebookID });
  }, [pageFilters, setFilters]);

  return (
    <React.Fragment>
      <div className={classes.titleWrapper}>
        <Typography variant="h6">
          Notebooks <FontAwesomeIcon {... {onClick: () => history.push(appRoutes.notebooks)}}
            icon={faEdit} className={classes.editIcon} />
        </Typography>
        {pageFilters.notebook ?
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
            <ListItem key={idx} button selected={n._id === pageFilters.notebook}
              className={classes.notebookItem} classes={{ selected: classes.notebookItemSelected }}
              onClick={() => setNotebookFilter(n._id)}>
              <ListItemText primary={n.name} primaryTypographyProps={{ variant: 'body1' }} />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}

DrawerNotebooks.propTypes = {
  pageFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default DrawerNotebooks;