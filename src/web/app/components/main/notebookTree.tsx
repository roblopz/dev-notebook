import React, { useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CollectionsIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import BookIcon from '@material-ui/icons/BookOutlined';
import FilteredIcon from '@material-ui/icons/FilterListRounded';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { getStyles } from '../../styles/jss/main/notebookTree';
import { GET_NOTEBOOK_LIST, IGetNotebookListData as IGetNotebookListResult } from '../../graphql/queries/notebookQueries';
import { IPageFilters } from '../../graphql/@client/appState';
import { ISetPageFiltersMutationInput, mutations } from '../../graphql/@client/mutations';
import { INotebook } from '../../models';

interface IGetNotebookFilterResult {
  pageFilters: Pick<IPageFilters, 'notebook'>;
}

const GET_NOTEBOOK_FILTER = gql`
  query getNotebookFilter {
    pageFilters {
      notebook
    }
  }
`;

function NotebookTree() {
  const classes = makeStyles(getStyles)({});
  const [treeOpen, setTreeOpen] = useState(false);
  const filterRef = useRef(null);

  const { data: { notebooks = [] } } = useQuery<IGetNotebookListResult>(GET_NOTEBOOK_LIST);
  const { data: { pageFilters: { notebook: filteringNotebookID } } } = useQuery<IGetNotebookFilterResult>(GET_NOTEBOOK_FILTER);
  const setPageFilter = useMutation<void, ISetPageFiltersMutationInput>(mutations.setPageFilters.query);

  const onNotebookClick = useCallback((notebook: Pick<INotebook, '_id' | 'name'>) => {
    setPageFilter({
      variables: { pageFilters: { notebook: notebook._id } }
    });
  }, []);

  const onTreeToggle = useCallback((evt: React.MouseEvent<HTMLElement>) => {
    let toggleOpen = !treeOpen;
    if (evt.target === filterRef.current)
      toggleOpen = true;

    setTreeOpen(toggleOpen);
  }, [treeOpen]);

  return (
    <div className={classes.root}>
      <ListItem button className="pl-2" onClick={onTreeToggle}>
        <ListItemIcon className="no-min-width mr-3">
          <CollectionsIcon className={classes.notebooksIcon} />
        </ListItemIcon>
        <div>
          Notebooks
          <div>
            <InputBase inputRef={filterRef} placeholder="Filter" />
          </div>
        </div>
        {treeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={treeOpen} unmountOnExit>
        <List disablePadding>
          {notebooks.map((n, idx) => (
            <ListItem key={n._id || idx} button className="py-1"
              selected={filteringNotebookID === n._id} onClick={() => onNotebookClick(n)}>
              <ListItemIcon className="no-min-width mr-3">
                <BookIcon />
              </ListItemIcon>
              <ListItemText inset primary={n.name} className="pl-0" />
              {filteringNotebookID === n._id ?
                <ListItemIcon className={classes.filteredIcon}>
                  <FilteredIcon />
                </ListItemIcon> : null}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

export default NotebookTree;