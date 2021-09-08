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
import { Delete } from '@material-ui/icons';
import EditInventoryDialog from './EditInventoryDialog';

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

  return (
    <>
      {<EditInventoryDialog open={open} setOpen={setOpen} />}
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
