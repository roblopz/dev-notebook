import * as tslib_1 from "tslib";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/noteEdit/note';
// Components
import NoteHeader from './noteHeader';
import RichEditor from './richEditor';
import CodeEditor from './codeEditor';
function Note(_a) {
    var _b;
    var formikBag = _a.formikBag, parent = _a.parent, index = _a.index, className = _a.className, onNoteDelete = _a.onNoteDelete;
    var classes = makeStyles(getStyles)({});
    var _c = useState(false), isCollapsed = _c[0], setIsCollapsed = _c[1];
    var values = formikBag.values, errors = formikBag.errors, touched = formikBag.touched, handleChange = formikBag.handleChange, setFieldValue = formikBag.setFieldValue;
    return (React.createElement(Paper, { className: classnames(classes.root, (_b = {}, _b[className] = !!className, _b)) },
        React.createElement(NoteHeader, { onNoteDelete: onNoteDelete, isCollapsed: isCollapsed, setCollapsed: setIsCollapsed }),
        React.createElement(TextField, tslib_1.__assign({ label: "Note header", className: "mt-2 mb-2", fullWidth: true, margin: "dense" }, mapMuiFormikdProps(parent + "[" + index + "].header", values, errors, touched), { onChange: handleChange })),
        React.createElement(Collapse, { in: !isCollapsed },
            React.createElement(TextField, tslib_1.__assign({ className: "mt-1", label: "Subheader", inputProps: { className: classes.titleTextFieldInput }, InputLabelProps: { className: classes.titleTextFieldLabel }, placeholder: "optional*", variant: "outlined", fullWidth: true }, mapMuiFormikdProps(parent + "[" + index + "].subheader", values, errors, touched), { onChange: handleChange })),
            React.createElement(RichEditor, { className: "mt-3", value: values.notes[index].content, hide: values.notes[index].hideContent, toggleHide: function (hide) { return setFieldValue(parent + "[" + index + "].hideContent", hide); }, onChange: function (val) { return setFieldValue(parent + "[" + index + "].content", val); } }),
            React.createElement(CodeEditor, { className: "mt-2", snippet: values.notes[index].snippet, hide: values.notes[index].hideSnippet, toggleHide: function (hide) { return setFieldValue(parent + "[" + index + "].hideSnippet", hide); }, onChange: function (snippet) { return setFieldValue(parent + "[" + index + "].snippet", snippet); } }))));
}
Note.propTypes = {
    className: PropTypes.string,
    parent: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    formikBag: PropTypes.object.isRequired,
    onNoteDelete: PropTypes.func.isRequired
};
export default Note;
//# sourceMappingURL=noteEdit.js.map