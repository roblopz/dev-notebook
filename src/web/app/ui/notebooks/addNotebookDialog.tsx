import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const getStyles = (theme: Theme) => {
  return {
    dialogContainer: {
      alignItems: 'baseline',
      paddingTop: '5vh'
    }
  };
};

export interface IAddNotebookDialogProps {
  onOk: (name: string) => void | Promise<void>;
  onClose: () => void;
  open: boolean;
}

function AddNotebookDialog({ onOk, onClose, open }: IAddNotebookDialogProps) {
  const classes = makeStyles(getStyles)({});
  const [newNotebookName, setNewNotebookName] = useState('');

  const _onClose = useCallback(() => {
    setNewNotebookName('');
    onClose();
  }, []);

  const _onOk = useCallback(() => {
    const sanitizedName = (newNotebookName || '').replace(/[^a-zA-Z0-9\s]/ig, '').replace(/\s{2,}/ig, ' ').trim();
    setNewNotebookName('');
    onOk(sanitizedName);
  }, [newNotebookName]);

  return (
    <Dialog classes={{ container: classes.dialogContainer }} open={!!open} onClose={_onClose}>
      <DialogContent>
        <DialogContentText className="mb-0">
          Add new notebook
        </DialogContentText>
        <TextField autoFocus margin="dense" label="Name" fullWidth
          value={newNotebookName}
          onChange={evt => setNewNotebookName(evt.target.value)} />
      </DialogContent>
      <DialogActions className="pt-0">
        <Button onClick={_onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={_onOk} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddNotebookDialog.propTypes = {
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default AddNotebookDialog;