import React from 'react';
import PropTypes from 'prop-types';
import { FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { IPage, INote } from '../../../models';
import AddIcon from '@material-ui/icons/AddRounded';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Note from '../note';
import { WithOptional } from '../../../../../shared/tsUtil';

export interface INotesSectionProps {
  parentFormBag: FormikProps<WithOptional<IPage, '_id'>>;
  defaultNote: { readonly value: INote };
}

const getStyles = (theme: any) => {
  return {
    root: {
      width: '100%',
      position: 'relative' as 'relative'
    },
    addNoteIcon: {
      position: 'absolute' as 'absolute',
      float: 'right' as 'right',
      bottom: theme.spacing(1),
      right: theme.spacing(2)
    }
  };
};

function NotesSection({ parentFormBag, defaultNote }: INotesSectionProps) {
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
            <Note key={idx} index={idx} onNoteDelete={() => {
              arrayHelpers.remove(idx);
            }} formikBag={parentFormBag} parent="notes" />
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
  defaultNote: PropTypes.object.isRequired
};

export default NotesSection;