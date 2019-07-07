import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { yup } from '../../../lib/validation/yup';
import { Subject } from 'rxjs';

// Components
import { INote, ISnippet } from '../../../graphql/models';
import PageHeader from './pageHeader';
import NotesSection from './notesSection';
import TagsSection from './tagsSection';
import { CreateOrUpdatePageInput,
        createOrUpdatePageMutation,
        CreateOrUpdatePageResp,
        CreateOrUpdatePagePage
} from '../../../graphql/mutations/createOrUpdatePage';
import { Theme } from '@material-ui/core';
import { PageType } from '../../../graphql/queries/pages';
import { omitDeep } from '../../../graphql/links/cleanTypename';

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
  _id: yup.string().notRequired(),
  header: yup.string().required(),
  subheader: yup.string().nullable().notRequired(),
  snippet: yup.object().shape<ISnippet>({
    language: yup.string().required(),
    code: yup.string(),
    htmlCode: yup.string()
  }),
  htmlContent: yup.string(),
  plainTextContent: yup.string(),
  content: yup.string()
});

const pageValidationSchema = yup.object().shape<CreateOrUpdatePagePage>({
  _id: yup.string().notRequired(),
  title: yup.string().required(),
  tags: yup.array().of(yup.string().required()).nullable(),
  notebook: yup.string().required(),
  notes: yup.array().of(noteValidationSchema).min(1, 'At least one note is required'),
});

const defaultNote = {
  get value() {
    return {
      header: '',
      subheader: '',
      content: '',
      plainTextContent: '',
      htmlContent: '',
      snippet: { language: 'JavaScript', code: '', htmlCode: '' }
    };
  }
};

export interface IEditingPageProps {
  onSubmit: Subject<void>;
  onGoBack: Subject<void>;
  onSubmitted: () => void;
  page?: PageType;
}

function EditingPage({ onGoBack , onSubmit, onSubmitted, page: editingPage }: IEditingPageProps) {
  const classes = makeStyles(getStyles)({});
  const createOrUpdatePage = useMutation<CreateOrUpdatePageResp, CreateOrUpdatePageInput>(createOrUpdatePageMutation);
  const apolloClient = useApolloClient();
  const beforeSubmitSubject = useRef(new Subject<void>());
  const formikRef = useRef<Formik<CreateOrUpdatePagePage>>(null);

  const getInitialValues = useCallback((): CreateOrUpdatePagePage => {
    let page = editingPage;
    if (page)
      page = omitDeep(page, '__typename') as PageType;
    else
      page = page || {} as PageType;

    return {
      _id: page._id,
      title: page.title || '',
      notebook: page.notebook && page.notebook.name,
      tags: page.tags || [],
      notes: page.notes && page.notes || [Object.assign(defaultNote.value)]
    };
  }, [editingPage]);

  useEffect(() => {
    if (editingPage)
      formikRef.current.resetForm(getInitialValues());
  }, [editingPage]);

  const submitPage = useCallback(async () => {
    try {
      const { _id: pageId, ...page } = formikRef.current.getFormikBag().values;

      await createOrUpdatePage({
        variables: { id: pageId, input: page },
        update: async () => {
          await apolloClient.resetStore();
          onSubmitted();
        }
      });
    } catch {} // tslint:disable-line no-empty
  }, []);

  useEffect(() => {
    const onSubmitSubscription = onSubmit.subscribe(async () => {
      // Complete form (some value setters are too heavy to set with the usual onChange pattern)
      await beforeSubmitSubject.current.next();
      const { dirty, isValid } = formikRef.current.getFormikBag();

      if (!dirty) {
        // Go back
        onSubmitted();
      } else if (!isValid) {
        // Phantom submit invalid form, just to show validation errors
        formikRef.current.submitForm();
      } else {
        await submitPage();
      }
    });

    const onGoBackSubscription = onGoBack.subscribe(async () => {
      // Complete form (some value setters are too heavy to set with the usual onChange pattern)
      await beforeSubmitSubject.current.next();
      const { dirty } = formikRef.current.getFormikBag();

      let goBack = true;
      if (dirty) goBack = confirm('Cancel unsaved changes?');
      if (goBack) onSubmitted();
    });

    return () => {
      onSubmitSubscription.unsubscribe();
      onGoBackSubscription.unsubscribe();
    };
  }, []);

  return (
    <Paper className={classes.root}>
      {/* tslint:disable-next-line no-empty */}
      <Formik ref={formikRef} initialValues={getInitialValues()} validationSchema={pageValidationSchema} onSubmit={() => {}}>
        {(formikBag) => {
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

EditingPage.propTypes = {
  onGoBack: PropTypes.object.isRequired,
  onSubmit: PropTypes.object.isRequired,
  onSubmitted: PropTypes.func.isRequired,
  page: PropTypes.object
};

export default EditingPage;