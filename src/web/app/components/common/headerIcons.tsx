import React from 'react';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';

import { headerIcons as getStyle } from '../../styles/jss/shared';

interface NotePropTypes {
  className?: string;
}

function Note({ className }: NotePropTypes) {
  const classes = makeStyles(getStyle)();

  return (
    <div className={classnames(classes.root, { [className || '']: !!className })}>
      <SaveAltIcon className="mr-1" fontSize="small" />
      <Typography variant="caption">07/12/2019</Typography>
      <CachedIcon className="ml-2 mr-1" fontSize="small" />
      <Typography variant="caption">08/08/2019</Typography>
    </div>
  );
}

Note.propTypes = {
  className: propTypes.string
};

export default Note;