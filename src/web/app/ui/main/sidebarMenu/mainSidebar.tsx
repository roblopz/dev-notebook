import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import useRouter from 'use-react-router';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import ClearAllIcon from '@material-ui/icons/ClearAllRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import CollectionsIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCode } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from 'react-apollo-hooks';

import DrawerSearch from './drawerSearch';
import DrawerNotebooks from './drawerNotebooks';
import DrawerTags from './drawerTags';
import DrawerLanguages from './drawerLanguages';
import { appRoutes } from '../../../lib/routes';
import { sharedStyles } from '../../../styles/shared';
import { PageFiltersResp, pageFiltersQuery } from '../../../graphql/queries/pageFilters';
import { SetPageFiltersInput, setPageFiltersMutation } from '../../../graphql/mutations/setPageFilters';
import { PageFilters, initialState } from '../../../graphql/appState';
import { pagesCountQuery, PagesCountResp } from '../../../graphql/queries/pagesCount';

const sidebarMenuWidth = 60;
export const getStyles = (theme: Theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      borderRadius: 0,
      width: sidebarMenuWidth,
      minWidth: sidebarMenuWidth,
      zIndex: theme.zIndex.modal - 1
    },
    drawerRoot: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: sidebarMenuWidth + theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: 300,
      borderRadius: 0,
      minHeight: '100%',
      overflow: 'auto'
    },
    drawerContainer: {
      zIndex: `${theme.zIndex.modal - 2} !important` as any
    },
    addIconBlock: {
      display: 'flex',
      justifyContent: 'center',
      padding: '12px 0',
    },
    iconBlock: {
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      padding: '12px 0',
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    iconBlockSelected: {
      color: sharedStyles.hoverColor
    },
    iconBlockSelectedError: {
      color: theme.palette.secondary.main
    },
    iconTooltip: {
      position: 'relative' as 'relative',
      left: -1 * theme.spacing(1)
    },
    faIcon: {
      width: '24px !important',
      height: '24px !important'
    }
  };
};

type DrawerOption = 'search' | 'notebooks' | 'tags' | 'languages';

function MainSidebar() {
  const classes = makeStyles(getStyles)({});
  const [drawerOption, setDrawerOption] = useState<DrawerOption>(null);
  const { history } = useRouter();

  const { data: { pageFilters } } = useQuery<PageFiltersResp>(pageFiltersQuery);
  const { data: { pagesCount } } = useQuery<PagesCountResp>(pagesCountQuery);
  const setPageFilters = useMutation<void, SetPageFiltersInput>(setPageFiltersMutation);

  const setFilters = useCallback((pageFilters: PageFilters, closeDrawer = true) => {
    setPageFilters({
      variables: { pageFilters }
    });
    
    if (closeDrawer)
      setDrawerOption(null);
  }, [pageFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters(initialState.pageFilters);
  }, []);

  const getDrawerComponent = useCallback(() => {
    switch (drawerOption) {
      case 'search':
        return <DrawerSearch pageFilters={pageFilters} setFilters={setFilters} />;
      case 'notebooks':
        return <DrawerNotebooks pageFilters={pageFilters} setFilters={setFilters} />;
      case 'tags':
        return <DrawerTags pageFilters={pageFilters} setFilters={setFilters} />;
      case 'languages':
        return <DrawerLanguages pageFilters={pageFilters} setFilters={setFilters} />;
      default:
        return null;
    }
  }, [pageFilters, setFilters, drawerOption]);

  const isSearching = pageFilters.pageSearch && pageFilters.pageSearch.search ||
    pageFilters.noteSearch && pageFilters.noteSearch.search;
  const tagsFiltering = (pageFilters.tags && pageFilters.tags.length);
  const notFiltering = !isSearching && !pageFilters.language && !pageFilters.notebook && !tagsFiltering;

  return (
    <Paper className={classes.root}>
      <Drawer open={!!drawerOption} onClose={() => setDrawerOption(null)} className={classes.drawerContainer}>
        <Paper className={classes.drawerRoot}>
          {getDrawerComponent()}
        </Paper>
      </Drawer>
      
      <div className={classes.addIconBlock}>
        <Tooltip title="Add page" placement="right" classes={{ tooltip: classes.iconTooltip }}>
          <Fab color="primary" size="small" onClick={() => history.push(appRoutes.addPage)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <Tooltip title="Search" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classnames(classes.iconBlock, {
          [classes.iconBlockSelected]: isSearching && pagesCount > 0,
          [classes.iconBlockSelectedError]: isSearching && pagesCount <= 0
        })}
          onClick={() => setDrawerOption('search')}>
          <SearchIcon  />
        </div>
      </Tooltip>
      <Tooltip title="Notebooks" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classnames(classes.iconBlock, { [classes.iconBlockSelected]: !!pageFilters.notebook })}
          onClick={() => setDrawerOption('notebooks')}>
          <CollectionsIcon />
        </div>
      </Tooltip>
      <Tooltip title="All notes" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classnames(classes.iconBlock, { [classes.iconBlockSelected]: notFiltering })}
          onClick={clearAllFilters}>
          <ClearAllIcon />
        </div>
      </Tooltip>
      <Tooltip title="Tags" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classnames(classes.iconBlock, { [classes.iconBlockSelected]: tagsFiltering })}
          onClick={() => setDrawerOption('tags')}>
          <FontAwesomeIcon icon={faTags} className={classes.faIcon}  />
        </div>
      </Tooltip>
      <Tooltip title="Languages" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classnames(classes.iconBlock, { [classes.iconBlockSelected]: !!pageFilters.language })}
          onClick={() => setDrawerOption('languages')}>
          <FontAwesomeIcon icon={faCode} className={classes.faIcon}  />
        </div>
      </Tooltip>
    </Paper>
  );
}

export default MainSidebar;