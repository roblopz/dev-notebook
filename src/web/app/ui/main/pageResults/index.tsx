import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';

import PageCard from './pageCard';
import { queries, GetPagesResult } from '../../../graphql/queries/pageQueries';

const getStyles = (theme: any) => {
  return {
    root: {
      padding: theme.spacing(2)
    }
  };
};

function PageResults() {
  const classes = makeStyles(getStyles)({});
  const { data: { pages = [] } } = useQuery<GetPagesResult>(queries.GET_PAGES);

  return (
    <div className={classes.root}>
      {pages.map((p, idx) => <PageCard className={idx > 0 ? 'mt-3' : null} key={p._id || idx} page={p} />)}
    </div>
  );
}

export default PageResults;