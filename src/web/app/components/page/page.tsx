import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import getStyle from '../../styles/jss/page/page';

// Components
import Note from '../note/note';
import HeaderIcons from '../common/headerIcons';

export interface IPageData {
  title: string;
  subtitle: string;
}

export default function Page() {
  const classes = makeStyles(getStyle)();

  const getInitialValues = useCallback((): IPageData => ({
    title: '',
    subtitle: ''
  }), []);

  return (
    <Paper className={classes.root}>
      <HeaderIcons />
      <Formik initialValues={getInitialValues()} onSubmit={(...args) => console.log(args)}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <TextField label="Page title" className="mb-2" fullWidth
              {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />

            <TextField className="mt-1" label="Subtitle"
              inputProps={{ className: classes.titleTextFieldInput }}
              InputLabelProps={{ className: classes.titleTextFieldLabel }}
              placeholder="optional*" variant="outlined" fullWidth
              {...mapMuiFormikdProps('subtitle', values, errors, touched)} onChange={handleChange}  />
          </form>
        )}
      </Formik>
      <Note />
    </Paper>
  );
}