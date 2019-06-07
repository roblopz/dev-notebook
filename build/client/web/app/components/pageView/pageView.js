import * as tslib_1 from "tslib";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EventEmitter } from 'events';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVertRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { getStyles } from '../../styles/jss/pageView/pageView';
import NoteCard from './noteCard';
function PageView(_a) {
    var page = _a.page, className = _a.className;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), settingsOpen = _b[0], setSettinsOpen = _b[1];
    var _c = useState({ expandPage: false, expandingNotes: false }), pageExpander = _c[0], setPageExpander = _c[1];
    var settingsBtnRef = useRef(null);
    var pageEmitter = useRef(new EventEmitter());
    useEffect(function () {
        return function () { return pageEmitter.current.removeAllListeners(); };
    }, []);
    var toggleSettingsOpen = useCallback(function () {
        setSettinsOpen(!settingsOpen);
    }, [settingsOpen]);
    var expandNotes = useCallback(function (expandNotes) {
        if (!pageExpander.expandPage && expandNotes) {
            setPageExpander({ expandPage: true, expandingNotes: true });
            return;
        }
        pageEmitter.current.emit('expandNotes', expandNotes);
    }, [pageExpander]);
    var onPageExpanded = useCallback(function () {
        if (pageExpander.expandingNotes) {
            setPageExpander({ expandPage: true, expandingNotes: false });
            pageEmitter.current.emit('expandNotes', true);
        }
    }, [pageExpander]);
    return (React.createElement(Card, { className: className },
        React.createElement(CardHeader, { title: page.title, subheader: page.notebook.name, action: React.createElement(React.Fragment, null,
                React.createElement(IconButton, { className: classes.headerBtn, buttonRef: settingsBtnRef, onClick: toggleSettingsOpen },
                    React.createElement(MoreVertIcon, { fontSize: "small" })),
                React.createElement(Popper, { open: settingsOpen, anchorEl: settingsBtnRef.current, transition: true }, function (_a) {
                    var TransitionProps = _a.TransitionProps;
                    return (React.createElement(Grow, tslib_1.__assign({}, TransitionProps),
                        React.createElement(ClickAwayListener, { onClickAway: function (evt) {
                                if (!settingsBtnRef.current.contains(evt.target))
                                    toggleSettingsOpen();
                            } },
                            React.createElement(Paper, null,
                                React.createElement(MenuList, null,
                                    React.createElement(MenuItem, { className: "py-1", onClick: function () { return expandNotes(true); } }, "Expand all notes"),
                                    React.createElement(MenuItem, { className: "py-1", onClick: function () { return expandNotes(false); } }, "Collapse all notes"))))));
                }),
                React.createElement(IconButton, { className: classes.headerBtn, onClick: function () { return setPageExpander({ expandPage: !pageExpander.expandPage, expandingNotes: false }); } }, pageExpander.expandPage ? React.createElement(ExpandLessIcon, { fontSize: "small" })
                    : React.createElement(ExpandMoreIcon, { fontSize: "small" }))), className: "py-3", classes: { title: classes.pageTitle } }),
        React.createElement(Collapse, { in: pageExpander.expandPage, timeout: "auto", onEntered: onPageExpanded },
            React.createElement(CardContent, { className: "pt-0 pb-3" }, page.notes.map(function (n, idx) { return (React.createElement(NoteCard, { key: idx, note: n, pageEmitter: pageEmitter.current, className: (idx + 1) < page.notes.length ? 'mb-3' : '' })); })))));
}
PageView.propTypes = {
    page: PropTypes.object.isRequired,
    className: PropTypes.string
};
export default PageView;
//# sourceMappingURL=pageView.js.map