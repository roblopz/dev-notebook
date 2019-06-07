import * as tslib_1 from "tslib";
import React, { useState, useCallback, useRef } from 'react';
import shortid from 'shortid';
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
import CollectionsIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import BookIcon from '@material-ui/icons/BookOutlined';
import FilteredIcon from '@material-ui/icons/FilterListRounded';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { mutations } from '../../graphql/@client/mutations';
import { getStyles } from '../../styles/jss/main/notebookTree';
import gql from 'graphql-tag';
var GET_NOTEBOOK_FILTER = gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  query getNotebookFilter {\n    filter: pageFilters {\n      notebook\n    }\n  }\n"], ["\n  query getNotebookFilter {\n    filter: pageFilters {\n      notebook\n    }\n  }\n"])));
function NotebookTree(_a) {
    var notebooks = _a.notebooks;
    var classes = makeStyles(getStyles)({});
    var _b = useState(false), treeOpen = _b[0], setTreeOpen = _b[1];
    var filterRef = useRef(null);
    var _c = useQuery(GET_NOTEBOOK_FILTER), data = _c.data, loading = _c.loading, error = _c.error;
    if (error)
        console.log(error);
    if (!loading) {
        console.log('component data: ');
        console.log(data.filter);
    }
    var onTreeToggle = useCallback(function (evt) {
        var toggleOpen = !treeOpen;
        if (evt.target === filterRef.current)
            toggleOpen = true;
        setTreeOpen(toggleOpen);
    }, [treeOpen]);
    var mut = useMutation(mutations.setPageFilters.query);
    return (React.createElement("div", { className: classes.root },
        React.createElement("button", { onClick: function () {
                mut({
                    variables: {
                        pageFilters: {
                            search: shortid.generate(),
                        }
                    }
                });
            } }, "ok"),
        React.createElement(ListItem, { button: true, className: "pl-2", onClick: onTreeToggle },
            React.createElement(ListItemIcon, { className: "mr-2" },
                React.createElement(CollectionsIcon, { className: classes.notebooksIcon })),
            React.createElement("div", null,
                "Notebooks",
                React.createElement("div", null,
                    React.createElement(InputBase, { inputRef: filterRef, placeholder: "Filter" }))),
            treeOpen ? React.createElement(ExpandLessIcon, null) : React.createElement(ExpandMoreIcon, null)),
        React.createElement(Collapse, { in: treeOpen, unmountOnExit: true }, notebooks.map(function (n, idx) { return (React.createElement(List, { key: idx, disablePadding: true },
            React.createElement(ListItem, { button: true, className: "py-1" },
                React.createElement(ListItemIcon, { className: "mr-2" },
                    React.createElement(BookIcon, null)),
                React.createElement(ListItemText, { inset: true, primary: n.name, className: "pl-0" }),
                React.createElement(ListItemIcon, { className: classes.filteredIcon },
                    React.createElement(FilteredIcon, null))))); }))));
}
NotebookTree.propTypes = {
    notebooks: PropTypes.array.isRequired
};
export default NotebookTree;
var templateObject_1;
//# sourceMappingURL=notebookTree.js.map