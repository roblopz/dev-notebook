import * as tslib_1 from "tslib";
import React, { useRef, useState, useMemo } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded';
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlinedRounded';
import ListIcon from '@material-ui/icons/ListRounded';
import ListBulletIcon from '@material-ui/icons/FormatListBulletedRounded';
import FormatStrikeThroughIcon from '@material-ui/icons/FormatStrikethroughRounded';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFillRounded';
import FormatSizeIcon from '@material-ui/icons/FormatSizeRounded';
import FormatColorTextIcon from '@material-ui/icons/FormatColorTextRounded';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import { BlockPicker } from 'react-color';
import RenderPropsWrap from '../common/renderPropsWrap';
import { getRichEditorToolbarStyle as getStyle } from '../../styles/jss/noteEdit/richEditor';
import { nameof } from '../../lib/tsUtil';
var baseFontColors = [
    '#000000', '#D9E3F0', '#F47373', '#697689', '#37D67A',
    '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8'
];
var baseFontSizes = [12, 14, 16, 18, 20, 22, 28];
var customStyles = {
    'HIGHLIGHT': {
        backgroundColor: '#FFE47F',
        padding: '0 .15em',
        color: '#000000'
    },
    'STRIKETHROUGH': {
        textDecoration: 'line-through'
    },
    'BOLD': {
        fontWeight: 'bold'
    },
    'ITALIC': {
        fontStyle: 'italic'
    },
    'UNDERLINE': {
        textDecoration: 'underline'
    },
    fonts: [
        baseFontSizes.reduce(function (acc, curr) {
            acc['FONTSIZE_' + curr] = { fontSize: curr + "px" };
            return acc;
        }, {})
    ],
    colors: [
        baseFontColors.reduce(function (acc, curr) {
            acc[curr] = { color: curr };
            return acc;
        }, {})
    ]
};
function RichEditorToolbar(_a) {
    var _b = _a.EditorPlugins, StyleToPropsPlugin = _b.StyleToPropsPlugin, RichButtonsPlugin = _b.RichButtonsPlugin;
    var classes = makeStyles(getStyle)({});
    var colorPickerBtnRef = useRef(null);
    var _c = useState(false), colorPickerOpen = _c[0], setColorPickerOpen = _c[1];
    var fontSizeOptions = useMemo(function () { return (baseFontSizes.map(function (fontSize) { return (React.createElement("option", { key: fontSize, value: "FONTSIZE_" + fontSize }, fontSize + "px")); })); }, []);
    return (React.createElement("div", { className: classes.toolbar },
        React.createElement(StyleToPropsPlugin.StyleToProps, { styleMaps: customStyles }, function (_a) {
            var activeStyles = _a.activeStyles, toggleInlineStyle = _a.toggleInlineStyle, styleGroupHasClash = _a.styleGroupHasClash;
            var activeFontStyles = Object.keys(activeStyles).filter(function (style) { return !!customStyles.fonts[0][style]; });
            var activeColorStyles = Object.keys(activeStyles).filter(function (style) { return !!customStyles.colors[0][style]; });
            var multipleFontsInSelection = styleGroupHasClash(nameof('fonts', customStyles));
            var multipleColorsInSelection = styleGroupHasClash(nameof('colors', customStyles));
            var activeFont = multipleFontsInSelection ? '' : (activeFontStyles[0] || '');
            var activeColor = multipleColorsInSelection ? '#000000' : (activeColorStyles[0] || '#000000');
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: classnames(classes.toolbarBtn, 'cursor-default') },
                    React.createElement("span", { className: "mr-1" },
                        React.createElement(FormatSizeIcon, { fontSize: "small" })),
                    React.createElement("select", { className: "cursor-pointer", value: activeFont || '', onChange: function (evt) { return toggleInlineStyle(evt.target.value); } },
                        multipleFontsInSelection ? React.createElement("option", { value: "" }) : null,
                        !activeFont && !multipleFontsInSelection ? React.createElement("option", { value: "" }, "Default") : null,
                        fontSizeOptions)),
                React.createElement("span", { className: classes.toolbarSeparator }, "|"),
                React.createElement(Tooltip, { title: "Color" },
                    React.createElement("div", { className: classes.toolbarBtn, ref: colorPickerBtnRef, onClick: function () { return setColorPickerOpen(!colorPickerOpen); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatColorTextIcon, { fontSize: "small" }))),
                React.createElement(Popper, { className: classes.colorPickerPopper, open: colorPickerOpen, anchorEl: colorPickerBtnRef.current, transition: true, disablePortal: true }, function (_a) {
                    var TransitionProps = _a.TransitionProps;
                    return (React.createElement(Grow, tslib_1.__assign({ style: { transformOrigin: 'center top' } }, TransitionProps),
                        React.createElement(ClickAwayListener, { onClickAway: function () { return setColorPickerOpen(false); } },
                            React.createElement(BlockPicker, { colors: baseFontColors, color: activeColor, onChange: function (color) {
                                    toggleInlineStyle(color.hex.toUpperCase());
                                    setColorPickerOpen(false);
                                } }))));
                }),
                React.createElement(Tooltip, { title: "Highlight" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('HIGHLIGHT', customStyles)] }), onClick: function () { return toggleInlineStyle(nameof('HIGHLIGHT', customStyles)); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatColorFillIcon, { fontSize: "small" }))),
                React.createElement("span", { className: classes.toolbarSeparator }, "|"),
                React.createElement(Tooltip, { title: "Bold" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('BOLD', customStyles)] }), onClick: function () { return toggleInlineStyle(nameof('BOLD', customStyles)); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatBoldIcon, { fontSize: "small" }))),
                React.createElement(Tooltip, { title: "Italic" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('ITALIC', customStyles)] }), onClick: function () { return toggleInlineStyle(nameof('ITALIC', customStyles)); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatItalicIcon, { fontSize: "small" }))),
                React.createElement(Tooltip, { title: "Underline" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('UNDERLINE', customStyles)] }), onClick: function () { return toggleInlineStyle(nameof('UNDERLINE', customStyles)); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatUnderlinedIcon, { fontSize: "small" }))),
                React.createElement(Tooltip, { title: "Strike" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': activeStyles[nameof('STRIKETHROUGH', customStyles)] }), onClick: function () { return toggleInlineStyle(nameof('STRIKETHROUGH', customStyles)); }, onMouseDown: function (evt) { return evt.preventDefault(); } },
                        React.createElement(FormatStrikeThroughIcon, { fontSize: "small" }))),
                React.createElement("span", { className: classes.toolbarSeparator }, "|")));
        }),
        React.createElement(RichButtonsPlugin.OLButton, null,
            React.createElement(RenderPropsWrap, null, function (_a) {
                var toggleBlockType = _a.toggleBlockType, isActive = _a.isActive, onMouseDown = _a.onMouseDown;
                return (React.createElement(Tooltip, { title: "Ordered list" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': isActive }), onClick: toggleBlockType, onMouseDown: onMouseDown },
                        React.createElement(ListIcon, { fontSize: "small" }))));
            })),
        React.createElement(RichButtonsPlugin.ULButton, null,
            React.createElement(RenderPropsWrap, null, function (_a) {
                var toggleBlockType = _a.toggleBlockType, isActive = _a.isActive, onMouseDown = _a.onMouseDown;
                return (React.createElement(Tooltip, { title: "Unordered list" },
                    React.createElement("div", { className: classnames(classes.toolbarBtn, { 'active': isActive }), onClick: toggleBlockType, onMouseDown: onMouseDown },
                        React.createElement(ListBulletIcon, { fontSize: "small" }))));
            }))));
}
RichEditorToolbar.propTypes = {
    className: propTypes.string
};
export default RichEditorToolbar;
//# sourceMappingURL=richEditorToolbar.js.map