import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import { getStyles } from '../../styles/jss/main/pageSearch';
function PageSearch() {
    var classes = makeStyles(getStyles)({});
    return (React.createElement(ListItem, { button: true, className: "pl-2" },
        React.createElement(ListItemIcon, { className: "mr-2" },
            React.createElement(SearchIcon, { className: classes.searchIcon })),
        React.createElement("div", null,
            "Pages",
            React.createElement("div", null,
                React.createElement(InputBase, { placeholder: "Search..." })))));
}
PageSearch.propTypes = {};
export default PageSearch;
//# sourceMappingURL=pageSearch.js.map