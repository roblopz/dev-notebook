import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useRouter from 'use-react-router';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import SaveIcon from '@material-ui/icons/SaveRounded';
import Divider from '@material-ui/core/Divider';

import { appRoutes } from '../../../lib/routes';
import { getStyles as getSidebarStyles } from '../../main/sidebarMenu';
import { IPageFormStatus } from '../page';

const getStyles = (theme: Theme) => {
  return {
    ...getSidebarStyles(theme)
  };
};

type DrawerOption = 'back' | 'save';

export interface IEditPageSidebarMenuProps {
  pageStatus: React.MutableRefObject<IPageFormStatus>;
  triggerPageSubmit: React.MutableRefObject<() => Promise<any>>;
}

function EditPageSidebarMenu({ pageStatus, triggerPageSubmit }: IEditPageSidebarMenuProps) {
  const classes = makeStyles(getStyles)({});
  const [drawerOption, setDrawerOption] = useState<DrawerOption>(null);
  const { history } = useRouter();

  const getDrawerComponent = useCallback(() => {
    switch (drawerOption) {
      default:
        return null;
    }
  }, [drawerOption]);

  const onBack = useCallback(() => {
    let goBack = true;
    if (pageStatus.current.isDirty)
      goBack = confirm('You have unsaved changes, want to cancel all?');

    if (goBack)
      history.push(appRoutes.index);
  }, []);

  const onSave = useCallback(async () => {
    try {
      await triggerPageSubmit.current();
      history.push(appRoutes.index);
    } catch { } // tslint:disable-line no-empty   
  }, []);

  return (
    <Paper className={classes.root}>
      <Drawer open={!!drawerOption} onClose={() => setDrawerOption(null)}>
        <Paper className={classes.drawerRoot}>
          {getDrawerComponent()}
        </Paper>
      </Drawer>
            
      <Tooltip title="Back" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onBack}>
          <FontAwesomeIcon icon={faReply} className={classes.faIcon}  />
        </div>
      </Tooltip>
      <Divider />
      <Tooltip title="Save" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onSave}>
          <SaveIcon />
        </div>
      </Tooltip>
    </Paper>
  );
}

EditPageSidebarMenu.propTypes = {
  pageStatus: PropTypes.shape({ current: PropTypes.object }).isRequired,
  triggerPageSubmit: PropTypes.shape({ current: PropTypes.func }).isRequired
};

export default EditPageSidebarMenu;