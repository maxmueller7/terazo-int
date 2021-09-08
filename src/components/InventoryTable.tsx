import React, { FC, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Inventory } from 'types/Inventory';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
    maxHeight: '70h',
  },
  textFieldMargingLeft: {
    marginLeft: 10,
  },
}));

export const InventoryTable: FC<{
  inventory: Inventory[];
}> = (props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteCheckBox, setDeleteCheckBox] = useState<boolean>(false);

  const classes = useStyles();

  const handleEditRow = (index: number): void => {
    setOpen(true);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    setDeleteCheckBox(!deleteCheckBox);
  };

  const EditDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
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
        <Button onClick={handleClose} color='primary'>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {EditDialog}
      <TableContainer component={Paper} className={classes.dataGrid}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(props.inventory[0]).map(
                (key: string, idx: number) => (
                  <TableCell key={`table-cell-key-${key}${idx}`}>
                    {key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
                  </TableCell>
                )
              )}
              <TableCell>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.inventory.map((item: Inventory) => (
              <TableRow key={`table-row-key-${item.itemSKU}`}>
                {Object.values(item).map((value: string | number) => (
                  <TableCell key={`table-cell-key-${item.itemSKU}-${value}`}>
                    {value}
                  </TableCell>
                ))}
                <TableCell>
                  {editRowButton(item.itemId)}
                  {deleteRowButton(item.itemId)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
