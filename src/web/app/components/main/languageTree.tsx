import React, { useState, useCallback, useRef } from 'react';
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
import FilteredIcon from '@material-ui/icons/FilterListRounded';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { getStyles } from '../../styles/jss/main/languageTree';
import { IGetAllNoteLanguagesData, queries } from '../../graphql/queries/noteQueries';
import { IPageFilters } from '../../graphql/@client/appState';

interface IGetLanguagesFilterResult {
  pageFilters: Pick<IPageFilters, 'languages'>;
}

const GET_LANGUAGES_FILTER = gql`
  query getFilterLanguages {
    pageFilters {
      languages
    }
  }
`;

function LanguageTree() {
  const classes = makeStyles(getStyles)({});
  const [treeOpen, setTreeOpen] = useState(false);
  const filterRef = useRef(null);

  const { data: { languages = [] } } = useQuery<IGetAllNoteLanguagesData>(queries.GET_ALL_NOTE_LANGUAGES);
  const { data: { pageFilters: { languages: filteringLanguages } } } = useQuery<IGetLanguagesFilterResult>(GET_LANGUAGES_FILTER);

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
        <List disablePadding>
          {languages.map((lang, idx) => (
            <ListItem key={idx} button className="py-1">
              <ListItemIcon className="no-min-width mr-3">
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText inset primary={lang} className="pl-0" />
              {filteringLanguages.includes(lang) ?
                <ListItemIcon className={classes.filteredIcon}>
                  <FilteredIcon />
                </ListItemIcon> : null}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

export default LanguageTree;