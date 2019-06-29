import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik, FormikProps } from 'formik';
import Paper from '@material-ui/core/Paper';
import { useMutation } from 'react-apollo-hooks';

import { yup } from '../../../lib/validation/yup';

// Components
import { IPage, INote, ISnippet, INotebook } from '../../../models';
import PageHeader from './pageHeader';
import NotesSection from './notesSection';
import { Omit } from '../../../../../shared/tsUtil';
import { GetPagesResult, queries } from '../../../graphql/queries/pageQueries';
import { CreatePageInput, mutations, CreatePageResult } from '../../../graphql/mutations/pageMutations';
import TagsSection from './tagsSection';

export type FormPage = IPage | { notebook: FormNotebook };
export type FormNotebook = Partial<INotebook> & Pick<INotebook, 'name'>;

const getStyles = (theme: any) => {
  const pageInfoLeftPadding = theme.spacing(2);

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
      padding: '4px 16px',
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
  const createPage = useMutation<CreatePageResult, CreatePageInput>(mutations.CREATE_PAGE);

  const getInitialValues = useCallback((): Omit<IPage, '_id'> => ({
    title: currentPage.title || '',
    notebook: currentPage.notebook,
    tags: currentPage.tags || [],
    notes: Array.isArray(currentPage.notes) ? currentPage.notes
      : [Object.assign(defaultNote.value, { hideContent: false, hideSnippet: false })]
  }), []);

  const onPageSubmit = useCallback(async (values: IPage, bag: FormikProps<IPage>) => {
    await createPage({
      variables: { input: { ...values, notebook: values.notebook.name } },
      update: (cache, { data: { newPage } }) => {
        const { pages } = cache.readQuery<GetPagesResult>({ query: queries.GET_PAGES });
        cache.writeQuery<GetPagesResult>({ query: queries.GET_PAGES, data: { pages: [...pages, newPage] } });
      }
    });

    onClose();
  }, []);

  return (
    <Paper className={classes.root}>
      <Formik initialValues={getInitialValues()} validationSchema={pageValidationSchema} onSubmit={onPageSubmit}>
        {(formikBag) => {
          const { handleSubmit, setFieldValue, values, errors, touched } = formikBag;

          return (
            <form onSubmit={handleSubmit} className={classes.mainPageForm}>
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
  onClose: PropTypes.func.isRequired
};

export default PageEdit;