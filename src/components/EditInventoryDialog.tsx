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
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme?: Theme) => ({
  textFieldMargingLeft: {
    marginLeft: 10,
  },
}));

const EditInventoryDialog: FC<{ open: boolean; setOpen: any }> = (
  props
): JSX.Element => {
  const [open, setOpen] = useState<boolean>();
  const [deleteCheckBox, setDeleteCheckBox] = useState<boolean>(false);

  const classes = useStyles();

  const handleEditRow = (index: number): void => {
    props.setOpen(true);
  };

  const handleDeleteRow = (index: number): void => {
    console.log(index);
  };

  const editRowButton = (index: number): JSX.Element => {
    return (
      <IconButton onClick={() => handleEditRow(index)}>
        <CreateIcon color='primary' />
      </IconButton>
    );
  };

  const deleteRowButton = (index: number): JSX.Element => {
    return (
      <IconButton onClick={() => handleDeleteRow(index)}>
        <Delete color='secondary' />
      </IconButton>
    );
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleCheck = () => {
    setDeleteCheckBox(!deleteCheckBox);
  };

  const handleSubmitInventoryUpdate = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmitInventoryUpdate}>
        <DialogTitle id='form-dialog-title'>Edit Inventory Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can update the inventory data here.
          </DialogContentText>
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

export default EditInventoryDialog;
