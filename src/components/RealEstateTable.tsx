import React, { FC, useContext } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import { BuildingType } from 'types/RealEstateAsset';
import { IAddress } from 'types/Address';
import { RealEstateAssetsContext } from 'context/RealEstateAssetsContext';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
    height: '35vh',
  },
}));

type RealEstateTableProps = {
  assetType: BuildingType;
};

export const RealEstateTable: FC<RealEstateTableProps> = ({
  assetType,
}): JSX.Element => {
  const realEstateAssets = useContext(RealEstateAssetsContext);

  const assetList =
    assetType === BuildingType.FACTORY
      ? realEstateAssets.factories
      : realEstateAssets.warehouses;

  const classes = useStyles();

  const columns: GridColDef[] = [
    {
      field: `${assetType}Id`,
      headerName: `${assetType.toUpperCase()} ID`,
      width: 190,
    },
    {
      field: `${assetType}Name`,
      headerName: `${assetType.toUpperCase()} NAME`,
      width: 215,
    },
    {
      field: `${assetType}Address`,
      headerName: `${assetType.toUpperCase()} ADDRESS`,
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
      field: `${assetType}Description`,
      headerName: `${assetType.toUpperCase()} ID`,
      width: 500,
    },
  ];

  return (
    <DataGrid
      className={classes.dataGrid}
      rows={assetList}
      columns={columns}
      disableSelectionOnClick
      getRowId={(row) => {
        return assetType === BuildingType.FACTORY
          ? row.factoryId
          : row.warehouseId;
      }}
    />
  );
};
