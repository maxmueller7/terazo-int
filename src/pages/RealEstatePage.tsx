import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { RealEstateTable } from 'components/RealEstateTable';
import { RealEstateAssetsContext } from 'context/RealEstateAssetsContext';
import { FC, useContext, useEffect, useState } from 'react';
import { BuildingType } from 'types/RealEstateAsset';

export const RealEstatePage: FC<{}> = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const realEstateAssets = useContext(RealEstateAssetsContext);

  useEffect(() => {
    //set time out to let grids (memory heavy) to properly render
    setTimeout(
      () =>
        setLoading(
          !!!realEstateAssets.factories || !!!realEstateAssets.warehouses
        ),
      1000
    );
  }, [realEstateAssets]);

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
            {!!realEstateAssets.warehouses.length && (
              <RealEstateTable assetType={BuildingType.WAREHOUSE} />
            )}
          </Paper>
          <br />
          <Typography variant='h4' color='secondary'>
            Factories
          </Typography>
          <Paper elevation={3}>
            {!!realEstateAssets.factories.length && (
              <RealEstateTable assetType={BuildingType.FACTORY} />
            )}
          </Paper>
        </>
      )}
    </>
  );
};
