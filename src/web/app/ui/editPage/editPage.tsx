import React, { useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Subject } from 'rxjs';

import EditPageSidebarMenu from './sidebarMenu';
import Page, { IPageFormStatus } from './page/page';
import { getAppRootWrapperStyle, getAppContentWrapperStyle } from '../main/main';
import useRouter from 'use-react-router';
import { appRoutes } from '../../lib/routes';

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function EditPage() {
  const classes = makeStyles(getStyles)({});
  const { history } = useRouter();

  const pageFormStatus = useRef<IPageFormStatus>({});
  const triggerSubject = useRef<Subject<void>>(new Subject());

  const triggerPageSubmit = useCallback(() => {
    triggerSubject.current.next();
  }, []);

  const onPageSubmitted = useCallback(() => {
    history.push(appRoutes.index);
  }, []);

  return (
    <div className={classes.root}>
      <EditPageSidebarMenu pageStatus={pageFormStatus} triggerPageSubmit={triggerPageSubmit} />
      <div className={classes.contentWrapper}>
        <Page submitSubject={triggerSubject.current} formStatus={pageFormStatus} onSubmitted={onPageSubmitted} />
      </div>
    </div>
  );
}

export default EditPage;