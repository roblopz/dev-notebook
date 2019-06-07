import * as tslib_1 from "tslib";
import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import { getStyles } from '../../styles/jss/pageEdit/pageEditModal';
import PageEdit from './pageEdit';
var GET_ADDING_PAGE = gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  {\n    addingPage @client\n  }\n"], ["\n  {\n    addingPage @client\n  }\n"])));
function PageEditModal() {
    var classes = makeStyles(getStyles)({});
    var client = useApolloClient();
    var addingPage = useQuery(GET_ADDING_PAGE).data.addingPage;
    var closeModal = useCallback(function () {
        client.writeData({ data: { addingPage: false } });
    }, []);
    return (React.createElement(Dialog, { open: !!addingPage, className: classes.root, disableBackdropClick: true, disableEscapeKeyDown: true, classes: { paper: classes.modalPaperRoot, container: classes.modalContainer } },
        React.createElement(Paper, null,
            React.createElement(PageEdit, { onClose: closeModal }))));
}
PageEditModal.propTypes = {};
export default PageEditModal;
var templateObject_1;
//# sourceMappingURL=pageEditModal.js.map