import { IAddress } from 'types/Address';

export enum RealEstateEndpoints {
  FACTORIES = 'factories',
  WAREHOUSES = 'warehouses',
}

export enum BuildingType {
  WAREHOUSE = 'warehouse',
  FACTORY = 'factory',
}

export type RealEstateAsset<T extends BuildingType> = {
  [K in `${T}Id`]: number;
} &
  {
    [K in `${T}Name`]: string;
  } &
  {
    [K in `${T}Address`]: IAddress;
  } &
  {
    [K in `${T}Description`]: string;
  };
