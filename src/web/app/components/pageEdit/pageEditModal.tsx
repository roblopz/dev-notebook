import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';

import { getStyles } from '../../styles/jss/pageEdit/pageEditModal';
import PageEdit from './pageEdit';

const GET_ADDING_PAGE = gql`
  {
    addingPage @client
  }
`;

function PageEditModal() {
  const classes = makeStyles(getStyles)({});
  const client = useApolloClient();
  const { data: { addingPage } } = useQuery(GET_ADDING_PAGE);
  
  const closeModal = useCallback(() => {
    client.writeData({ data: { addingPage: false } });
  }, []);

  return (
    <Dialog open={!!addingPage} className={classes.root}
      disableBackdropClick={true} disableEscapeKeyDown={true}
      classes={{ paper: classes.modalPaperRoot, container: classes.modalContainer }}>
      <Paper>
        <PageEdit onClose={closeModal} />
      </Paper>
    </Dialog>
  );
}

PageEditModal.propTypes = {

};

export default PageEditModal;