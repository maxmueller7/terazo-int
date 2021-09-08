import { createContext } from 'react';
import { IRealEstateActionState } from 'reducers/realEstateAssetsReducer';
import { BuildingType } from 'types/RealEstateAsset';
import { RealEstateAsset } from 'types/RealEstateAsset';

interface IRealEstateContext {
  warehouses: RealEstateAsset<BuildingType.WAREHOUSE>[];
  factories: RealEstateAsset<BuildingType.FACTORY>[];
  fetchRealEstateAssets: any;
}

export const RealEstateAssetsContext = createContext<IRealEstateContext>({
  warehouses: [],
  factories: [],
  fetchRealEstateAssets: (
    state: IRealEstateActionState,
    assetType: BuildingType,
    assetList: RealEstateAsset<BuildingType>[]
  ) => {},
});
