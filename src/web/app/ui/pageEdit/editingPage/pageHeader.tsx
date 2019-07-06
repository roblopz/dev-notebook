import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NewIcon from '@material-ui/icons/FiberNewRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import { useApolloClient } from 'react-apollo-hooks';

import { mapMuiFormikdProps } from '../../../lib/muiFormik';
import MatAutocomplete, { IOption, IMatAutocompleteProps } from '../../common/matAutocomple';
import { Theme } from '@material-ui/core';
import { NotebooksByNameResp, NotebooksByNameArgs, notebooksByNameQuery } from '../../../graphql/queries/notebooksByName';
import { CreateOrUpdatePagePage } from '../../../graphql/mutations/createOrUpdatePage';

type NotebookOption = { name: string };

const getStyles = (theme: Theme) => {
  return {
    root: {
      display: 'flex',
      width: '100%',
      padding: '0 4px'
    },
    pageTitle: {
      marginRight: theme.spacing(1),
      minWidth: '60%'
    },
    notebook: {
      flexGrow: 1
    },
    newNotebookIcon: {
      color: '#4caf50',
      position: 'relative' as 'relative',
      top: -1
    }
  };
};

export interface IPageHeaderSectionProps {
  parentFormBag: FormikProps<CreateOrUpdatePagePage>;
}

function PageHeaderSection({ parentFormBag }: IPageHeaderSectionProps) {
  const { values, errors, touched, setFieldValue, handleChange } = parentFormBag;
  const classes = makeStyles(getStyles)({});
  const [isNewNotebook, setIsNewNotebook] = useState(false);
  const apolloClient = useApolloClient();

  const notebookSelectOnEnter = useCallback((
    evt: React.KeyboardEvent<HTMLInputElement>,
    props: IMatAutocompleteProps<NotebookOption>
  ) => {
    // Prevent form submission
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    let notebookName: string;

    if (!(notebookName = (evt.target as any).value.trim()))
      return;

    const { options, selectOption, setValue } = props;
    const targetOption = (options as Array<IOption<NotebookOption>>)
      .find(opt => (opt.value.name || '').trim().toUpperCase() === notebookName.toUpperCase());

    if (targetOption) {
      selectOption(targetOption);
      setIsNewNotebook(false);
    } else {
      setValue({ label: notebookName, value: { name: notebookName } });
      setIsNewNotebook(true);
    }
  }, []);

  const loadNotebooks = useCallback(async (inputValue) => {
    const { data: { notebooks = [] } = {} } = await apolloClient.query<NotebooksByNameResp, NotebooksByNameArgs>({
      query: notebooksByNameQuery,
      variables: { name: inputValue },
      fetchPolicy: 'network-only'
    });

    return notebooks.map(n => ({
      label: n.name,
      value: { name: n.name }
    }));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.pageTitle}>
        <TextField fullWidth margin="dense" placeholder="Page title"
          {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />
      </div>
      <div className={classes.notebook}>
        <MatAutocomplete<NotebookOption> placeholder="Notebook"
          value={values.notebook ? { label: values.notebook, value: { name: values.notebook } } : null}
          isClearable={true}
          textFieldProps={{
            margin: 'dense',
            fullWidth: true,
            ...mapMuiFormikdProps('notebook', values, errors, touched),
            InputProps: {
              startAdornment: isNewNotebook ?
                <InputAdornment position="start" className="mr-0">
                  <NewIcon className={classes.newNotebookIcon} />
                </InputAdornment> : null
            }
          }}
          onEnter={notebookSelectOnEnter}
          loadOptions={loadNotebooks}
          onChange={(notebookOption: any) => {
            if (!notebookOption || !notebookOption.value) {
              setIsNewNotebook(false);
              setFieldValue('notebook', '');
            } else {
              setFieldValue('notebook', notebookOption.value.name);
            }
          }} />
      </div>
    </div>
  );
}

PageHeaderSection.propTypes = {
  parentFormBag: PropTypes.object.isRequired
};

export default PageHeaderSection;