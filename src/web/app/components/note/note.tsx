import React, { useCallback, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import { Formik } from 'formik';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/note/note';

// Components
import RichEditor from './richEditor';
import CodeEditor from './codeEditor';

export interface INoteData {
  header: string;
  subheader: string;
  body: string;
  snippet: string;
}

export default function Note() {
  const classes = makeStyles(getStyles)();

  const getInitialValues = useCallback((): INoteData => ({
    header: '',
    subheader: '',
    body: '',
    snippet: ''
  }), []);

  return (
    <Paper className={classes.root}>
      {/* Generalities */}
      <Formik initialValues={getInitialValues()} onSubmit={(...args) => console.log(args)}>
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <TextField label="Note header" className="mt-0 mb-2" fullWidth margin="dense"
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
      <RichEditor className="mt-3"/>

      <div className={classes.andOrDivider + ' px-3'}>
        <div className="divider">
          <Typography variant="button">AND / OR</Typography>
        </div>
      </div>

      {/* Code editor */}
      <CodeEditor className="mt-2" />
    </Paper>
  );
}