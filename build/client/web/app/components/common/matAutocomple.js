import * as tslib_1 from "tslib";
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { makeStyles, useTheme } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { getStyles } from '../../styles/jss/common/matAutocomplete';
var InputComponent = function (_a) {
    var inputRef = _a.inputRef, other = tslib_1.__rest(_a, ["inputRef"]);
    return (React.createElement("div", tslib_1.__assign({}, other)));
};
var ControlComponent = function (props) {
    var _a = props.selectProps, textFieldProps = _a.textFieldProps, InputProps = _a.InputProps, inputProps = _a.inputProps, onEnter = _a.onEnter;
    return (React.createElement(TextField, tslib_1.__assign({}, textFieldProps, { InputProps: tslib_1.__assign({}, InputProps, { inputComponent: InputComponent, inputProps: tslib_1.__assign({}, inputProps, { inputRef: props.innerRef, children: props.children }, props.innerProps), onKeyDown: function (evt) {
                if (evt.key === 'Enter' && onEnter)
                    onEnter(evt, props);
            } }), InputLabelProps: { shrink: props.hasValue ? true : undefined } })));
};
var MenuComponent = function (props) {
    var menuPaperProps = props.selectProps.menuPaperProps;
    return (React.createElement(Paper, tslib_1.__assign({}, menuPaperProps, props.innerProps), props.children));
};
function OptionComponent(props) {
    var menuItemProps = props.selectProps.menuItemProps;
    return (React.createElement(MenuItem, tslib_1.__assign({}, menuItemProps, { component: "div", buttonRef: props.innerRef, selected: props.isFocused }, props.innerProps), props.children));
}
function MatAutocomplete(_a) {
    var _b = _a.textFieldProps, textFieldProps = _b === void 0 ? { margin: 'dense', label: 'Name', fullWidth: true } : _b, _c = _a.menuPaperProps, menuPaperProps = _c === void 0 ? { square: true } : _c, _d = _a.menuItemProps, menuItemProps = _d === void 0 ? {} : _d, _e = _a.preventParentSubmit, preventParentSubmit = _e === void 0 ? true : _e, other = tslib_1.__rest(_a, ["textFieldProps", "menuPaperProps", "menuItemProps", "preventParentSubmit"]);
    var classes = makeStyles(getStyles)({});
    var theme = useTheme();
    menuItemProps.className = menuItemProps.className || classes.menuItem;
    menuPaperProps.className = classes.menuContainer + " " + (menuPaperProps.className || '');
    // Set defaults
    other.cacheOptions = other.cacheOptions !== undefined && other.cacheOptions !== null
        ? other.cacheOptions : true;
    var _f = useState(''), inputVal = _f[0], setInputVal = _f[1];
    var wrapperRef = useRef(null);
    useEffect(function () {
        if (preventParentSubmit) {
            wrapperRef.current.addEventListener('keydown', function (evt) {
                if (evt.key === 'Enter')
                    evt.preventDefault();
            });
        }
    }, [preventParentSubmit]);
    return (React.createElement("div", { ref: wrapperRef },
        React.createElement(AsyncSelect, tslib_1.__assign({}, other, { components: tslib_1.__assign({ Control: ControlComponent, Menu: MenuComponent, Option: OptionComponent, Placeholder: function () { return null; }, IndicatorsContainer: function () { return null; }, NoOptionsMessage: function () { return null; }, LoadingIndicator: function () { return null; }, LoadingMessage: function () { return null; } }, other.components), styles: tslib_1.__assign({}, other.styles, { valueContainer: function (provided) { return (tslib_1.__assign({}, provided, { padding: '2px 0' }, (other.styles && other.styles.valueContainer))); }, multiValueRemove: function (provided) { return (tslib_1.__assign({}, provided, (other.styles && other.styles.multiValueRemove), { ':hover': tslib_1.__assign({ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, cursor: 'pointer' }, (other.styles && other.styles.multiValueRemove && other.styles.multiValueRemove[':hover'])) })); } }), inputValue: inputVal, onInputChange: function (val, action) { return setInputVal(val); }, menuItemProps: menuItemProps, textFieldProps: tslib_1.__assign({}, textFieldProps, { value: inputVal }), menuPaperProps: menuPaperProps, setInputValue: setInputVal }))));
}
MatAutocomplete.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any
        })),
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any
        })
    ]),
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    })),
    preventParentSubmit: PropTypes.bool,
    onChange: PropTypes.func,
    textFieldProps: PropTypes.object,
    InputProps: PropTypes.object,
    inputProps: PropTypes.object,
    menuItemProps: PropTypes.object,
    menuPaperProps: PropTypes.object
};
export default MatAutocomplete;
//# sourceMappingURL=matAutocomple.js.map