import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import { useQuery } from 'react-apollo-hooks';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddRounded';

import { mapMuiFormikdProps } from '../../../lib/muiFormik';
import { Theme } from '@material-ui/core';
import { CreateOrUpdatePagePage } from '../../../graphql/mutations/createOrUpdatePage';
import { notebooksQuery, NotebooksResp } from '../../../graphql/queries/notebooks';
import AddNotebookDialog from '../../notebooks/addNotebookDialog';

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
    },
    notebookSelect: {
      position: 'relative' as 'relative',
      top: 5
    },
    notebookSelectNoValue: {
      color: 'rgba(0, 0, 0, 0.4)'
    },
    dialogContainer: {
      alignItems: 'baseline',
      paddingTop: '5vh'
    }
  };
};

export interface IPageHeaderSectionProps {
  parentFormBag: FormikProps<CreateOrUpdatePagePage>;
}

function PageHeaderSection({ parentFormBag }: IPageHeaderSectionProps) {
  const { values, errors, touched, handleChange, setFieldValue } = parentFormBag;
  const classes = makeStyles(getStyles)({});
  const { data: { notebooks: serverNotebooks = [] } } = useQuery<NotebooksResp>(notebooksQuery);
  const [addedNotebooks, setAddedNotebooks] = useState<string[]>([]);
  const [addingNotebook, setAddingNotebook] = useState(false);

  const allNotebooks = useMemo(() => {
    return [...serverNotebooks, ...addedNotebooks.map(n => ({ name: n, _id: null }))]
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [serverNotebooks, addedNotebooks]);

  const okAddNotebook = useCallback((newName: string) => {
    if (newName && newName.length > 1) {
      setAddedNotebooks(added => [...added, newName]);
      setFieldValue('notebook', newName);
    }

    setAddingNotebook(false);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.pageTitle}>
        <TextField fullWidth margin="dense" placeholder="Page title"
          {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />
      </div>
      <div className={classes.notebook}>
        {(() => {
          const { name, value, error, helperText } = mapMuiFormikdProps("notebook", values, errors, touched);
          return (
            <FormControl fullWidth error={error}>
              {/* <InputLabel htmlFor="notebook">Notebook</InputLabel> */}
              <NativeSelect value={value} onChange={handleChange} name={name}
                input={<Input id="notebook" endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setAddingNotebook(true)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                } />}
                className={classes.notebookSelect} classes={{ root: !value ? classes.notebookSelectNoValue : '' }}>
                <>
                  <option value="">Select a notebook...</option>
                  {allNotebooks.map((n, idx) => (<option key={n._id || idx} value={n.name}>{n.name}</option>))}
                </>
              </NativeSelect>
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          );
        })()}
      </div>

      <AddNotebookDialog open={addingNotebook} onClose={() => setAddingNotebook(false)} onOk={okAddNotebook} />
    </div>
  );
}

PageHeaderSection.propTypes = {
  parentFormBag: PropTypes.object.isRequired
};

export default PageHeaderSection;