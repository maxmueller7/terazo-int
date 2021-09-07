import { IAddress } from 'types/Address';

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
    [K in `${T}Description`]: String;
  };
