import React, { useCallback, useState, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';
import AddIcon from '@material-ui/icons/AddRounded';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/page/page';

// Components
import Note from '../note/note';
import MatAutocomplete, { IOption, IMatAutocompletePropsInternal } from '../common/matAutocomple';
import { ValueType } from 'react-select/lib/types';
import { MenuProps } from 'react-select/lib/components/Menu';
import { Divider, MenuItem } from '@material-ui/core';
import PageInfo from './pageInfo';

export interface IPageData {
  title: string;
  subtitle: string;
}

export default function Page() {
  const classes = makeStyles(getStyles)();

  const getInitialValues = useCallback((): IPageData => ({
    title: '',
    subtitle: ''
  }), []);

  const [tags, setTags] = useState<ValueType<IOption>>([]);
  const [notebook, setNotebook] = useState<ValueType<IOption>>(null);

  const loadTags = useCallback(async (inputValue) => {
    return [];
  }, []);

  const loadNotebooks = useCallback(async (inputValue) => {
    return [{ label: 'Loose pages', value: 'loosePages' }];
  }, []);

  const NotebookSelectMenu = useMemo(() => {
    return (props: MenuProps<IOption>) => {
      const { menuPaperProps } = props.selectProps as unknown as IMatAutocompletePropsInternal;
      return (
        <Paper {...menuPaperProps} {...props.innerProps}>
          {props.children}
          <Divider />
          <MenuItem className={classes.notebookAddMenuItem} component="div">
            Add...
          </MenuItem>
        </Paper>
      );
    };
  }, []);

  return (
    <Paper className={classes.root}>
      <Formik initialValues={getInitialValues()} onSubmit={(...args) => console.log(args)}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <React.Fragment>
            <div className={classes.pageTitle}>
              <TextField label="Page title" className="mb-2" fullWidth margin="dense"
                {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />
              <Fab color="default" className={classes.closeBtn}>
                <CloseIcon className={classes.closeBtnIcon} />
              </Fab>
            </div>
            <div className="d-flex">
              <section className={classes.pageInfoSection}>
                <form className={classes.pageInfoForm} onSubmit={handleSubmit}>
                  <MatAutocomplete
                    textFieldProps={{ label: 'Notebook', margin: 'dense', fullWidth: true }}
                    value={notebook} loadOptions={loadNotebooks} onChange={(val, action) => setNotebook(val)}
                    defaultOptions={[
                      { label: 'Loose pages', value: 'loosePages' }
                    ]}
                    components={{
                      Menu: NotebookSelectMenu
                    }} />

                  <MatAutocomplete textFieldProps={{ label: 'Tags', margin: 'dense', fullWidth: true }}
                    value={tags} loadOptions={loadTags} onChange={(options, action) => setTags(options)}
                    isMulti isAppendable />

                  <PageInfo className="mt-3" />

                  <div className={classes.pageInfoFooter}>
                    <div className={classes.pageOptionBtns}>
                      <Button className={classes.saveBtn} size="small" variant="contained" color="primary" type="button">
                        <SaveIcon fontSize="small" />&nbsp;Save
                       </Button>
                      <IconButton className={classes.optionsBtn} color="default">
                        <MoveVertIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </form>
              </section>
              <section className={classes.notesSection}>
                <Note />
                <Fab className={classes.addNoteIcon} color="primary" size="small">
                  <AddIcon />
                </Fab>
              </section>
            </div>
          </React.Fragment>
        )}
      </Formik>
    </Paper>
  );
}