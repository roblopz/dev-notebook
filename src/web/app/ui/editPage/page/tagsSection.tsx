import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import deburr from 'lodash/deburr';
import { FormikProps } from 'formik';

import { mapMuiFormikdProps } from '../../../lib/muiFormik';
import MatAutocomplete, { IOption, IMatAutocompleteProps } from '../../common/matAutocomple';
import { IPage } from '../../../graphql/models';
import { WithOptional } from '../../../../../shared/tsUtil';
import { Theme } from '@material-ui/core';

const getStyles = (theme: Theme) => {
  return {
    root: {
      width: '100%'
    },
    formControl: {
      marginTop: 4,
      marginBottom: 0
    },
    underline: {
      '&::after': {
        content: 'none'
      },
      '&::before': {
        content: 'none'
      }
    }
  };
};

function tagCamelCase(str: string, maxLength = 0) {
  str = deburr(str || '').trim();

  if (!str)
    return str;

  const rgx = /[^a-z0-9\.\+\-\/#]/ig;
  const splitted = str.split(rgx).filter(s => !!s);

  let res = splitted.reduce((acc, curr, idx) => {
    if (idx > 0)
      acc += curr.charAt(0).toUpperCase() + curr.substr(1).toLowerCase();
    else
      acc += curr.charAt(0).toLowerCase() + curr.substr(1).toLowerCase();
    return acc;
  }, '');

  if (maxLength && res.length > maxLength) {
    res = res.substr(0, maxLength);
  }

  return res;
}

export interface IPageTagsSectionProps {
  parentFormBag: FormikProps<WithOptional<IPage, '_id'>>;
}

function PageTagsSection({ parentFormBag }: IPageTagsSectionProps) {
  const { values, errors, touched, setFieldValue } = parentFormBag;
  const classes = makeStyles(getStyles)({});

  const loadTags = useCallback(async (inputValue) => {
    return [];
  }, []);

  const tagsSelectOnEnter = useCallback((evt: React.KeyboardEvent<HTMLInputElement>, props: IMatAutocompleteProps<string>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
  
    const camelCased = tagCamelCase((evt.target as any).value as string, 15);
    if (camelCased) {
      const allTags = props.getValue() as Array<IOption<string>>;
  
      if (allTags.some(t => t.value.toLowerCase() === camelCased.toLowerCase())) {
        props.selectProps.setInputValue('');
      } else {
        const allTags = props.getValue() as Array<IOption<string>>;
        const newTag = { label: camelCased, value: camelCased };
        props.setValue([...allTags as any, newTag], 'set-value');
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <MatAutocomplete placeholder="Tags"
        value={(values.tags || []).map(tag => ({ value: tag, label: tag }))}
        isMulti
        textFieldProps={{
          margin: 'dense',
          fullWidth: true,
          multiline: true,
          classes: {
            root: classes.formControl
          },
          InputProps: {
            classes: { underline: classes.underline }
          },
          ...mapMuiFormikdProps('tags', values, errors, touched)
        }}
        onEnter={tagsSelectOnEnter}
        loadOptions={loadTags}
        onChange={(tagOptions: Array<IOption<string>>) => {
          setFieldValue('tags', tagOptions.map(opt => opt.value));
        }} />
    </div>
  );
}

PageTagsSection.propTypes = {
  parentFormBag: PropTypes.object.isRequired
};

export default PageTagsSection;