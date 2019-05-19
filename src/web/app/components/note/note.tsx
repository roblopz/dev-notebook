import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { FormikProps } from 'formik';
import Collapse from '@material-ui/core/Collapse';

import { IPage } from '../../redux/store/definitions';
import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/note/note';

// Components
import NoteHeader from './noteHeader';
import RichEditor from './richEditor';
import CodeEditor from './codeEditor';

export interface INoteProps {
  formikBag: FormikProps<Partial<IPage>>;
  parent: string;
  index: number;
  className?: string;
  onNoteDelete?: () => void;
}

function Note({
  formikBag,
  parent,
  index,
  className,
  onNoteDelete
}: INoteProps) {
  const classes = makeStyles(getStyles)();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { values, errors, touched, handleChange, setFieldValue } = formikBag;

  return (
    <Paper className={classnames(classes.root, { [className]: !!className })}>
      <NoteHeader onNoteDelete={onNoteDelete} isCollapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <TextField label="Note header" className="mt-2 mb-2" fullWidth margin="dense"
        {...mapMuiFormikdProps(`${parent}[${index}].header`, values, errors, touched)} onChange={handleChange} />

      <Collapse in={!isCollapsed}>
        <TextField className="mt-1" label="Subheader"
          inputProps={{ className: classes.titleTextFieldInput }}
          InputLabelProps={{ className: classes.titleTextFieldLabel }}
          placeholder="optional*" variant="outlined" fullWidth
          {...mapMuiFormikdProps(`${parent}[${index}].subheader`, values, errors, touched)} onChange={handleChange} />

        {/* Rich text editor */}
        <RichEditor className="mt-3" value={values.notes[index].content}
          hide={values.notes[index].hideContent}
          toggleHide={(hide) => setFieldValue(`${parent}[${index}].hideContent`, hide)}
          onChange={val => setFieldValue(`${parent}[${index}].content`, val)} />

        {/* Code editor */}
        <CodeEditor className="mt-2" snippet={values.notes[index].snippet}
          hide={values.notes[index].hideSnippet}
          toggleHide={(hide) => setFieldValue(`${parent}[${index}].hideSnippet`, hide)}
          onChange={snippet => setFieldValue(`${parent}[${index}].snippet`, snippet)} />
      </Collapse>
    </Paper>
  );
}

Note.propTypes = {
  className: PropTypes.string,
  parent: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  formikBag: PropTypes.object.isRequired,
  onNoteDelete: PropTypes.func.isRequired
};

export default Note;