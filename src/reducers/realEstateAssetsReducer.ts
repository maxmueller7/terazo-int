import { RealEstateAsset, BuildingType } from 'types/RealEstateAsset';

interface IRealEstateAction {
  type: RealEstateAssetsActionTypes;
  payload: {
    assetType: BuildingType;
    assetList: RealEstateAsset<BuildingType>[];
  };
}

export enum RealEstateAssetsActionTypes {
  FETCH_REAL_ESTATE_ASSETS,
}

export interface IRealEstateActionState {
  warehouses: RealEstateAsset<BuildingType.WAREHOUSE>[];
  factories: RealEstateAsset<BuildingType.FACTORY>[];
}

export const initialRealEstateAssetsState: IRealEstateActionState = {
  warehouses: [],
  factories: [],
};

export const fetchRealEstateAssets = (
  state: IRealEstateActionState,
  assetType: BuildingType,
  assetList: RealEstateAsset<BuildingType>[]
): IRealEstateActionState => {
  if (assetType === BuildingType.WAREHOUSE) {
    return { ...state, warehouses: assetList };
  } else {
    return { ...state, factories: assetList };
  }
};

export const realEstateAssetsReducer = (
  state: IRealEstateActionState = initialRealEstateAssetsState,
  action: IRealEstateAction
): IRealEstateActionState => {
  switch (action.type) {
    case RealEstateAssetsActionTypes.FETCH_REAL_ESTATE_ASSETS:
      const { assetType, assetList } = action.payload;
      return fetchRealEstateAssets(state, assetType, assetList);

    default:
      return state;
  }
};
