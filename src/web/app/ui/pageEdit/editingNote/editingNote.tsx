import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { FormikProps } from 'formik';
import Collapse from '@material-ui/core/Collapse';
import { Subject } from 'rxjs';

import { mapMuiFormikdProps } from '../../../lib/muiFormik';

// Components
import HeaderIcons from './headerIcons';
import RichEditor from './richEditor';
import CodeEditor from './codeEditor';
import { CreateOrUpdatePagePage } from '../../../graphql/mutations/createOrUpdatePage';

const getStyles = (theme: any) => ({
  root: {
    margin: theme.spacing(2),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    position: 'relative' as 'relative',
    border: '1px solid #eee',
    borderLeft: `5px solid ${theme.palette.primary.main}`
  },
  titleTextFieldInput: {
    padding: '7px 14px',
    '&:focus, &:not(:placeholder-shown)': {
      backgroundColor: 'initial'
    },
    '&::placeholder': {
      fontSize: '.8rem'
    }
  },
  titleTextFieldLabel: {
    transform: 'translate(14px, 9px) scale(1)'
  },
  headerIconOverride: {
    marginTop: '4px !important'
  },
  andOrDivider: {
    marginTop: 25
  },
  noteIconsContainer: {
    position: 'absolute' as 'absolute',
    right: theme.spacing(1),
    zIndex: theme.zIndex.mobileStepper
  },
  noteIcon: {
    padding: 5
  }
});

export interface IEditingNoteProps {
  formikBag: FormikProps<CreateOrUpdatePagePage>;
  parent: string;
  index: number;
  className?: string;
  onNoteDelete?: () => void;
  beforeSubmitSubject: Subject<void>;
}

function EditingNote({
  formikBag,
  parent,
  index,
  className,
  onNoteDelete,
  beforeSubmitSubject
}: IEditingNoteProps) {
  const classes = makeStyles(getStyles)({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { values, errors, touched, handleChange, setFieldValue } = formikBag;

  return (
    <Paper className={classnames(classes.root, { [className]: !!className })}>
      <div className="d-flex">
        <TextField placeholder="Note header" className="flex-grow-1 mt-1 mb-2 mr-3" fullWidth margin="dense"
          {...mapMuiFormikdProps(`${parent}[${index}].header`, values, errors, touched)} onChange={handleChange} />
        <HeaderIcons onNoteDelete={onNoteDelete} isCollapsed={isCollapsed} setCollapsed={setIsCollapsed} />
      </div>

      <Collapse in={!isCollapsed}>
        <TextField className="mt-1" label="Subheader"
          inputProps={{ className: classes.titleTextFieldInput }}
          InputLabelProps={{ className: classes.titleTextFieldLabel }}
          placeholder="optional*" variant="outlined" fullWidth
          {...mapMuiFormikdProps(`${parent}[${index}].subheader`, values, errors, touched)} onChange={handleChange} />

        {/* Rich text editor */}
        <RichEditor className="mt-3" value={values.notes[index].content}
          persistSubject={beforeSubmitSubject}
          persistValues={({ editorContent, plainTextContent, htmlContent }) => {
            setFieldValue(`${parent}[${index}].content`, editorContent);
            setFieldValue(`${parent}[${index}].plainTextContent`, plainTextContent);
            setFieldValue(`${parent}[${index}].htmlContent`, htmlContent);
          }} />

        {/* Code editor */}
        <CodeEditor className="mt-3" snippet={values.notes[index].snippet}
          persistSubject={beforeSubmitSubject}
          persistValues={({ snippet }) => {
            setFieldValue(`${parent}[${index}].snippet`, snippet);
          }} />
      </Collapse>
    </Paper>
  );
}

EditingNote.propTypes = {
  className: PropTypes.string,
  parent: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  formikBag: PropTypes.object.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
  beforeSubmitSubject: PropTypes.object.isRequired
};

export default EditingNote;