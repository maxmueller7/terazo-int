import React, { FC } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import { IMachine } from 'types/Machine';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
  },
}));

export const CapitalEquipmentTable: FC<{ machines: IMachine[] }> = (
  props
): JSX.Element => {
  const classes = useStyles();

  const columns: GridColDef[] = [
    {
      field: 'factoryId',
      headerName: 'Factory ID',
      width: 150,
    },
    { field: 'machineId', headerName: 'Machine ID', width: 150 },
    { field: 'machineName', headerName: 'Machine Name', width: 250 },
    {
      field: 'machineDescription',
      headerName: 'Machine Description',
      width: 300,
    },
  ];

  return (
    <DataGrid
      autoHeight
      className={classes.dataGrid}
      rows={props.machines}
      columns={columns}
      disableSelectionOnClick
      getRowId={(row) => row.machineId}
    />
  );
};
