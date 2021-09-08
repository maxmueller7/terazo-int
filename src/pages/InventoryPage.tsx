import {
  FormControl,
  makeStyles,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { IInventory } from 'types/Inventory';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
  },
  formControl: {
    display: 'flex',
    flexFlow: 'row',
    padding: 3,
  },
  select: {
    marginLeft: 10,
    fontSize: '1.2rem',
  },
}));

export const InventoryPage: FC<{}> = (): JSX.Element => {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number>(0);
  const classes = useStyles();
  const handleSelectionChange = (event: any) => {
    setSelectedWarehouseId(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <Typography variant='h6'>Select a Factory by ID:</Typography>
        <Select
          className={classes.select}
          native
          value={selectedWarehouseId}
          onChange={handleSelectionChange}
        >
          <option value={0}>All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </Select>
      </FormControl>
    </>
  );
};
