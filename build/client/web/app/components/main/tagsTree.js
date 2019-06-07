import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/LabelRounded';
import Chip from '@material-ui/core/Chip';
import { getStyles } from '../../styles/jss/main/tagsTree';
function TagsTree(_a) {
    var tags = _a.tags;
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
                React.createElement(LabelIcon, { className: classes.tagsIcon })),
            React.createElement("div", null,
                "Tags",
                React.createElement("div", null,
                    React.createElement(InputBase, { inputRef: filterRef, placeholder: "Search..." }))),
            treeOpen ? React.createElement(ExpandLessIcon, null) : React.createElement(ExpandMoreIcon, null)),
        React.createElement(Collapse, { in: treeOpen, unmountOnExit: true },
            React.createElement("div", { className: classes.tagsContainer }, tags.map(function (tag, idx) { return (React.createElement(Chip, { key: idx, label: tag, onClick: function () { }, className: classes.tag })); })))));
}
TagsTree.defaultProps = {
    tags: []
};
TagsTree.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default TagsTree;
//# sourceMappingURL=tagsTree.js.map