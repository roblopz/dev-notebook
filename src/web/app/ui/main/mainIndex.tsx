import React from 'react';
import { makeStyles } from '@material-ui/styles';

import MainSidebar from './sidebarMenu/mainSidebar';
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

function MainIndex() {
  const classes = makeStyles(getStyles)({});

  return (
    <div className={classes.root}>
      <MainSidebar />
      <div className={classes.contentWrapper}>
        <PageResults />
      </div>
    </div>
  );
}

export default MainIndex;