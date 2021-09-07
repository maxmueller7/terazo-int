import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { BuildingType, RealEstateAsset } from 'types/RealEstateAsset';

export const RealEstatePage: FC<{}> = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<
    RealEstateAsset<BuildingType.WAREHOUSE>[]
  >([]);
  const [factories, setFactories] = useState<
    RealEstateAsset<BuildingType.FACTORY>[]
  >([]);

  const getRealEstateAssets = async (assetType: BuildingType) => {
    const endpoint =
      assetType === BuildingType.FACTORY ? 'factories' : 'warehouses';

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
    setLoading(true);

    Promise.all([
      getRealEstateAssets(BuildingType.WAREHOUSE),
      getRealEstateAssets(BuildingType.FACTORY),
    ]).then(([warehouses, factories]) => {
      setWarehouses(warehouses);
      setFactories(factories);
    });
  }, []);

  return <div>qwe</div>;
};
