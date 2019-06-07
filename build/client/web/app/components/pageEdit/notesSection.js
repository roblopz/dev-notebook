import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/AddRounded';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import NoteEdit from '../noteEdit/noteEdit';
import { getStyles } from '../../styles/jss/pageEdit/notesSection';
function NotesSection(_a) {
    var className = _a.className, parentFormBag = _a.parentFormBag, defaultNote = _a.defaultNote;
    var classes = makeStyles(getStyles)({});
    var emptyNotesError = parentFormBag.errors.notes && typeof parentFormBag.errors.notes === 'string' ? (React.createElement("div", { className: "text-center mt-3" },
        React.createElement(Typography, { variant: "subtitle2", color: "error" }, parentFormBag.errors.notes))) : null;
    return (React.createElement("section", { className: classes.notesSection + (className ? " " + className : '') },
        emptyNotesError,
        React.createElement(FieldArray, { name: "notes", render: function (arrayHelpers) { return (React.createElement(React.Fragment, null,
                parentFormBag.values.notes.map(function (note, idx) { return (React.createElement(NoteEdit, { key: idx, index: idx, onNoteDelete: function () {
                        arrayHelpers.remove(idx);
                    }, formikBag: parentFormBag, parent: "notes" })); }),
                React.createElement(Fab, { className: classes.addNoteIcon, color: "primary", size: "small", onClick: function () { return arrayHelpers.push(defaultNote.value); } },
                    React.createElement(AddIcon, null)))); } })));
}
NotesSection.propTypes = {
    className: PropTypes.string,
    parentFormBag: PropTypes.object.isRequired,
    defaultNote: PropTypes.object.isRequired
};
export default NotesSection;
//# sourceMappingURL=notesSection.js.map