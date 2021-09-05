import { IAddress } from 'types/Address';

export interface IFactory {
  factoryId: number;
  factoryName: string;
  factoryAddres: IAddress;
  factoryDescription: string;
}
