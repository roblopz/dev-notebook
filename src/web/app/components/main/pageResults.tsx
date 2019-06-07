import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';

import { getStyles } from '../../styles/jss/main/pageResults';
import PageView from '../pageView/pageView';
import { queries, IGetPageResultsData } from '../../graphql/queries/pageQueries';
const GET_PAGE_RESULTS = queries.GET_PAGE_RESULTS;

function PageResults() {
  const classes = makeStyles(getStyles)({});
  const { data: { pages }, loading } = useQuery<IGetPageResultsData>(GET_PAGE_RESULTS);

  if (loading)
    return null;

  return (
    <div className={classes.root}>
      {pages.map((p, idx) =>
        <PageView className={idx > 0 ? 'mt-3' : null} key={p._id || idx} page={p} />)}
    </div>
  );
}

export default PageResults;