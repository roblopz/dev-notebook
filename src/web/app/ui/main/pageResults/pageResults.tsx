import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Theme } from '@material-ui/core';

import PageCard from './pageCard';
import { PageFiltersResp, pageFiltersQuery } from '../../../graphql/queries/pageFilters';
import { PagesResp, PagesInput, pagesQuery } from '../../../graphql/queries/pages';
import { setPagesCountMutation, SetPagesCountResp, SetPagesCountInput } from '../../../graphql/mutations/setPagesCount';

const getStyles = (theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2)
    }
  };
};

function PageResults() {
  const classes = makeStyles(getStyles)({});

  const setPagesCount = useMutation<SetPagesCountResp, SetPagesCountInput>(setPagesCountMutation);
  const { data: { pageFilters } } = useQuery<PageFiltersResp>(pageFiltersQuery);
  const { data: { pages = [] } } = useQuery<PagesResp, PagesInput>(pagesQuery, {
    variables: { options: pageFilters }
  });

  useEffect(() => {
    setPagesCount({ variables: { count: pages.length } });
  }, [pages.length]);

  return (
    <div className={classes.root}>
      {pages.map((p, idx) => <PageCard className={idx > 0 ? 'mt-3' : null} key={p._id || idx} page={p} />)}
    </div>
  );
}

export default PageResults;