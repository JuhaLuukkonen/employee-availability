import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RowsDialog from "./RowsDialog";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
// secondary set red button - does blue one is ment for main function for thi property?
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Add employee availability
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add employee availability</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please let us know are you available or not? It's also OK if you don't know.
          </DialogContentText>
                     
          <RowsDialog />
          
        </DialogContent>
        <DialogActions>        
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add availability
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}