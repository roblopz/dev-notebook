import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'use-react-router';

import NotebooksSidebar from './notebooksSidebar';
import Notebooks from './notebooks';
import { getAppRootWrapperStyle, getAppContentWrapperStyle } from '../main/mainIndex';
import { appRoutes } from '../../lib/routes';

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function NotebooksIndex() {
  const classes = makeStyles(getStyles)({});
  const { history } = useRouter();

  const onGoBack = useCallback(() => {
    history.push(appRoutes.index);
  }, []);
   
  return (
    <div className={classes.root}>
      <NotebooksSidebar onGoBack={onGoBack} />
      <div className={classes.contentWrapper}>
        <Notebooks />
      </div>
    </div>
  );
}

export default NotebooksIndex;