import * as tslib_1 from "tslib";
import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/SaveRounded';
import Paper from '@material-ui/core/Paper';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import { getStyles } from '../../styles/jss/pageEdit/pageFooter';
function Footer(_a) {
    var onPageSubmit = _a.onPageSubmit, onPageDelete = _a.onPageDelete;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), settingsOpen = _b[0], setSettingsOpen = _b[1];
    var _c = useState(false), deleteMode = _c[0], setDeleteMode = _c[1];
    var iconButtonRef = useRef(null);
    var toggleSettings = useCallback(function () {
        setSettingsOpen(!settingsOpen);
        setDeleteMode(false);
    }, [settingsOpen]);
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.pageOptionBtns },
            React.createElement(Button, { className: classes.saveBtn, type: "button", onClick: onPageSubmit, size: "small", variant: "contained", color: "primary" },
                React.createElement(SaveIcon, { fontSize: "small" }),
                "\u00A0Save"),
            React.createElement(IconButton, { className: classes.optionsBtn, color: "default", buttonRef: iconButtonRef, onClick: toggleSettings },
                React.createElement(MoveVertIcon, { fontSize: "small" })),
            React.createElement(Popper, { className: classes.settingsMenuRoot, open: settingsOpen, anchorEl: iconButtonRef.current, transition: true }, function (_a) {
                var TransitionProps = _a.TransitionProps;
                return (React.createElement(Grow, tslib_1.__assign({}, TransitionProps),
                    React.createElement(Paper, null,
                        React.createElement(ClickAwayListener, { onClickAway: function (evt) {
                                if (!iconButtonRef.current.contains(evt.target))
                                    toggleSettings();
                            } },
                            React.createElement(MenuList, { className: classes.settingsMenu },
                                React.createElement(MenuItem, { className: "d-flex flex-column align-items-start h-auto", onClick: function () { return setDeleteMode(true); } },
                                    deleteMode ? 'Delete page?' : 'Delete page',
                                    deleteMode ?
                                        React.createElement("div", { className: "d-flex mt-2" },
                                            React.createElement(Button, { className: "p-0 mr-2", size: "small", variant: "outlined", color: "primary", onClick: function (evt) {
                                                    evt.preventDefault();
                                                    evt.stopPropagation();
                                                    setDeleteMode(false);
                                                } }, "No"),
                                            React.createElement(Button, { className: "p-0", size: "small", variant: "outlined", color: "secondary", onClick: function () {
                                                    toggleSettings();
                                                    onPageDelete();
                                                } }, "Yes")) : null))))));
            }))));
}
Footer.propTypes = {
    onPageSubmit: PropTypes.func.isRequired,
    onPageDelete: PropTypes.func.isRequired
};
export default Footer;
//# sourceMappingURL=pageFooter.js.map