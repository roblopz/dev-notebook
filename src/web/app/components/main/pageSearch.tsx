import React, { useRef } from 'react';
import { debounce } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import { useMutation } from 'react-apollo-hooks';

import { getStyles } from '../../styles/jss/main/pageSearch';
import { ISetPageFiltersMutationInput, mutations } from '../../graphql/@client/mutations';

function PageSearch() {
  const classes = makeStyles(getStyles)({});
  const setPageFilter = useMutation<void, ISetPageFiltersMutationInput>(mutations.setPageFilters.query);

  const onSearchChange = useRef(debounce((search: string) => {
    setPageFilter({
      variables: { pageFilters: { search } }
    });
  }, 500)).current;

  return (
    <ListItem button className="pl-2">
      <ListItemIcon className="no-min-width mr-3">
        <SearchIcon className={classes.searchIcon} />
      </ListItemIcon>
      <div>
        Pages
        <div>
          <InputBase placeholder="Search..." 
            onChange={evt => onSearchChange(evt.target.value)} />
        </div>
      </div>
    </ListItem>
  );
}

export default PageSearch;