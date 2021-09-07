import React, { FC } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import { BuildingType, RealEstateAsset } from 'types/RealEstateAsset';
import { IAddress } from 'types/Address';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
    height: '35vh',
  },
}));

export const RealEstateTable: FC<{
  realEstateAssets:
    | RealEstateAsset<BuildingType.WAREHOUSE>[]
    | RealEstateAsset<BuildingType.FACTORY>[];
  assetType: BuildingType;
}> = (props): JSX.Element => {
  const classes = useStyles();

  const columns: GridColDef[] = [
    {
      field: `${props.assetType}Id`,
      headerName: `${props.assetType.toUpperCase()} ID`,
      width: 190,
    },
    {
      field: `${props.assetType}Name`,
      headerName: `${props.assetType.toUpperCase()} NAME`,
      width: 215,
    },
    {
      field: `${props.assetType}Address`,
      headerName: `${props.assetType.toUpperCase()} ADDRESS`,
      width: 500,
      renderCell: (address) => {
        return (
          <>
            {Object.values(address.value as IAddress)
              .filter((item: string) => item !== '')
              .join(', ')
              .toString()}
          </>
        );
      },
    },
    {
      field: `${props.assetType}Description`,
      headerName: `${props.assetType.toUpperCase()} ID`,
      width: 500,
    },
  ];

  return (
    <DataGrid
      className={classes.dataGrid}
      rows={props.realEstateAssets}
      columns={columns}
      disableSelectionOnClick
      getRowId={(row) => {
        return props.assetType === BuildingType.FACTORY
          ? row.factoryId
          : row.warehouseId;
      }}
    />
  );
};
