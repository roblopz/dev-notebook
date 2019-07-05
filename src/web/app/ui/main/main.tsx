import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SidebarMenu from './sidebarMenu/sidebarMenu';
import PageResults from './pageResults/pageResults';
import { Theme } from '@material-ui/core';

export const getAppRootWrapperStyle = (theme: Theme) => ({
  display: 'flex',
  minHeight: '100vh'
});

export const getAppContentWrapperStyle = (theme: Theme) => ({
  flexGrow: 1,
  maxHeight: '100vh',
  overflow: 'auto'
});

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function Main() {
  const classes = makeStyles(getStyles)({});

  return (
    <div className={classes.root}>
      <SidebarMenu />
      <div className={classes.contentWrapper}>
        <PageResults />
      </div>
    </div>
  );
}

export default Main;