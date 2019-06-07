import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getStyles } from '../../styles/jss/main/navbar';
import FilterNotes from './navbarFilterNotes';
function Navbar() {
    var classes = makeStyles(getStyles)({});
    return (React.createElement(AppBar, { position: "fixed", className: classes.navbar },
        React.createElement(Toolbar, null,
            React.createElement(Typography, { variant: "h6", color: "inherit", noWrap: true }, "Dev Notebooks"),
            React.createElement("div", { className: classes.flexGrow }),
            React.createElement(FilterNotes, null))));
}
Navbar.propTypes = {};
export default Navbar;
//# sourceMappingURL=navbar.js.map