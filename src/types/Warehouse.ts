import { IAddress } from 'types/Address';

export interface IWarehouse {
  warehouseId: number;
  warehouseName: string;
  warehouseDescription: string;
  warehouseAddress: IAddress;
}
