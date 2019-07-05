import React, { useCallback, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { yup } from '../../../lib/validation/yup';
import { Subject } from 'rxjs';

// Components
import { IPage, INote, ISnippet, INotebook } from '../../../graphql/models';
import PageHeader from './pageHeader';
import NotesSection from './notesSection';
import { Omit } from '../../../../../shared/tsUtil';
import TagsSection from './tagsSection';
import { CreatePageInput, createPageMutation, CreatePageResp } from '../../../graphql/mutations/createPage';
import { Theme } from '@material-ui/core';

export type FormPage = IPage | { notebook: FormNotebook };
export type FormNotebook = Partial<INotebook> & Pick<INotebook, 'name'>;

export interface IPageFormStatus {
  isDirty?: boolean;
  isValid?: boolean;
  isSubmitting?: boolean;
  errors?: any;
}

const getStyles = (theme: Theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
      height: '100%'
    },
    mainPageForm: {
      overflow: 'auto',
      display: 'flex',
      height: '100%',
      flexDirection: 'column' as 'column',
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '4px 16px 3px',
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    notesSection: {
      display: 'flex',
      backgroundColor: theme.palette.grey[100],
      flexGrow: 1
    },
    tagsSection: {
      position: 'sticky' as 'sticky',
      bottom: 0,
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      padding: '0 16px',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)'
    }
  };
};

const noteValidationSchema = yup.object().shape<INote>({
  header: yup.string().required(),
  subheader: yup.string().nullable().notRequired(),
  snippet: yup.object().shape<ISnippet>({
    language: yup.string().required(),
    code: yup.string(),
    htmlCode: yup.string()
  }),
  hideContent: yup.bool().nullable(),
  hideSnippet: yup.bool().nullable(),
  htmlContent: yup.string(),
  plainTextContent: yup.string(),
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
      plainTextContent: '',
      htmlContent: '',
      hideContent: true,
      hideSnippet: true,
      snippet: { language: 'javascript', code: '', htmlCode: '' }
    };
  }
};

export interface IPageEditProps {
  submitSubject: Subject<void>;
  formStatus: React.MutableRefObject<IPageFormStatus>;
  onSubmitted: () => void;
}

function Page({ formStatus, submitSubject, onSubmitted }: IPageEditProps) {
  const classes = makeStyles(getStyles)({});
  const currentPage = {} as IPage;
  const createPage = useMutation<CreatePageResp, CreatePageInput>(createPageMutation);
  const apolloClient = useApolloClient();
  const beforeSubmitSubject = useRef(new Subject<void>());
  const formikRef = useRef<Formik<Omit<IPage, '_id'>>>(null);

  const getInitialValues = useCallback((): Omit<IPage, '_id'> => ({
    title: currentPage.title || '',
    notebook: currentPage.notebook,
    tags: currentPage.tags || [],
    notes: Array.isArray(currentPage.notes) ? currentPage.notes
      : [Object.assign(defaultNote.value, { hideContent: false, hideSnippet: false })]
  }), []);

  const submitPage = useCallback(async () => {
    try {
      // Trigger onBefore submit to set child values
      // (som operations are too heavy to set with the usual onChange pattern)
      await beforeSubmitSubject.current.next();
      const formValues = formikRef.current.getFormikBag().values;

      await createPage({
        variables: { input: { ...formValues, notebook: formValues.notebook.name } },
        update: async () => {
          await apolloClient.resetStore();
          onSubmitted();
        }
      });
    } catch {} // tslint:disable-line no-empty
  }, []);

  useEffect(() => {
    const submitSubscription = submitSubject.subscribe(async () => {
      if (!formStatus.current.isValid) {
        // Phantom submit invalid form, just to show validation errors
        formikRef.current.submitForm();
      } else if (!formStatus.current.isDirty) {
        onSubmitted();
      } else {
        await submitPage();
      }
    });

    return () => submitSubscription.unsubscribe();
  }, []);

  return (
    <Paper className={classes.root}>
      <Formik ref={formikRef} initialValues={getInitialValues()} validationSchema={pageValidationSchema} onSubmit={() => {}}>
        {(formikBag) => {
          const { dirty, isValid, isSubmitting, errors } = formikBag;
          formStatus.current = { isDirty: dirty, isSubmitting, isValid, errors };

          return (
            <form className={classes.mainPageForm}>
              <section className={classes.pageHeader}>
                <PageHeader parentFormBag={formikBag} />
              </section>

              <section className={classes.notesSection}>
                <NotesSection beforeSubmitSubject={beforeSubmitSubject.current} parentFormBag={formikBag} defaultNote={defaultNote} />
              </section>
              <section className={classes.tagsSection}>
                <TagsSection parentFormBag={formikBag} />
              </section>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}

Page.propTypes = {
  formStatus: PropTypes.shape({ current: PropTypes.object }).isRequired,
  submitSubject: PropTypes.object.isRequired,
  onSubmitted: PropTypes.func.isRequired
};

export default Page;