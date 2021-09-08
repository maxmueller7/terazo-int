import { CircularProgress, Paper, Typography } from '@material-ui/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { RealEstateTable } from 'components/RealEstateTable';
import React, { FC, useEffect, useState } from 'react';
import {
  BuildingType,
  RealEstateEndpoints,
  RealEstateAsset,
} from 'types/RealEstateAsset';

export const RealEstatePage: FC<{}> = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState<
    RealEstateAsset<BuildingType.WAREHOUSE>[]
  >([]);
  const [factories, setFactories] = useState<
    RealEstateAsset<BuildingType.FACTORY>[]
  >([]);

  const getRealEstateAssets = async (assetType: BuildingType) => {
    const endpoint =
      assetType === BuildingType.FACTORY
        ? RealEstateEndpoints.FACTORIES
        : RealEstateEndpoints.WAREHOUSES;

    return await axios
      .get<RealEstateAsset<BuildingType>>(`http://localhost:3001/${endpoint}`)
      .then(
        (response: AxiosResponse<RealEstateAsset<BuildingType.WAREHOUSE>>) => {
          return JSON.parse(JSON.stringify(response.data));
        }
      )
      .catch((error: AxiosError) => {
        alert(error);
      });
  };

  useEffect(() => {
    Promise.all([
      getRealEstateAssets(BuildingType.WAREHOUSE),
      getRealEstateAssets(BuildingType.FACTORY),
    ]).then(([warehouses, factories]) => {
      setWarehouses(warehouses);
      setFactories(factories);
    });
    //setting some time out to allow browser to render grid (memory heavy!),
    //otherwise it loads the typography first and it looks odd.
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <Typography variant='h4' color='secondary'>
            Warehouses
          </Typography>
          <Paper elevation={3}>
            {!!warehouses.length && (
              <RealEstateTable
                realEstateAssets={warehouses}
                assetType={BuildingType.WAREHOUSE}
              />
            )}
          </Paper>
          <br />
          <Typography variant='h4' color='secondary'>
            Factories
          </Typography>
          <Paper elevation={3}>
            {!!factories.length && (
              <RealEstateTable
                realEstateAssets={factories}
                assetType={BuildingType.FACTORY}
              />
            )}
          </Paper>
        </>
      )}
    </>
  );
};
