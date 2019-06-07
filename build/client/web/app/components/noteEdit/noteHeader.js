import * as tslib_1 from "tslib";
import React, { useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import MoveVertIcon from '@material-ui/icons/MoreVertRounded';
import RemoveIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import AddIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { getStyles } from '../../styles/jss/noteEdit/noteHeader';
function NoteHeader(_a) {
    var setCollapsed = _a.setCollapsed, isCollapsed = _a.isCollapsed, onNoteDelete = _a.onNoteDelete;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), settingsOpen = _b[0], setSettingsOpen = _b[1];
    var _c = useState(false), deleteMode = _c[0], setDeleteMode = _c[1];
    var iconButtonRef = useRef(null);
    var toggleSettings = useCallback(function () {
        setSettingsOpen(!settingsOpen);
        setDeleteMode(false);
    }, [settingsOpen]);
    var deleteNoteMenuItem = useMemo(function () {
        return (React.createElement(MenuItem, { className: "d-flex flex-column align-items-start h-auto", onClick: function () { return setDeleteMode(true); } },
            deleteMode ? 'Delete note?' : 'Delete',
            deleteMode ?
                React.createElement("div", { className: "d-flex w-100 mt-2" },
                    React.createElement(Button, { className: "p-0 mr-2", size: "small", variant: "outlined", color: "primary", onClick: function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setDeleteMode(false);
                        } }, "No"),
                    React.createElement(Button, { className: "p-0", size: "small", variant: "outlined", color: "secondary", onClick: function () {
                            toggleSettings();
                            onNoteDelete();
                        } }, "Yes")) : null));
    }, [deleteMode, toggleSettings]);
    return (React.createElement("div", { className: classes.root },
        React.createElement(IconButton, { className: classes.headerIcon, color: "default", onClick: toggleSettings, buttonRef: iconButtonRef },
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
                            React.createElement(MenuItem, null, "Move to notebook..."),
                            deleteNoteMenuItem)))));
        }),
        React.createElement(IconButton, { className: classes.headerIcon, color: "default", onClick: function () { return setCollapsed(!isCollapsed); } }, isCollapsed ? React.createElement(AddIcon, { fontSize: "small" }) : React.createElement(RemoveIcon, { fontSize: "small" }))));
}
NoteHeader.propTypes = {
    setCollapsed: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    onNoteDelete: PropTypes.func.isRequired
};
export default NoteHeader;
//# sourceMappingURL=noteHeader.js.map