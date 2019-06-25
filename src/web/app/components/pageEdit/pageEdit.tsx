import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/CloseRounded';

import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/pageEdit/pageEdit';
import { yup } from '../../lib/validation/yup';

// Components
import { IPage, INote, ISnippet, INotebook } from '../../models';
import PageInfoSection from './pageInfoSection';
import NotesSection from './notesSection';
import { Omit } from '../../../../shared/tsUtil';

export type FormPage = IPage | { notebook: FormNotebook };
export type FormNotebook = Partial<INotebook> & Pick<INotebook, 'name'>;

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

const pageValidationSchema = yup.object().shape<FormPage>({
  _id: yup.string().nullable().notRequired(),
  title: yup.string().required(),
  tags: yup.array().of(yup.string().required()).nullable(),
  notebook: yup.object().shape<FormNotebook>({
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

export interface IPageEditProps {
  onClose: () => void;
}

function PageEdit({ onClose }: IPageEditProps) {
  const classes = makeStyles(getStyles)({});
  const currentPage = {} as IPage;

  const getInitialValues = useCallback((): Omit<IPage, '_id'> => ({
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
                <Fab color="default" className={classes.closePageBtn} onClick={onClose}>
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

PageEdit.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default PageEdit;