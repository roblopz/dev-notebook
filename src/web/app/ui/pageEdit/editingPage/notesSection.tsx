import React from 'react';
import PropTypes from 'prop-types';
import { FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { INote } from '../../../graphql/models';
import AddIcon from '@material-ui/icons/AddRounded';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Subject } from 'rxjs';

import EditingNote from '../editingNote/editingNote';
import { CreateOrUpdatePagePage } from '../../../graphql/mutations/createOrUpdatePage';

const getStyles = (theme: any) => {
  return {
    root: {
      width: '100%',
      position: 'relative' as 'relative'
    },
    addNoteIcon: {
      position: 'fixed' as 'fixed',
      float: 'right' as 'right',
      bottom: theme.spacing(7),
      right: theme.spacing(2)
    }
  };
};

export interface INotesSectionProps {
  parentFormBag: FormikProps<CreateOrUpdatePagePage>;
  defaultNote: { readonly value: INote };
  beforeSubmitSubject: Subject<void>;
}

function NotesSection({ parentFormBag, defaultNote, beforeSubmitSubject }: INotesSectionProps) {
  const classes = makeStyles(getStyles)({});
  
  const emptyNotesError = parentFormBag.errors.notes && typeof parentFormBag.errors.notes === 'string' ? (
    <div className="text-center mt-3">
      <Typography variant="subtitle2" color="error">{parentFormBag.errors.notes}</Typography>
    </div>
  ) : null;

  return (
    <div className={classes.root}>
      {emptyNotesError}

      <FieldArray name="notes" render={(arrayHelpers: FieldArrayRenderProps) => (
        <React.Fragment>
          {parentFormBag.values.notes.map((note, idx) => (
            <EditingNote key={idx} index={idx} onNoteDelete={() => {
              arrayHelpers.remove(idx);
            }} formikBag={parentFormBag} parent="notes"
              beforeSubmitSubject={beforeSubmitSubject} />
          ))}

          <Tooltip title="Add note" placement="top">
            <Fab className={classes.addNoteIcon} color="primary" size="small"
              onClick={() => arrayHelpers.push(defaultNote.value)}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </React.Fragment>
      )} />
    </div>
  );
}

NotesSection.propTypes = {
  parentFormBag: PropTypes.object.isRequired,
  defaultNote: PropTypes.object.isRequired,
  beforeSubmitSubject: PropTypes.object.isRequired
};

export default NotesSection;