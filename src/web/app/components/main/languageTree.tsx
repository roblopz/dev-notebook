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
import CodeIcon from '@material-ui/icons/CodeRounded';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

import { getStyles } from '../../styles/jss/main/languageTree';

export interface ILanguageTreeProps {
  languages: string[];
}

function LanguageTree({
  languages
}: ILanguageTreeProps) {
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
          <CodeIcon className={classes.languagesIcon} />
        </ListItemIcon>
        <div>
          Language
          <div>
            <InputBase inputRef={filterRef} placeholder="Filter" />
          </div>
        </div>
        {treeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={treeOpen} unmountOnExit>
        {languages.map((lang, idx) => (
          <List key={idx} disablePadding>
            <ListItem button className="py-1">
              <ListItemIcon className="no-min-width mr-3">
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText inset primary={lang} className="pl-0" />
            </ListItem>
          </List>
        ))}
      </Collapse>
    </div>
  );
}

LanguageTree.defaultProps = {
  languages: []
};

LanguageTree.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default LanguageTree;