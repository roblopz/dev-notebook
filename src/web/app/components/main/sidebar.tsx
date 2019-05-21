import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';

import { getStyles } from '../../styles/jss/main/sidebar';
import NotebookTree from './notebookTree';
import LanguageTree from './languageTree';

function Sidebar() {
  const classes = makeStyles(getStyles)();
  const notebooks = useSelector(state => state.notebooks);

  return (
    <Drawer variant="permanent">
      <div className={classes.toolbar} />
      <NotebookTree notebooks={notebooks} />
      <LanguageTree languages={['Javascript', 'C#', 'Perl', 'Text']} />
    </Drawer>
  );
}

Sidebar.propTypes = {

};

export default Sidebar;