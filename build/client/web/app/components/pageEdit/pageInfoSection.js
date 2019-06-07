import * as tslib_1 from "tslib";
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import deburr from 'lodash/deburr';
import NewIcon from '@material-ui/icons/FiberNewRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import PageFooter from './pageFooter';
import { mapMuiFormikdProps } from '../../lib/muiFormik';
import GeneralPageInfo from './generalPageInfo';
import MatAutocomplete from '../common/matAutocomple';
import { getStyles } from '../../styles/jss/pageEdit/pageInfoSection';
function tagCamelCase(str, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    str = deburr(str || '').trim();
    if (!str)
        return str;
    var rgx = /[^a-z0-9\.\+\-\/#]/ig;
    var splitted = str.split(rgx).filter(function (s) { return !!s; });
    var res = splitted.reduce(function (acc, curr, idx) {
        if (idx > 0)
            acc += curr.charAt(0).toUpperCase() + curr.substr(1).toLowerCase();
        else
            acc += curr.charAt(0).toLowerCase() + curr.substr(1).toLowerCase();
        return acc;
    }, '');
    if (maxLength && res.length > maxLength) {
        res = res.substr(0, maxLength);
    }
    return res;
}
function tagsSelectOnEnter(evt, props) {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    var camelCased = tagCamelCase(evt.target.value, 15);
    if (camelCased) {
        var allTags = props.getValue();
        if (allTags.some(function (t) { return t.value.toLowerCase() === camelCased.toLowerCase(); })) {
            props.selectProps.setInputValue('');
        }
        else {
            var allTags_1 = props.getValue();
            var newTag = { label: camelCased, value: camelCased };
            props.setValue(allTags_1.concat([newTag]), 'set-value');
        }
    }
}
function PageInfoSection(_a) {
    var _this = this;
    var parentFormBag = _a.parentFormBag, className = _a.className;
    var values = parentFormBag.values, errors = parentFormBag.errors, touched = parentFormBag.touched, handleSubmit = parentFormBag.handleSubmit, setFieldValue = parentFormBag.setFieldValue;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), isNewNotebook = _b[0], setIsNewNotebook = _b[1];
    var notebookSelectOnEnter = useCallback(function (evt, props) {
        // Prevent form submission
        evt.nativeEvent.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
        var notebookName;
        if (!(notebookName = evt.target.value.trim()))
            return;
        var options = props.options, selectOption = props.selectOption, setValue = props.setValue;
        var targetOption = options
            .find(function (opt) { return (opt.value.name || '').trim().toUpperCase() === notebookName.toUpperCase(); });
        if (targetOption) {
            selectOption(targetOption);
            setIsNewNotebook(false);
        }
        else {
            setValue({ label: notebookName, value: { name: notebookName } });
            setIsNewNotebook(true);
        }
    }, []);
    var loadTags = useCallback(function (inputValue) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, []];
        });
    }); }, []);
    var loadNotebooks = useCallback(function (inputValue) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, [{ label: 'ok', value: { name: 'sds', _id: undefined } }, { label: 'no', value: { name: 'noso', _id: undefined } }]];
        });
    }); }, []);
    return (React.createElement("section", { className: classes.root + (className ? " " + className : '') },
        React.createElement("div", { className: classes.wrapper },
            React.createElement(MatAutocomplete, { menuItemClass: classes.notebookAddMenuItem, value: values.notebook ? { label: values.notebook.name, value: values.notebook } : null, isClearable: true, textFieldProps: tslib_1.__assign({ label: 'Notebook', margin: 'dense', fullWidth: true }, mapMuiFormikdProps('notebook.name', values, errors, touched.notebook ? { notebook: { name: true } } : touched)), InputProps: {
                    startAdornment: isNewNotebook ?
                        React.createElement(InputAdornment, { position: "start", className: "mr-0" },
                            React.createElement(NewIcon, { className: classes.newNotebookIcon })) : null,
                }, onEnter: notebookSelectOnEnter, loadOptions: loadNotebooks, onChange: function (notebookOption) {
                    if (!notebookOption)
                        setIsNewNotebook(false);
                    setFieldValue('notebook', notebookOption && notebookOption.value);
                } }),
            React.createElement(MatAutocomplete, { value: (values.tags || []).map(function (tag) { return ({ value: tag, label: tag }); }), isMulti: true, textFieldProps: tslib_1.__assign({ label: 'Tags', margin: 'dense', fullWidth: true }, mapMuiFormikdProps('tags', values, errors, touched)), onEnter: tagsSelectOnEnter, loadOptions: loadTags, onChange: function (tagOptions) {
                    setFieldValue('tags', tagOptions.map(function (opt) { return opt.value; }));
                } }),
            React.createElement(GeneralPageInfo, { page: values, className: "mt-3" }),
            React.createElement(PageFooter, { onPageDelete: function () { }, onPageSubmit: function () {
                    console.log(values);
                    handleSubmit();
                } }))));
}
PageInfoSection.propTypes = {
    className: PropTypes.string,
    parentFormBag: PropTypes.object.isRequired
};
export default PageInfoSection;
//# sourceMappingURL=pageInfoSection.js.map