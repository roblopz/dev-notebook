import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CollectionsIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import BookIcon from '@material-ui/icons/BookOutlined';

import { getStyles } from '../../styles/jss/main/notebookTree';
import { IStateData, INotebook } from '../../redux/store/definitions';

export interface INotebookTreeProps {
  notebooks: IStateData<INotebook[]>;
}

function NotebookTree({
  notebooks
}: INotebookTreeProps) {
  const classes = makeStyles(getStyles)();
  const [treeOpen, setTreeOpen] = useState(false);
  const filterRef = useRef(null);

  const onTreeToggle = useCallback((evt: React.MouseEvent<HTMLElement>) => {
    let toggleOpen = !treeOpen;
    if (evt.target === filterRef.current)
      toggleOpen = true;

    setTreeOpen(toggleOpen);
  }, [treeOpen]);

  return (
    <div className={classes.root}>
      <ListItem button className="pl-2" onClick={onTreeToggle}>
        <ListItemIcon className="mr-2">
          <CollectionsIcon className={classes.notebooksIcon} />
        </ListItemIcon>
        <div>
          Notebooks
          <div>
            <InputBase inputRef={filterRef} placeholder="Filter" />
          </div>
        </div>
        {treeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={treeOpen} unmountOnExit>
        {notebooks.value.map((n, idx) => (
          <List key={idx} disablePadding>
            <ListItem button className="py-1">
              <ListItemIcon className="mr-2">
                <BookIcon />
              </ListItemIcon>
              <ListItemText inset primary={n.name} className="pl-0" />
            </ListItem>
          </List>
        ))}
      </Collapse>
    </div>
  );
}

NotebookTree.propTypes = {
  notebooks: PropTypes.object.isRequired
};

export default NotebookTree;