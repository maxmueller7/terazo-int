import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme?: Theme) => ({
  textFieldMargingLeft: {
    marginLeft: 10,
  },
}));

export const AddInventoryDialog: FC<{ open: boolean; setOpen: any }> = (
  props
): JSX.Element => {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmitAddInventory = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmitAddInventory}>
        <DialogTitle id='form-dialog-title'>Inventory Receiving</DialogTitle>
        <DialogContent>
          <DialogContentText>Add inventory to a warehouse.</DialogContentText>
          <TextField
            autoFocus
            id='warehouseId'
            label='Warehouse ID'
            type='number'
          />
          <TextField
            className={classes.textFieldMargingLeft}
            id='itemId'
            label='Item ID'
            type='number'
          />
          <TextField
            className={classes.textFieldMargingLeft}
            id='itemSKU'
            label='Item SKU'
            type='number'
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' type='submit'>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
