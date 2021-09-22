import { FC, useState } from 'react';
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
import axios, { AxiosResponse, AxiosError } from 'axios';

const useStyles = makeStyles((theme?: Theme) => ({
  textFieldMargingLeft: {
    marginLeft: 10,
  },
}));

type AddInventoryDialogProps = {
  open: boolean;
  setOpen: any;
  setLoading: any;
  selectedWarehouseId: string;
};

export const AddInventoryDialog: FC<AddInventoryDialogProps> = ({
  open,
  setOpen,
  setLoading,
  selectedWarehouseId,
}): JSX.Element => {
  const [formWarehouseId, setFormWarehouseId] = useState<string>(
    selectedWarehouseId
  );
  const [itemSKU, setItemSKU] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleWarehouseId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormWarehouseId(event.target.value);
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

  const handleSubmitAddInventory = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const postRequest = {
      warehouseId: formWarehouseId,
      itemSKU,
      itemQuantity,
      itemName,
      itemDescription,
    };

    await axios
      .post(
        `http://localhost:3001/${formWarehouseId}/inventory`,
        JSON.stringify(postRequest)
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          alert('Inventory added successfully!');
          setFormWarehouseId(selectedWarehouseId);
          setItemDescription('');
          setItemName('');
          setItemQuantity('');
          setItemSKU('');
        }
      })
      .catch((error: AxiosError) => {
        alert(`Error while adding inventory!\n${error.message}`);
      })
      .finally(setLoading(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmitAddInventory}>
        <DialogTitle id='form-dialog-title'>Inventory Receiving</DialogTitle>
        <DialogContent>
          <DialogContentText>Add inventory to a warehouse.</DialogContentText>
          <TextField
            autoFocus
            defaultValue={selectedWarehouseId}
            id='warehouseId'
            label='Warehouse ID'
            onChange={handleWarehouseId}
            type='number'
          />
          <TextField
            className={classes.textFieldMargingLeft}
            defaultValue={itemSKU}
            id='itemSKU'
            label='Item SKU'
            onChange={handleItemSKU}
            type='number'
          />
          <TextField
            className={classes.textFieldMargingLeft}
            defaultValue={itemQuantity}
            id='itemQuantity'
            label='Item Quantity'
            onChange={handleItemQuantity}
            type='number'
          />
          <br />
          <TextField
            defaultValue={itemName}
            fullWidth
            id='itemName'
            label='Item Name'
            onChange={handleItemName}
            type='string'
          />
          <br />
          <TextField
            defaultValue={itemDescription}
            fullWidth
            id='itemDescription'
            label='Item Description'
            onChange={handleItemDescription}
            type='string'
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
