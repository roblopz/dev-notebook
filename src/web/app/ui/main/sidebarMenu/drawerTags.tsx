import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';

import { searchInputStyles } from './drawerSearch';
import { findTagsQuery, FindTagsResp, FindTagsInput } from '../../../graphql/queries/findTags';
import { PageFilters } from '../../../graphql/appState';

const getStyles = (theme: Theme) => {
  return {
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap' as 'wrap',
      marginTop: '1rem'
    },
    tag: {
      height: 24,
      margin: 2
    },
    tagDeleteIcon: {
      width: '.65em'
    },
    ...searchInputStyles(theme)
  };
};

export interface IDrawerTagsProps {
  pageFilters: PageFilters;
  setFilters: (pageFilters: PageFilters, closeDrawer?: boolean) => void;
}

function DrawerTags({ pageFilters, setFilters }: IDrawerTagsProps) {
  const classes = makeStyles(getStyles)({});
  const [search, setSearch] = useState('');
  const { data: { tags: allTags = [] } } = useQuery<FindTagsResp, FindTagsInput>(findTagsQuery, {
    variables: { options: { pageSize: null, sortBy: 'PageUpdatedAt' } }
  });

  const onTagClick = useCallback((tag: string) => {
    const includedTags = [...(pageFilters.tags || [])];

    let tagIndx;
    if ((tagIndx = includedTags.indexOf(tag)) !== -1)
      includedTags.splice(tagIndx, 1);
    else
      includedTags.push(tag);

    setFilters({
      ...pageFilters,
      tags: includedTags
    }, false);

  }, [pageFilters, setFilters]);

  const selectedTags = pageFilters.tags || [];
  const filteredTags = allTags.filter(t => {
    return (search ? new RegExp(`${search}`, 'i').test(t.tag) : true) &&
      !selectedTags.includes(t.tag);
  }).map(t => t.tag);
  
  return (
    <React.Fragment>
      <Typography variant="h6" className="mb-2">Tags</Typography>
      <Paper className={classes.searchInputWrapper}>
        <div className={classes.inputSearchIconWrapper}>
          <SearchIcon className={classes.inputSearchIcon} />
        </div>
        <InputBase value={search} onChange={evt => setSearch(evt.target.value)}
          className={classes.searchInput} placeholder="Search tags..." />
      </Paper>
      
      {selectedTags.length ?
      <>
        <div className={classes.tagsWrapper}>
          {selectedTags.map((t, idx) =>
            <Chip key={idx} label={t} onClick={() => onTagClick(t)}
              {...{ size: "small" }} color="primary" variant='default'
              className={classes.tag} classes={{ deleteIcon: classes.tagDeleteIcon }} />)}
        </div>
        {filteredTags.length ? <Divider className="mt-2 mb-2" /> : null}
      </> : null}

      {filteredTags.length ?
        <div className={classnames({
          [classes.tagsWrapper]: true,
          'mt-0': selectedTags.length
        })}>
          {filteredTags.map((t, idx) =>
            <Chip key={idx} label={t} onClick={() => onTagClick(t)}
              {...{ size: "small"}} color="primary" variant='outlined'
              className={classes.tag} classes={{ deleteIcon: classes.tagDeleteIcon }} />)}
        </div> : null}
    </React.Fragment>
  );
}

DrawerTags.propTypes = {
  pageFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default DrawerTags;