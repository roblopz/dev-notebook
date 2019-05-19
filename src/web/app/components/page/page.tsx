import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/CloseRounded';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/page/page';
import { yup } from '../../lib/validation/yup';

// Components
import { IPage, INote, ISnippet, INotebook } from '../../redux/store/definitions';
import PageInfoSection from './pageInfoSection';
import NotesSection from './notesSection';

const noteValidationSchema = yup.object().shape<INote>({
  _id: yup.string().nullable().notRequired(),
  header: yup.string().required(),
  subheader: yup.string().nullable().notRequired(),
  snippet: yup.object().shape<ISnippet>({
    language: yup.string().required(),
    code: yup.string()
  }),
  hideContent: yup.bool().nullable(),
  hideSnippet: yup.bool().nullable(),
  content: yup.string(),
  createdAt: yup.date().nullable().notRequired(),
  updatedAt: yup.date().nullable().notRequired()
});

const pageValidationSchema = yup.object().shape<IPage>({
  _id: yup.string().nullable().notRequired(),
  title: yup.string().required(),
  tags: yup.array().of(yup.string().required()).nullable(),
  notebook: yup.object().shape<INotebook>({
    name: yup.string().required()
  }).required(),
  notes: yup.array().of(noteValidationSchema).min(1, 'At least one note is required'),
  createdAt: yup.date().nullable().notRequired(),
  updatedAt: yup.date().nullable().notRequired()
});

const defaultNote = {
  get value() {
    return {
      header: '',
      subheader: '',
      content: '',
      hideContent: true,
      hideSnippet: true,
      snippet: { language: 'javascript', code: '' }
    };
  }
};

export default function Page() {
  const classes = makeStyles(getStyles)();
  const currentPage = {} as IPage;

  const getInitialValues = useCallback((): Partial<IPage> => ({
    title: currentPage.title || '',
    notebook: currentPage.notebook,
    tags: currentPage.tags || [],
    notes: Array.isArray(currentPage.notes) ? currentPage.notes
      : [Object.assign(defaultNote.value, { hideContent: false, hideSnippet: false })]
  }), []);

  return (
    <Paper className={classes.root}>
      <Formik initialValues={getInitialValues()} validationSchema={pageValidationSchema} onSubmit={(...args) => console.log(args)}>
        {(formikBag) => {
          const { values, errors, touched, handleChange, handleSubmit } = formikBag;

          return (
            <form onSubmit={handleSubmit} className={classes.mainPageForm}>
              <div className={classes.pageTitle}>
                <TextField label="Page title" className="mb-2" fullWidth margin="dense"
                  {...mapMuiFormikdProps('title', values, errors, touched)} onChange={handleChange} />
                <Fab color="default" className={classes.closePageBtn}>
                  <CloseIcon className={classes.closePageBtnIcon} />
                </Fab>
              </div>

              <div className="d-flex">
                <PageInfoSection parentFormBag={formikBag} />
                <NotesSection parentFormBag={formikBag} defaultNote={defaultNote} />
              </div>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}