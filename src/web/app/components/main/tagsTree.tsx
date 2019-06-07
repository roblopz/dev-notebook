import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/LabelRounded';
import Chip from '@material-ui/core/Chip';

import { getStyles } from '../../styles/jss/main/tagsTree';

export interface ITagsTreeProps {
  tags: string[];
}

function TagsTree({
  tags
}: ITagsTreeProps) {
  const classes = makeStyles(getStyles)({});
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
        <ListItemIcon className="no-min-width mr-3">
          <LabelIcon className={classes.tagsIcon} />
        </ListItemIcon>
        <div>
          Tags
          <div>
            <InputBase inputRef={filterRef} placeholder="Search..." />
          </div>
        </div>
        {treeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={treeOpen} unmountOnExit>
        <div className={classes.tagsContainer}>
          {tags.map((tag, idx) => (
            <Chip key={idx} label={tag} onClick={() => {}}
              className={classes.tag} />
          ))}
        </div>
      </Collapse>
    </div>
  );
}

TagsTree.defaultProps = {
  tags: []
};

TagsTree.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TagsTree;