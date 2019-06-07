import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/CodeRounded';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import { getStyles } from '../../styles/jss/main/languageTree';
function LanguageTree(_a) {
    var languages = _a.languages;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), treeOpen = _b[0], setTreeOpen = _b[1];
    var filterRef = useRef(null);
    var onTreeToggle = useCallback(function (evt) {
        var toggleOpen = !treeOpen;
        if (evt.target === filterRef.current)
            toggleOpen = true;
        setTreeOpen(toggleOpen);
    }, [treeOpen]);
    return (React.createElement("div", { className: classes.root },
        React.createElement(ListItem, { button: true, className: "pl-2", onClick: onTreeToggle },
            React.createElement(ListItemIcon, { className: "mr-2" },
                React.createElement(CodeIcon, { className: classes.languagesIcon })),
            React.createElement("div", null,
                "Language",
                React.createElement("div", null,
                    React.createElement(InputBase, { inputRef: filterRef, placeholder: "Filter" }))),
            treeOpen ? React.createElement(ExpandLessIcon, null) : React.createElement(ExpandMoreIcon, null)),
        React.createElement(Collapse, { in: treeOpen, unmountOnExit: true }, languages.map(function (lang, idx) { return (React.createElement(List, { key: idx, disablePadding: true },
            React.createElement(ListItem, { button: true, className: "py-1" },
                React.createElement(ListItemIcon, { className: "mr-2" },
                    React.createElement(ReceiptIcon, null)),
                React.createElement(ListItemText, { inset: true, primary: lang, className: "pl-0" })))); }))));
}
LanguageTree.defaultProps = {
    languages: []
};
LanguageTree.propTypes = {
    languages: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default LanguageTree;
//# sourceMappingURL=languageTree.js.map