import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import SaveIcon from '@material-ui/icons/SaveRounded';
import Divider from '@material-ui/core/Divider';

import { getStyles as getSidebarStyles } from '../main/sidebarMenu/mainSidebar';

const getStyles = (theme: Theme) => {
  return {
    saveBtn: {
      color: theme.palette.primary.main
    },
    ...getSidebarStyles(theme)
  };
};

type DrawerOption = 'back' | 'save';

export interface IPageEditSidebarProps {
  onPageGoBack: () => void;
  onPageSubmit: () => void;
}

function PageEditSidebar({ onPageGoBack, onPageSubmit }: IPageEditSidebarProps) {
  const classes = makeStyles(getStyles)({});
  const [drawerOption, setDrawerOption] = useState<DrawerOption>(null);

  const getDrawerComponent = useCallback(() => {
    switch (drawerOption) {
      default:
        return null;
    }
  }, [drawerOption]);

  const onSaveClick = useCallback(async () => {
    onPageSubmit();
  }, []);

  return (
    <Paper className={classes.root}>
      <Drawer open={!!drawerOption} onClose={() => setDrawerOption(null)}>
        <Paper className={classes.drawerRoot}>
          {getDrawerComponent()}
        </Paper>
      </Drawer>
            
      <Tooltip title="Back" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onPageGoBack}>
          <FontAwesomeIcon icon={faReply} className={classes.faIcon}  />
        </div>
      </Tooltip>
      <Divider />
      <Tooltip title="Save" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onSaveClick}>
          <SaveIcon className={classes.saveBtn} />
        </div>
      </Tooltip>
    </Paper>
  );
}

PageEditSidebar.propTypes = {
  onPageGoBack: PropTypes.func.isRequired,
  onPageSubmit: PropTypes.func.isRequired
};

export default PageEditSidebar;