import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { getStyles } from '../../styles/jss/pageEdit/pageInfo';
import Typography from '@material-ui/core/Typography';
function GeneralPageInfo(_a) {
    var page = _a.page, className = _a.className;
    var classes = makeStyles(getStyles)({});
    var languages = page.notes.map(function (n) { return n.snippet && !n.hideSnippet && n.snippet.language; })
        .filter(function (elem, pos, arr) {
        return !!elem && arr.indexOf(elem) === pos;
    });
    return (React.createElement("div", tslib_1.__assign({}, (className ? { className: className } : null)),
        React.createElement("div", { className: "divider mb-2" },
            React.createElement("span", { className: "label-base" }, "Page info")),
        React.createElement("div", { className: "d-flex align-items-center" },
            React.createElement(Typography, { className: "flex-grow-1", variant: "subtitle2" }, "Notes: "),
            React.createElement(Typography, { variant: "caption" }, page.notes.length)),
        languages.length ?
            React.createElement("div", { className: "mt-1" },
                React.createElement(Typography, { className: "w-100", variant: "subtitle2" }, "Languages: "),
                React.createElement("ul", { className: "pl-4 mb-0" }, languages.map(function (lang, i) { return (React.createElement("li", { key: i, className: classes.language },
                    React.createElement(Typography, { variant: "caption" }, lang))); })))
            : null,
        React.createElement("div", { className: "d-flex flex-wrap align-items-center mt-2 w-100" },
            React.createElement(Typography, { className: "flex-grow-1", variant: "subtitle2", color: "textPrimary" }, "Created: "),
            React.createElement(Typography, { variant: "caption" }, page.createdAt || 'Just now')),
        page.updatedAt ?
            React.createElement("div", { className: "d-flex flex-wrap align-items-center mt-1 w-100" },
                React.createElement(Typography, { className: "flex-grow-1", variant: "subtitle2", color: "textPrimary" }, "Updated: "),
                React.createElement(Typography, { variant: "caption" }, page.updatedAt)) : null,
        React.createElement("div", { className: "divider mb-3 mt-2" })));
}
GeneralPageInfo.propTypes = {
    className: PropTypes.string
};
export default GeneralPageInfo;
//# sourceMappingURL=generalPageInfo.js.map