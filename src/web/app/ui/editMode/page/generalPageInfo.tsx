import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import { IPage } from '../../../models';
import { WithOptional } from '../../../../../shared/tsUtil';

export interface IPageInfoProps {
  page: WithOptional<IPage, '_id'>;
  className?: string;
}

const getStyles = (theme: any) => {
  return {
    language: {
      lineHeight: '20px'
    }
  };
};

function GeneralPageInfo({ page, className }: IPageInfoProps) {
  const classes = makeStyles(getStyles)({});
  const languages = page.notes.map(n => n.snippet && !n.hideSnippet && n.snippet.language)
    .filter((elem, pos, arr) => {
      return !!elem && arr.indexOf(elem) === pos;
    });

  return (
    <div {...(className ? { className } : null)}>
      <div className="divider mb-2">
        <span className="label-base">Page info</span>
      </div>
      <div className="d-flex align-items-center">
        <Typography className="flex-grow-1" variant="subtitle2">Notes: </Typography>
        <Typography variant="caption">{page.notes.length}</Typography>
      </div>
      {languages.length ?
        <div className="mt-1">
          <Typography className="w-100" variant="subtitle2">Languages: </Typography>
          <ul className="pl-4 mb-0">
            {languages.map((lang, i) => (
              <li key={i} className={classes.language}>
                <Typography variant="caption">{lang}</Typography>
              </li>
            ))}
          </ul>
        </div>
        : null}

      <div className="d-flex flex-wrap align-items-center mt-2 w-100">
        <Typography className="flex-grow-1" variant="subtitle2" color="textPrimary">Created: </Typography>
        <Typography variant="caption">{page.createdAt || 'Just now'}</Typography>
      </div>

      {page.updatedAt ?
        <div className="d-flex flex-wrap align-items-center mt-1 w-100">
          <Typography className="flex-grow-1" variant="subtitle2" color="textPrimary">Updated: </Typography>
          <Typography variant="caption">{page.updatedAt}</Typography>
        </div> : null}
      <div className="divider mb-3 mt-2" />
    </div>
  );
}

GeneralPageInfo.propTypes = {
  className: PropTypes.string
};

export default GeneralPageInfo;