import React, { useRef, useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Subject } from 'rxjs';
import { useQuery } from 'react-apollo-hooks';
import useRouter from 'use-react-router';

import PageEditSidebar from './pageEditSidebar';
import EditingPage from './editingPage/editingPage';
import { getAppRootWrapperStyle, getAppContentWrapperStyle } from '../main/mainIndex';
import { appRoutes } from '../../lib/routes';
import { pageQuery, PageArgs, PageResp } from '../../graphql/queries/page';
import { PageType } from '../../graphql/queries/pages';

const getStyles = (theme: any) => ({
  root: { ...getAppRootWrapperStyle(theme) },
  contentWrapper: { ...getAppContentWrapperStyle(theme) }
});

function PageEditIndex() {
  const classes = makeStyles(getStyles)({});
  const { history } = useRouter();
  const triggerSubmit = useRef<Subject<void>>(new Subject());
  const triggerGoBack = useRef<Subject<void>>(new Subject());
  const [skipPageQuery, setskipPageQuery] = useState(true);
  const { match } = useRouter<{ id: string }>();

  const onPageSubmit = useCallback(() => {
    triggerSubmit.current.next();
  }, []);

  const onPageGoBack = useCallback  (() => {
    triggerGoBack.current.next();
  }, []);

  const onPageSubmitted = useCallback(() => {
    history.push(appRoutes.index);
  }, []);

  const { data } = useQuery<PageResp, PageArgs>(pageQuery, {
    variables: { id: match.params.id }, skip: skipPageQuery
  });

  const page: PageType = data && data.page;
  
  useEffect(() => {
    const { path, params: { id } } = match;
    if (path === appRoutes.editPageRoot && id)
      setskipPageQuery(false);
  }, []);
 
  return (
    <div className={classes.root}>
      <PageEditSidebar onPageGoBack={onPageGoBack} onPageSubmit={onPageSubmit} />
      <div className={classes.contentWrapper}>
        <EditingPage page={page} onSubmitted={onPageSubmitted}
          onSubmit={triggerSubmit.current} onGoBack={triggerGoBack.current} />
      </div>
    </div>
  );
}

export default PageEditIndex;