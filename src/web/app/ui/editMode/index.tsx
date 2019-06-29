import React from 'react';
import { makeStyles } from '@material-ui/styles';

import SidebarMenu from './editModeSidebarMenu';
import Page from './page';
import { getAppRootWrapperStyle, getAppContentWrapperStyle } from '../main';

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function AddEditPage() {
  const classes = makeStyles(getStyles)({});

  return (
    <div className={classes.root}>
      <SidebarMenu />
      <div className={classes.contentWrapper}>
        <Page onClose={() => console.log('closing')} />
      </div>
    </div>
  );
}

export default AddEditPage;