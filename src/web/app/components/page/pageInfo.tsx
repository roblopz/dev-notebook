import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { getStyles } from '../../styles/jss/page/pageInfo';
import { Typography } from '@material-ui/core';

export interface IPageInfoProps {
  className?: string;
}

function PageInfo({
  className
}: IPageInfoProps) {
  const classes = makeStyles(getStyles)();

  return (
    <div {...(className ? { className } : null)}>
      <div className="divider mb-2">
        <span className="label-base">Page info</span>
      </div>
      <div className="d-flex align-items-center">
        <Typography className="flex-grow-1" variant="subtitle2">Notes: </Typography>
        <Typography variant="caption">2</Typography>
      </div>
      <div className="mt-1">
        <Typography className="w-100" variant="subtitle2">Languages: </Typography>
        <ul className="pl-4 mb-0">
          <li className={classes.language}>
            <Typography variant="caption">C#</Typography>
          </li>
          <li className={classes.language}>
            <Typography variant="caption">Javascript</Typography>
          </li>
        </ul>
      </div>
      <div className="d-flex flex-wrap align-items-center mt-2 w-100">
        <Typography className="flex-grow-1" variant="caption" color="textPrimary">Created: </Typography>
        <Typography variant="caption">28/08/19 - 20:30PM</Typography>
      </div>
      <div className="d-flex flex-wrap align-items-center mt-0 w-100">
        <Typography className="flex-grow-1" variant="caption" color="textPrimary">Updated: </Typography>
        <Typography variant="caption">31/08/19 - 12:34PM</Typography>
      </div>
      <div className="divider mb-3 mt-3" />
    </div>
  );
}

PageInfo.propTypes = {
  className: PropTypes.string
};

export default PageInfo;