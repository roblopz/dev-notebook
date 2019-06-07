import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import { getStyles } from '../../styles/jss/main/sidebar';
import PageSearch from './pageSearch';
import NotebookTree from './notebookTree';
import LanguageTree from './languageTree';
import TagsTree from './tagsTree';

function Sidebar() {
  const classes = makeStyles(getStyles)({});

  return (
    <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <div className={classes.toolbar} />
      <PageSearch />
      <Divider />
      <div className="h-100">
        <NotebookTree />
        <LanguageTree languages={['javascript', '.NET']} />
        <TagsTree tags={[]} />
      </div>
    </Drawer>
  );
}

export default Sidebar;