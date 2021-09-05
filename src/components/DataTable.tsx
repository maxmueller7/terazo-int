import React, { FC } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { IFactory } from 'types/Factory';
import { IInventory } from 'types/Inventory';
import { IMachine } from 'types/Machine';
import { IWarehouse } from 'types/Warehouse';

const DataTable: FC<{
  T: IFactory[] | IInventory[] | IWarehouse[] | IMachine[];
}> = (props): JSX.Element => {
  // console.log(props);
  const getTableHeaders = (genericObject: typeof props.T): string[] => {
    let tableHeaders: string[] = [];
    if (genericObject !== null && genericObject !== undefined) {
      tableHeaders = Object.keys(genericObject).map((header) => {
        return header.replace(/([a-z])([A-Z])/g, '$1 $2');
      });
      return tableHeaders;
    } else {
      return [];
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(props.T[0]).map((key: string, idx: number) => (
              <TableCell key={`table-cell-key-${key}${idx}`}>
                {key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.T.map((items: Object, index: number) => (
            <TableRow>
              {Object.values(items).map((item: typeof props.T) => (
                <TableCell>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
