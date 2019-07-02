import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useApolloClient } from 'react-apollo-hooks';

import PageCard from './pageCard';
import { PageFiltersResp, pageFiltersQuery } from '../../../graphql/queries/pageFilters';
import { PagesResp, PagesInput, pagesQuery } from '../../../graphql/queries/pages';
import { IAppState } from '../../../graphql/appState';

const getStyles = (theme: any) => {
  return {
    root: {
      padding: theme.spacing(2)
    }
  };
};

function PageResults() {
  const classes = makeStyles(getStyles)({});
  const apolloClient = useApolloClient();

  const { data: { pageFilters } } = useQuery<PageFiltersResp>(pageFiltersQuery);
  const { __typename, ...pagesInput } = pageFilters;
  const { data: { pages = [] } } = useQuery<PagesResp, PagesInput>(pagesQuery, {
    variables: { options: pagesInput }
  });

  useEffect(() => {
    apolloClient.writeData<Pick<IAppState, 'showingPagesCount'>>({
      data: {
        showingPagesCount: pages.length
      }
    });
  }, [pages.length]);

  return (
    <div className={classes.root}>
      {pages.map((p, idx) => <PageCard className={idx > 0 ? 'mt-3' : null} key={p._id || idx} page={p} />)}
    </div>
  );
}

export default PageResults;