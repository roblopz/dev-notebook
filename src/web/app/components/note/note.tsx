import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Formik } from 'formik';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import getStyle from '../../styles/jss/note/note';

// Components
import HeaderIcons from '../common/headerIcons';
import RichEditor from './richEditor';

export interface INoteData {
  header: string;
  subheader: string;
  body: string;
  snippet: string;
}

export default function Note() {
  const classes = makeStyles(getStyle)();

  const getInitialValues = useCallback((): INoteData => ({
    header: '',
    subheader: '',
    body: '',
    snippet: ''
  }), []);

  return (
    <Paper className={classes.root}>
      {/* Generalities */}
      <HeaderIcons className={classes.headerIconOverride} />      
      <Formik initialValues={getInitialValues()} onSubmit={(...args) => console.log(args)}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <TextField label="Note header" className="mb-2" fullWidth
              {...mapMuiFormikdProps('header', values, errors, touched)} onChange={handleChange} />

            <TextField className="mt-1" label="Subheader"
              inputProps={{ className: classes.titleTextFieldInput }}
              InputLabelProps={{ className: classes.titleTextFieldLabel }}
              placeholder="optional*" variant="outlined" fullWidth
              {...mapMuiFormikdProps('subheader', values, errors, touched)} onChange={handleChange} />
          </form>
        )}
      </Formik>
      
      {/* Rich text editor */}
      <Typography variant="button" className="text-capitalize mb-1 mt-3" component="label" color="textSecondary">
        Content
      </Typography>
      <RichEditor />

      <div className="mt-3 mb-2 px-3">
        <div className="divider">
          <Typography variant="button">AND / OR</Typography>
        </div>   
      </div>

      {/* Code editor */}
      <Typography variant="button" className="text-capitalize mb-1" component="label" color="textSecondary">
        Code
      </Typography>
    </Paper>
  );
}