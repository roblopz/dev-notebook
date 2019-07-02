import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik, FormikProps } from 'formik';
import Paper from '@material-ui/core/Paper';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { yup } from '../../../lib/validation/yup';
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';

// Components
import { IPage, INote, ISnippet, INotebook } from '../../../graphql/models';
import PageHeader from './pageHeader';
import NotesSection from './notesSection';
import { Omit } from '../../../../../shared/tsUtil';
import TagsSection from './tagsSection';
import { CreatePageInput, createPageMutation, CreatePageResp } from '../../../graphql/mutations/createPage';

export type FormPage = IPage | { notebook: FormNotebook };
export type FormNotebook = Partial<INotebook> & Pick<INotebook, 'name'>;

export interface IPageFormStatus {
  isDirty?: boolean;
  isValid?: boolean;
  isSubmitting?: boolean;
  errors?: any;
}

const getStyles = (theme: any) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
      height: '100%'
    },
    mainPageForm: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column' as 'column',
      overflow: 'hidden'
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
      display: 'flex',
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
  formStatus: React.MutableRefObject<IPageFormStatus>;
  triggerSubmit: React.MutableRefObject<() => Promise<any>>;
}

function PageEdit({ onClose, formStatus, triggerSubmit }: IPageEditProps) {
  const classes = makeStyles(getStyles)({});
  const currentPage = {} as IPage;
  const createPage = useMutation<CreatePageResp, CreatePageInput>(createPageMutation);
  const _submitForm = useRef(null);
  const submitEmitter = useRef<StrictEventEmitter<EventEmitter, { submitDone: () => void }>>(new EventEmitter());
  const apolloClient = useApolloClient();

  const getInitialValues = useCallback((): Omit<IPage, '_id'> => ({
    title: currentPage.title || '',
    notebook: currentPage.notebook,
    tags: currentPage.tags || [],
    notes: Array.isArray(currentPage.notes) ? currentPage.notes
      : [Object.assign(defaultNote.value, { hideContent: false, hideSnippet: false })]
  }), []);

  const onPageSubmit = useCallback(async (values: IPage, bag: FormikProps<IPage>) => {
    try {
      await createPage({
        variables: { input: { ...values, notebook: values.notebook.name } },
        update: async () => {
          await apolloClient.resetStore();
          submitEmitter.current.emit('submitDone');
        }
      });
    } catch { } // tslint:disable-line no-empty
  }, []);

  useEffect(() => {
    triggerSubmit.current = async () => {
      if (!formStatus.current.isValid) {
        await _submitForm.current();
        return Promise.reject(formStatus.current.errors);
      } else if (!formStatus.current.isDirty) {
        return Promise.resolve();
      } else {
        await _submitForm.current();
        await new Promise((resolve) => {
          submitEmitter.current.removeAllListeners();
          submitEmitter.current.on('submitDone', resolve);
        });
      }
    };

    return () => submitEmitter.current.removeAllListeners();
  }, []);

  return (
    <Paper className={classes.root}>
      <Formik initialValues={getInitialValues()} validationSchema={pageValidationSchema} onSubmit={onPageSubmit}>
        {(formikBag) => {
          const { dirty, isValid, isSubmitting, submitForm, errors } = formikBag;
          formStatus.current = { isDirty: dirty, isSubmitting, isValid, errors };
          _submitForm.current = submitForm;

          return (
            <form className={classes.mainPageForm}>
              <section className={classes.pageHeader}>
                <PageHeader parentFormBag={formikBag} />
              </section>

              <section className={classes.notesSection}>
                <NotesSection parentFormBag={formikBag} defaultNote={defaultNote} />
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

PageEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  formStatus: PropTypes.shape({ current: PropTypes.object }).isRequired,
  triggerSubmit: PropTypes.shape({ current: PropTypes.func }).isRequired
};

export default PageEdit;