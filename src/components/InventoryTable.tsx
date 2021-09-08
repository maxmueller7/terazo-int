import { FC, useState } from 'react';
import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Inventory } from 'types/Inventory';
import AddIcon from '@material-ui/icons/Add';
import { EditInventoryDialog } from './EditInventoryDialog';
import { AddInventoryDialog } from './AddInventoryDialog';

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
  const [openEditInventory, setOpenEditInventory] = useState<boolean>(false);
  const [openAddInventory, setOpenAddInventory] = useState<boolean>(false);

  const classes = useStyles();

  const handleEditRow = (index: number): void => {
    setOpenEditInventory(true);
  };

  const handleDeleteRow = (index: number): void => {
    setOpenAddInventory(true);
  };

  const editRowButton = (index: number): JSX.Element => {
    return (
      <IconButton onClick={() => handleEditRow(index)}>
        <CreateIcon color='primary' />
      </IconButton>
    );
  };

  const addRowButton = (index: number): JSX.Element => {
    return (
      <IconButton onClick={() => handleDeleteRow(index)}>
        <AddIcon color='secondary' />
      </IconButton>
    );
  };

  return (
    <>
      {
        <EditInventoryDialog
          open={openEditInventory}
          setOpen={setOpenEditInventory}
        />
      }
      {
        <AddInventoryDialog
          open={openAddInventory}
          setOpen={setOpenAddInventory}
        />
      }
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
                  {addRowButton(item.itemId)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
