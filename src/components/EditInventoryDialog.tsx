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
import axios, { AxiosError, AxiosResponse } from 'axios';

const useStyles = makeStyles((theme?: Theme) => ({
  textFieldMargingLeft: {
    marginLeft: 10,
  },
}));

export const EditInventoryDialog: FC<{
  open: boolean;
  setOpen: any;
  loading: boolean;
  setLoading: any;
  selectedWarehouseId: string;
}> = (props): JSX.Element => {
  const [formWarehouseId, setFormWarehouseId] = useState<string>(
    props.selectedWarehouseId
  );
  const [itemId, setItemId] = useState<string>('');
  const [itemSKU, setItemSKU] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemDelete, setItemDelete] = useState<boolean>(false);

  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleWarehouseId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormWarehouseId(event.target.value);
  };

  const handleItemId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemId(event.target.value);
  };

  const handleItemSKU = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemSKU(event.target.value);
  };

  const handleItemQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(event.target.value);
  };

  const handleItemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleItemDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemDescription(event.target.value);
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemDelete(!itemDelete);
  };

  const handleSubmitEditInventory = async (e: any) => {
    props.setLoading(true);
    e.preventDefault();
    const patchRequest = {
      warehouseId: formWarehouseId,
      itemId,
      itemSKU,
      itemQuantity,
      itemName,
      itemDescription,
      itemDelete,
    };

    await axios
      .patch(
        `http://localhost:3001/${formWarehouseId}/inventory`,
        JSON.stringify(patchRequest),
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          alert('Saved successfully!');
          setFormWarehouseId(props.selectedWarehouseId);
          setItemDelete(false);
          setItemDescription('');
          setItemId('');
          setItemName('');
          setItemQuantity('');
          setItemSKU('');
        }
      })
      .catch((error: AxiosError) => {
        alert(`Error while editing inventory!\n${error.message}`);
      })
      .finally(props.setLoading(false));
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
            onChange={handleWarehouseId}
            defaultValue={props.selectedWarehouseId}
            autoFocus
            id='warehouseId'
            label='Warehouse ID'
            type='number'
          />
          <TextField
            onChange={handleItemId}
            defaultValue={itemId}
            className={classes.textFieldMargingLeft}
            id='itemId'
            label='Item ID'
            type='number'
          />
          <TextField
            onChange={handleItemSKU}
            defaultValue={itemSKU}
            className={classes.textFieldMargingLeft}
            id='itemSKU'
            label='Item SKU'
            type='number'
          />
          <br />
          <TextField
            onChange={handleItemQuantity}
            defaultValue={itemQuantity}
            id='itemQuantity'
            label='Item Quantity'
            type='number'
          />
          <TextField
            onChange={handleItemName}
            defaultValue={itemName}
            className={classes.textFieldMargingLeft}
            id='itemName'
            label='Item Name'
            type='string'
          />
          <br />
          <TextField
            onChange={handleItemDescription}
            defaultValue={itemDescription}
            id='itemDescription'
            label='Item Description'
            type='string'
            fullWidth
          />
          <br />
          <Typography style={{ marginTop: 10 }}>
            Delete?
            <Checkbox
              checked={itemDelete}
              onChange={handleCheckBox}
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
