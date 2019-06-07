import * as tslib_1 from "tslib";
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { mapMuiFormikdProps } from '../../lib/muiFormik';
import { getStyles } from '../../styles/jss/pageEdit/pageEdit';
import { yup } from '../../lib/validation/yup';
import PageInfoSection from './pageInfoSection';
import NotesSection from './notesSection';
var noteValidationSchema = yup.object().shape({
    _id: yup.string().nullable().notRequired(),
    header: yup.string().required(),
    subheader: yup.string().nullable().notRequired(),
    snippet: yup.object().shape({
        language: yup.string().required(),
        code: yup.string()
    }),
    hideContent: yup.bool().nullable(),
    hideSnippet: yup.bool().nullable(),
    content: yup.string(),
    createdAt: yup.date().nullable().notRequired(),
    updatedAt: yup.date().nullable().notRequired()
});
var pageValidationSchema = yup.object().shape({
    _id: yup.string().nullable().notRequired(),
    title: yup.string().required(),
    tags: yup.array().of(yup.string().required()).nullable(),
    notebook: yup.object().shape({
        name: yup.string().required()
    }).required(),
    notes: yup.array().of(noteValidationSchema).min(1, 'At least one note is required'),
    createdAt: yup.date().nullable().notRequired(),
    updatedAt: yup.date().nullable().notRequired()
});
var defaultNote = {
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
function PageEdit(_a) {
    var onClose = _a.onClose;
    var classes = makeStyles(getStyles)({});
    var currentPage = {};
    var getInitialValues = useCallback(function () { return ({
        title: currentPage.title || '',
        notebook: currentPage.notebook,
        tags: currentPage.tags || [],
        notes: Array.isArray(currentPage.notes) ? currentPage.notes
            : [Object.assign(defaultNote.value, { hideContent: false, hideSnippet: false })]
    }); }, []);
    return (React.createElement(Paper, { className: classes.root },
        React.createElement(Formik, { initialValues: getInitialValues(), validationSchema: pageValidationSchema, onSubmit: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return console.log(args);
            } }, function (formikBag) {
            var values = formikBag.values, errors = formikBag.errors, touched = formikBag.touched, handleChange = formikBag.handleChange, handleSubmit = formikBag.handleSubmit;
            return (React.createElement("form", { onSubmit: handleSubmit, className: classes.mainPageForm },
                React.createElement("div", { className: classes.pageTitle },
                    React.createElement(TextField, tslib_1.__assign({ label: "Page title", className: "mb-2", fullWidth: true, margin: "dense" }, mapMuiFormikdProps('title', values, errors, touched), { onChange: handleChange })),
                    React.createElement(Fab, { color: "default", className: classes.closePageBtn, onClick: onClose },
                        React.createElement(CloseIcon, { className: classes.closePageBtnIcon }))),
                React.createElement("div", { className: "d-flex" },
                    React.createElement(PageInfoSection, { parentFormBag: formikBag }),
                    React.createElement(NotesSection, { parentFormBag: formikBag, defaultNote: defaultNote }))));
        })));
}
PageEdit.propTypes = {
    onClose: PropTypes.func.isRequired
};
export default PageEdit;
//# sourceMappingURL=pageEdit.js.map