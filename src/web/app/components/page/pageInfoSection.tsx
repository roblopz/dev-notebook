import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import deburr from 'lodash/deburr';
import NewIcon from '@material-ui/icons/FiberNewRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormikProps } from 'formik';

import PageFooter from './pageFooter';
import { mapMuiFormikdProps } from '../../lib/muiFormik';
import GeneralPageInfo from './generalPageInfo';
import MatAutocomplete, { IOption, IMatAutocompleteProps } from '../common/matAutocomple';
import { getStyles } from '../../styles/jss/page/pageInfoSection';
import { IPage, INotebook } from '../../redux/store/definitions';

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

function tagsSelectOnEnter(
  evt: React.KeyboardEvent<HTMLInputElement>,
  props: IMatAutocompleteProps<string>
): void {
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
}

export interface IPageInfoSectionProps {
  parentFormBag: FormikProps<Partial<IPage>>;
  className?: string;
}

function PageInfoSection({
  parentFormBag,
  className
}: IPageInfoSectionProps) {
  const { values, errors, touched, handleSubmit, setFieldValue } = parentFormBag;
  const classes = makeStyles(getStyles)();
  const [isNewNotebook, setIsNewNotebook] = useState(false);

  const notebookSelectOnEnter = useCallback((
    evt: React.KeyboardEvent<HTMLInputElement>,
    props: IMatAutocompleteProps<INotebook>
  ) => {
    // Prevent form submission
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    let notebookName: string;

    if (!(notebookName = (evt.target as any).value.trim()))
      return;

    const { options, selectOption, setValue } = props;
    const targetOption = (options as Array<IOption<INotebook>>)
      .find(opt => (opt.value.name || '').trim().toUpperCase() === notebookName.toUpperCase());

    if (targetOption) {
      selectOption(targetOption);
      setIsNewNotebook(false);
    } else {
      setValue({ label: notebookName, value: { name: notebookName } });
      setIsNewNotebook(true);
    }
  }, []);

  const loadTags = useCallback(async (inputValue) => {
    return [];
  }, []);

  const loadNotebooks = useCallback(async (inputValue): Promise<Array<IOption<INotebook>>> => {
    return [{ label: 'ok', value: { name: 'sds', _id: undefined } }, { label: 'no', value: { name: 'noso', _id: undefined } }];
  }, []);

  return (
    <section className={classes.root + (className ? ` ${className}` : '')}>
      <div className={classes.wrapper}>
        <MatAutocomplete menuItemClass={classes.notebookAddMenuItem}
          value={values.notebook ? { label: values.notebook.name, value: values.notebook } : null}
          isClearable={true}
          textFieldProps={{
            label: 'Notebook',
            margin: 'dense',
            fullWidth: true,
            ...mapMuiFormikdProps('notebook.name', values, errors, touched.notebook ? { notebook: { name: true } } : touched)
          }}
          InputProps={{
            startAdornment: isNewNotebook ?
              <InputAdornment position="start" className="mr-0">
                <NewIcon className={classes.newNotebookIcon} />
              </InputAdornment> : null,
          }}
          onEnter={notebookSelectOnEnter}
          loadOptions={loadNotebooks}
          onChange={(notebookOption: IOption<INotebook>) => {
            if (!notebookOption) setIsNewNotebook(false);
            setFieldValue('notebook', notebookOption && notebookOption.value);
          }} />

        <MatAutocomplete value={(values.tags || []).map(tag => ({ value: tag, label: tag }))}
          isMulti
          textFieldProps={{
            label: 'Tags',
            margin: 'dense',
            fullWidth: true,
            ...mapMuiFormikdProps('tags', values, errors, touched)
          }}
          onEnter={tagsSelectOnEnter}
          loadOptions={loadTags}
          onChange={(tagOptions: Array<IOption<string>>) => {
            setFieldValue('tags', tagOptions.map(opt => opt.value));
          }} />

        <GeneralPageInfo page={values} className="mt-3" />
        <PageFooter onPageDelete={() => {}} onPageSubmit={() => {
          console.log(values);
          handleSubmit();
        }} />
      </div>
    </section>
  );
}

PageInfoSection.propTypes = {
  className: PropTypes.string,
  parentFormBag: PropTypes.object.isRequired
};

export default PageInfoSection;