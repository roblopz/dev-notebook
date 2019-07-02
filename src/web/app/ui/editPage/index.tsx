import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import EditPageSidebarMenu from './editPageSidebarMenu';
import Page, { IPageFormStatus } from './page';
import { getAppRootWrapperStyle, getAppContentWrapperStyle } from '../main';

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function EditPage() {
  const classes = makeStyles(getStyles)({});
  const pageFormStatus = useRef<IPageFormStatus>({});
  const triggerPageSubmit = useRef<() => Promise<any>>(null);

  return (
    <div className={classes.root}>
      <EditPageSidebarMenu pageStatus={pageFormStatus} triggerPageSubmit={triggerPageSubmit} />
      <div className={classes.contentWrapper}>
        <Page triggerSubmit={triggerPageSubmit} formStatus={pageFormStatus} onClose={() => console.log('closing')} />
      </div>
    </div>
  );
}

export default EditPage;