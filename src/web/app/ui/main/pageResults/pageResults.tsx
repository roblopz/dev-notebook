import React, { useEffect, useCallback, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Theme } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';

import PageCard from './pageCard';
import { PageFiltersResp, pageFiltersQuery } from '../../../graphql/queries/pageFilters';
import { PagesResp, PagesInput, pagesQuery } from '../../../graphql/queries/pages';
import { setPagesCountMutation, SetPagesCountResp, SetPagesCountInput } from '../../../graphql/mutations/setPagesCount';

const getStyles = (theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2)
    },
    loadingSpin: {
      color: theme.palette.primary.main,
      textAlign: 'center' as 'center',
      position: 'sticky' as 'sticky',
      bottom: 0,
      width: '100%',
      padding: '5px 0',
      float: 'right' as 'right'
    }
  };
};

function PageResults() {
  const classes = makeStyles(getStyles)({});

  const setPagesCount = useMutation<SetPagesCountResp, SetPagesCountInput>(setPagesCountMutation);
  const { data: { pageFilters } } = useQuery<PageFiltersResp>(pageFiltersQuery);

  const {
    data: { result: { pages = [], hasMore = false, current = 1 } = {} },
    fetchMore,
    loading
  } = useQuery<PagesResp, PagesInput>(pagesQuery, {
    variables: { options: { ...pageFilters, current: 1 } }
  });

  const currentPage = useRef(current);
  const hasMorePages = useRef(true);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    hasMorePages.current = hasMore;
    currentPage.current = current;
  }, [pages]);

  useEffect(() => {
    setPagesCount({ variables: { count: pages.length } });
  }, [pages.length]);

  const fetchMorePages = useCallback(() => {
    if (!hasMorePages.current || refetching) return;

    setRefetching(true);
    
    fetchMore({
      variables: { options: { ...pageFilters, current: currentPage.current + 1 } },
      updateQuery: (prev, { fetchMoreResult }) => {
        setRefetching(false);
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          ...fetchMoreResult,
          result: {
            ...prev.result,
            ...fetchMoreResult.result,
            pages: [...prev.result.pages, ...fetchMoreResult.result.pages]
          }
        };
      }
    });
  }, [pageFilters]);

  return (
    <div className={classes.root}>
      {pages.map((p, idx) => {
        return (
          <React.Fragment key={p._id || idx}>
            {pages.length === (idx + 1) ?
              <Waypoint onEnter={fetchMorePages} /> : null}
            <PageCard  className={idx > 0 ? 'mt-4' : null} page={p} />
          </React.Fragment>
        );
      })}

      {loading || refetching ?
      <div className={classes.loadingSpin}>
        <Typography variant="overline">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading
        </Typography>
      </div> : null}
    </div>
  );
}

export default PageResults;