import React, { FC, useContext, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { InventoryTable } from 'components/InventoryTable';
import { Inventory } from 'types/Inventory';
import { EditInventoryDialog } from 'components/EditInventoryDialog';
import { AddInventoryDialog } from 'components/AddInventoryDialog';
import { RealEstateAssetsContext } from 'context/RealEstateAssetsContext';
import { BuildingType, RealEstateAsset } from 'types/RealEstateAsset';

const useStyles = makeStyles((theme?: Theme) => ({
  dataGrid: {
    width: '80vw',
  },
  paper: {
    display: 'flex',
    flexFlow: 'row',
    padding: '1.2rem',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '350px',
  },
  formControl: {
    alignItems: 'flex-start',
    marginLeft: 10,
    fontSize: '1.2rem',
  },
  fabAdd: {
    marginLeft: 30,
  },
  fabEdit: {
    marginLeft: 15,
  },
  errorPaper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '38vw',
    padding: 5,
    margin: 5,
  },
}));

export const InventoryPage: FC<{}> = (): JSX.Element => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [openEditInventory, setOpenEditInventory] = useState<boolean>(false);
  const [openAddInventory, setOpenAddInventory] = useState<boolean>(false);

  const realEstateAssets = useContext(RealEstateAssetsContext);

  const classes = useStyles();
  const handleSelectionChange = (event: any) => {
    setSelectedWarehouseId(event.target.value);
  };

  const getInventoryByWarehouseId = async (warehouseId: string) => {
    if (!!warehouseId) {
      setLoading(true);
      return await axios
        .get<Inventory>(
          `http://localhost:3001/warehouses/${warehouseId}/inventory`
        )
        .then((response: AxiosResponse<Inventory>) => {
          setLoading(false);
          return JSON.parse(JSON.stringify(response.data));
        })
        .catch((error: AxiosError) => {
          alert(error);
        });
    }
  };

  useEffect(() => {
    Promise.all([getInventoryByWarehouseId(selectedWarehouseId)]).then(
      ([inventory]) => {
        setInventory(inventory);
      }
    );
  }, [selectedWarehouseId]);

  const handleEditInventory = (): void => {
    setOpenEditInventory(true);
  };

  const handleAddInventory = (): void => {
    setOpenAddInventory(true);
  };

  return (
    <>
      {
        <EditInventoryDialog
          open={openEditInventory}
          setOpen={setOpenEditInventory}
          selectedWarehouseId={selectedWarehouseId}
          loading={loading}
          setLoading={setLoading}
        />
      }
      {
        <AddInventoryDialog
          open={openAddInventory}
          setOpen={setOpenAddInventory}
          selectedWarehouseId={selectedWarehouseId}
          loading={loading}
          setLoading={setLoading}
        />
      }
      <div
        style={{
          width: '80vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} className={classes.paper}>
          <Typography variant='h6'>Select a warehouse by ID:</Typography>
          <FormControl className={classes.formControl} variant='outlined'>
            <InputLabel htmlFor='id-selector'>ID</InputLabel>

            <Select
              color='secondary'
              label='id-selector'
              native
              value={selectedWarehouseId}
              onChange={handleSelectionChange}
            >
              <option value={''}></option>
              {realEstateAssets.warehouses.map(
                (warehouse: RealEstateAsset<BuildingType.WAREHOUSE>) => (
                  <option
                    key={`option-key-id-${warehouse.warehouseId}-${warehouse.warehouseName}`}
                    value={warehouse.warehouseId}
                  >
                    {warehouse.warehouseId}
                  </option>
                )
              )}
            </Select>
          </FormControl>
        </Paper>

        <Fab
          className={classes.fabAdd}
          color='primary'
          onClick={() => handleAddInventory()}
        >
          <AddIcon />
        </Fab>
        <Fab
          className={classes.fabEdit}
          color='secondary'
          onClick={() => handleEditInventory()}
        >
          <CreateIcon />
        </Fab>
      </div>
      <br />
      <>
        {loading ? (
          <CircularProgress color='secondary' />
        ) : !!inventory?.length ? (
          <InventoryTable
            inventory={inventory}
            selectedWarehouseId={selectedWarehouseId}
          />
        ) : (
          <>
            {!!selectedWarehouseId && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={3} className={classes.errorPaper}>
                  <ErrorOutlineIcon fontSize='large' />
                  <Typography variant='h6'>
                    There's inventory for this warehouse!
                  </Typography>
                </Paper>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};
