import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import { useMutation } from 'react-apollo-hooks';

import AddNotebookDialog from './addNotebookDialog';
import { getStyles as getSidebarStyles } from '../main/sidebarMenu/mainSidebar';
import { createNotebookMutation, CreateNotebookInput, CreateNotebookResp } from '../../graphql/mutations/createNotebook';
import { notebooksWithDetailsQuery } from '../../graphql/queries/notebooksWithDetails';
import { notebooksQuery } from '../../graphql/queries/notebooks';

const getStyles = (theme: Theme) => {
  return {
    ...getSidebarStyles(theme),
    dialogContainer: {
      alignItems: 'baseline',
      paddingTop: '5vh'
    }
  };
};

export interface INotebooksSidebarProps {
  onGoBack: () => void;
}

function NotebooksSidebar({ onGoBack }: INotebooksSidebarProps) {
  const classes = makeStyles(getStyles)({});
  const [addingNotebook, setAddingNotebook] = useState(false);
  const createNotebook = useMutation<CreateNotebookResp, CreateNotebookInput>(createNotebookMutation);

  const addNotebook = useCallback(async (newName: string) => {
    if (newName && newName.length > 1) {
      await createNotebook({
        variables: { name: newName },
        refetchQueries: [{
          query: notebooksWithDetailsQuery
        }, {
          query: notebooksQuery
        }]
      });
    }

    setAddingNotebook(false);
  }, []);

  return (
    <Paper className={classes.root}>
      <Tooltip title="Back" placement="right" classes={{ tooltip: classes.iconTooltip }}>
        <div className={classes.iconBlock} onClick={onGoBack}>
          <FontAwesomeIcon icon={faReply} className={classes.faIcon}  />
        </div>
      </Tooltip>
      <Divider />
      <div className={classes.addIconBlock}>
        <Tooltip title="Add notebook" placement="right" classes={{ tooltip: classes.iconTooltip }}>
          <Fab color="primary" size="small" onClick={() => setAddingNotebook(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

      <AddNotebookDialog open={addingNotebook} onClose={() => setAddingNotebook(false)} onOk={addNotebook} />
    </Paper>
  );
}

NotebooksSidebar.propTypes = {
  onGoBack: PropTypes.func.isRequired
};

export default NotebooksSidebar;