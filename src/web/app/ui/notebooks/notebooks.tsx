import React, { useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { notebooksWithDetailsQuery, NotebooksWithDetailsResp } from '../../graphql/queries/notebooksWithDetails';
import { RenameNotebookResp, renameNotebookMutation, RenameNotebookInput } from '../../graphql/mutations/renameNotebook';
import { DeleteNotebookResp, deleteNotebookMutation, DeleteNotebookInput } from '../../graphql/mutations/deleteNotebook';
import { notebooksQuery } from '../../graphql/queries/notebooks';

const getStyles = (theme: Theme) => {
  return {
    root: {
      padding: 25,
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      width: '100%',
      maxWidth: 900
    },
    tCell: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    notebookNameText: {
      color: theme.palette.text.secondary,
      fontWeight: 500
    },
    dialogContainer: {
      alignItems: 'baseline',
      paddingTop: '5vh'
    }
  };
};

export interface INotebooksProps {

}

function Notebooks({ }: INotebooksProps) {
  const classes = makeStyles(getStyles)({});
  const [renamingNotebook, setRenamingNotebook] = useState<string>(null);
  const [deletingNotebook, setdeletingNotebook] = useState<string>(null);
  const [newNotebookName, setNewNotebookName] = useState('');

  const { data: { notebooks = [] } } = useQuery<NotebooksWithDetailsResp>(notebooksWithDetailsQuery);
  const renameNotebook = useMutation<RenameNotebookResp, RenameNotebookInput>(renameNotebookMutation);
  const deleteNotebook = useMutation<DeleteNotebookResp, DeleteNotebookInput>(deleteNotebookMutation);

  const triggerRename = useCallback(async (newName) => {
    await renameNotebook({
      variables: { id: renamingNotebook, name: newName },
      refetchQueries: [{
        query: notebooksWithDetailsQuery
      }, {
        query: notebooksQuery
      }]
    });

    setRenamingNotebook(null);
  }, [renamingNotebook]);

  const triggerDelete = useCallback(async () => {
    await deleteNotebook({
      variables: { id: deletingNotebook },
      refetchQueries: [{
        query: notebooksWithDetailsQuery
      }, {
        query: notebooksQuery
      }]
    });

    setdeletingNotebook(null);
  }, [deletingNotebook]);

  const closeRenameModal = useCallback(() => {
    setNewNotebookName(null);
    setRenamingNotebook(null);
  }, []);

  const targetRename = renamingNotebook && notebooks.find(n => n._id === renamingNotebook) || {} as any;
  const targetDelete = deletingNotebook && notebooks.find(n => n._id === deletingNotebook) || {} as any;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            {notebooks.map(n => (
              <TableRow key={n._id}>
                <TableCell className={classes.tCell} component="th" scope="row">
                  <span className={classes.notebookNameText}>{n.name}</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;
                    {n.pageCount === 0 ? '(no pages)' : null}
                    {n.pageCount === 1 ? '(1 page)' : null}
                    {n.pageCount > 1 ? `(${n.pageCount} pages)` : null}
                  </span>
                </TableCell>
                <TableCell className={classes.tCell} align="right">
                  <Button size="small" onClick={() => setRenamingNotebook(n._id)}>
                    Rename
                  </Button>
                  <Button size="small" color="secondary" onClick={() => setdeletingNotebook(n._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog classes={{ container: classes.dialogContainer }}
          open={!!renamingNotebook} onClose={closeRenameModal}>
          <DialogContent>
            <DialogContentText className="mb-0">
              Rename notebook "{targetRename.name}"
            </DialogContentText>
            <TextField autoFocus margin="dense" label="Name" fullWidth
              value={newNotebookName || targetRename.name || ''}
              onChange={evt => setNewNotebookName(evt.target.value )} />
          </DialogContent>
          <DialogActions className="pt-0">
            <Button onClick={closeRenameModal} color="primary">
              Cancel
            </Button>
            <Button onClick={triggerRename} color="primary">
              Rename
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog classes={{ container: classes.dialogContainer }}
          open={!!deletingNotebook} onClose={() => setdeletingNotebook(null)}>
          <DialogContent>
            <DialogContentText className="mb-0">
              Delete notebook "{targetDelete.name}"?
            </DialogContentText>
            {targetDelete.pageCount > 0 ?
                <Typography component="div" color="error" variant="button" className="text-center">
                  {targetDelete.pageCount} pages will be deleted!
                </Typography> : null}
          </DialogContent>
          <DialogActions className="justify-content-center pt-0">
            <Button onClick={() => setdeletingNotebook(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={triggerDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

Notebooks.propTypes = {
};

export default Notebooks;