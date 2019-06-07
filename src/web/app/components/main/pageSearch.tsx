import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';

import { getStyles } from '../../styles/jss/main/pageSearch';

function PageSearch() {
  const classes = makeStyles(getStyles)({});

  return (
    <ListItem button className="pl-2">
      <ListItemIcon className="no-min-width mr-3">
        <SearchIcon className={classes.searchIcon} />
      </ListItemIcon>
      <div>
        Pages
          <div>
          <InputBase placeholder="Search..." />
        </div>
      </div>
    </ListItem>
  );
}

PageSearch.propTypes = {

};

export default PageSearch;