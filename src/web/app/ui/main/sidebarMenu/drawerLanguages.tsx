import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getAllLanguages, GetAllLanguagesResp } from '../../../graphql/queries/allLanguages';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { getDrawerTitleStyles } from './drawerSearch';
import { PageFilters } from '../../../graphql/appState';
import { sharedStyles } from '../../../styles/shared';

const getStyles = (theme: Theme) => {
  return {
    languageItem: {
      paddingLeft: theme.spacing(1),
      '&:hover': {
        color: sharedStyles.hoverColor
      }
    },
    languageItemSelected: {
      color: sharedStyles.hoverColor
    },
    ...getDrawerTitleStyles(theme),
  };
};

export interface IDrawerLanguagesProps {
  pageFilters: PageFilters;
  setFilters: (pageFilters: PageFilters) => void;
}

function DrawerLanguages({ pageFilters, setFilters }: IDrawerLanguagesProps) {
  const classes = makeStyles(getStyles)({});
  const { data: { languages = [] } } = useQuery<GetAllLanguagesResp>(getAllLanguages);

  const setLanguageFilter = useCallback(async (language: string) => {
    setFilters({ ...pageFilters, language });
  }, [pageFilters, setFilters]);

  return (
    <React.Fragment>
      <div className={classes.titleWrapper + ' mb-0'}>
        <Typography variant="h6">Languages</Typography>
        {pageFilters.language ?
          <Button size="small" onClick={() => setLanguageFilter(null)}>
            <FontAwesomeIcon icon={faTimes} className={classes.clearIcon} /> Clear
          </Button> : null}
      </div>
      
      <List dense={true}>
        {languages.map((lang, idx) => {
          return (
            <ListItem key={idx} button selected={lang === pageFilters.language}
              className={classes.languageItem} classes={{ selected: classes.languageItemSelected }}
              onClick={() => setLanguageFilter(lang)}>
              <ListItemText primary={lang} primaryTypographyProps={{ variant: 'body1' }} />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}

DrawerLanguages.propTypes = {
  pageFilters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default DrawerLanguages;