import React from 'react';
import PropTypes from 'prop-types';
import { FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { IPage, INote } from '../../models';
import AddIcon from '@material-ui/icons/AddRounded';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import NoteEdit from '../noteEdit/noteEdit';
import { getStyles } from '../../styles/jss/pageEdit/notesSection';
import { WithOptional } from '../../../../shared/tsUtil';

export interface INotesSectionProps {
  parentFormBag: FormikProps<WithOptional<IPage, '_id'>>;
  className?: string;
  defaultNote: { readonly value: INote };
}

function NotesSection({
  className,
  parentFormBag,
  defaultNote
}: INotesSectionProps) {
  const classes = makeStyles(getStyles)({});
  
  const emptyNotesError = parentFormBag.errors.notes && typeof parentFormBag.errors.notes === 'string' ? (
    <div className="text-center mt-3">
      <Typography variant="subtitle2" color="error">{parentFormBag.errors.notes}</Typography>
    </div>
  ) : null;

  return (
    <section className={classes.notesSection + (className ? ` ${className}` : '')}>
      {emptyNotesError}

      <FieldArray name="notes" render={(arrayHelpers: FieldArrayRenderProps) => (
        <React.Fragment>
          {parentFormBag.values.notes.map((note, idx) => (
            <NoteEdit key={idx} index={idx} onNoteDelete={() => {
              arrayHelpers.remove(idx);
            }} formikBag={parentFormBag} parent="notes" />
          ))}

          <Fab className={classes.addNoteIcon} color="primary" size="small"
            onClick={() => arrayHelpers.push(defaultNote.value)}>
            <AddIcon />
          </Fab>
        </React.Fragment>
      )} />
    </section>
  );
}

NotesSection.propTypes = {
  className: PropTypes.string,
  parentFormBag: PropTypes.object.isRequired,
  defaultNote: PropTypes.object.isRequired
};

export default NotesSection;