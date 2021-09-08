import React, { FC } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Inventory } from 'types/Inventory';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
    maxHeight: '70h',
  },
}));

export const InventoryTable: FC<{
  inventory: Inventory[];
}> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.dataGrid}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(props.inventory[0]).map((key: string, idx: number) => (
              <TableCell key={`table-cell-key-${key}${idx}`}>
                {key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
              </TableCell>
            ))}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
