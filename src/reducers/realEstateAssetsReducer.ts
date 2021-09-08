import { RealEstateAsset, BuildingType } from 'types/RealEstateAsset';

interface IRealEstateAction {
  type: RealEstateAssetsActionTypes;
  payload: {
    assetType: string;
    assetList: RealEstateAsset<BuildingType>[];
  };
}

export enum RealEstateAssetsActionTypes {
  FETCH_REAL_ESTATE_ASSETS,
}

interface IRealEstateActionState {
  warehouses: RealEstateAsset<BuildingType.WAREHOUSE>[];
  factories: RealEstateAsset<BuildingType.FACTORY>[];
}

export const initialRealEstateAssetsState: IRealEstateActionState = {
  warehouses: [],
  factories: [],
};

export const fetchRealEstateAssets = (
  assetType: BuildingType,
  assetList: RealEstateAsset<BuildingType>[]
) => ({
  type: RealEstateAssetsActionTypes.FETCH_REAL_ESTATE_ASSETS,
  payload: { assetType, assetList },
});

export const realEstateAssetsReducer = (
  state: IRealEstateActionState = initialRealEstateAssetsState,
  action: IRealEstateAction
): IRealEstateActionState => {
  switch (action.type) {
    case RealEstateAssetsActionTypes.FETCH_REAL_ESTATE_ASSETS:
      const { assetType, assetList } = action.payload;
      if (assetType === BuildingType.WAREHOUSE) {
        return { ...state, warehouses: assetList };
      } else {
        return { ...state, factories: assetList };
      }
    default:
      return state;
  }
};
