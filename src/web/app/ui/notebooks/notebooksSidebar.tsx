import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { getStyles as getSidebarStyles } from '../main/sidebarMenu/mainSidebar';

const getStyles = (theme: Theme) => {
  return {
    ...getSidebarStyles(theme)
  };
};

export interface INotebooksSidebarProps {
  onGoBack: () => void;
}

function NotebooksSidebar({ onGoBack }: INotebooksSidebarProps) {
  const classes = makeStyles(getStyles)({});

  return (
    <Paper className={classes.root}>
      <Tooltip title="Back" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onGoBack}>
          <FontAwesomeIcon icon={faReply} className={classes.faIcon}  />
        </div>
      </Tooltip>
      <Divider />
      <div className={classes.addIconBlock}>
        <Tooltip title="Add notebook" placement="right" classes={{ tooltip: classes.iconTooltip }}>
          <Fab color="primary" size="small" onClick={() => {}}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </Paper>
  );
}

NotebooksSidebar.propTypes = {
  onGoBack: PropTypes.func.isRequired
};

export default NotebooksSidebar;