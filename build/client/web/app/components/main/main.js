import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import { useApolloClient } from 'react-apollo-hooks';
import { getStyles } from '../../styles/jss/main/main';
import Navbar from './navbar';
import Sidebar from './sidebar';
import PageResults from './pageResults';
function Main() {
    var classes = makeStyles(getStyles)({});
    var client = useApolloClient();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Navbar, null),
        React.createElement(Sidebar, null),
        React.createElement("div", { className: classes.contentWrapper },
            React.createElement(PageResults, null),
            React.createElement(Fab, { className: classes.addPageIcon, color: "primary", size: "small", onClick: function () { return client.writeData({ data: { addingPage: true } }); } },
                React.createElement(AddIcon, null)))));
}
export default Main;
//# sourceMappingURL=main.js.map