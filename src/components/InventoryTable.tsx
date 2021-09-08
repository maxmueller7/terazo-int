import { FC } from 'react';
import {
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
import { Inventory } from 'types/Inventory';

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
  selectedWarehouseId: string;
}> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};
