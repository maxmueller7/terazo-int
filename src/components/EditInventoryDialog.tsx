import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  Checkbox,
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

export const EditInventoryDialog: FC<{ open: boolean; setOpen: any }> = (
  props
): JSX.Element => {
  const [deleteCheckBox, setDeleteCheckBox] = useState<boolean>(false);

  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleCheck = () => {
    setDeleteCheckBox(!deleteCheckBox);
  };

  const handleSubmitEditInventory = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmitEditInventory}>
        <DialogTitle id='form-dialog-title'>Edit inventory</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit inventory details here.</DialogContentText>
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
          <TextField id='itemQuantity' label='Item Quantity' type='number' />
          <TextField
            className={classes.textFieldMargingLeft}
            id='itemName'
            label='Item Name'
            type='string'
          />
          <br />
          <Typography style={{ marginTop: 10 }}>
            Delete?
            <Checkbox
              checked={deleteCheckBox}
              onChange={handleCheck}
              name='delete'
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' type='submit'>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
