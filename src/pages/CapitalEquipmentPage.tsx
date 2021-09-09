import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IMachine } from 'types/Machine';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { CapitalEquipmentTable } from 'components/CapitalEquipmentTable';
import { RealEstateAsset, BuildingType } from 'types/RealEstateAsset';
import { RealEstateAssetsContext } from 'context/RealEstateAssetsContext';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface ICapitalEquipmentPageState {
  selectedFactory: string;
  machines: IMachine[];
  loading: boolean;
}

//leaving this as a class component on purpose.
class CapitalEquipmentPage extends Component {
  state: ICapitalEquipmentPageState = {
    selectedFactory: '',
    machines: [],
    loading: false,
  };

  static contextType = RealEstateAssetsContext;

  async fetchMachines(factoryId: string) {
    if (!!this.state.selectedFactory) {
      this.setState({ loading: true });
      //mocking a delay from the back-end to show the spinner
      await setTimeout(() => {
        axios
          .get<IMachine[]>(
            `http://localhost:3001/factories/${factoryId}/machines`
          )
          .then((response: AxiosResponse) => {
            this.setState({ machines: response.data });
          })
          .catch((error) => {
            alert(error);
          });
        this.setState({ loading: false });
      }, 1000);
    } else {
      this.setState({ machines: [] });
    }
  }

  handleSelectionChange = async (event: any) => {
    await this.setState({ selectedFactory: event.target.value });
    await this.fetchMachines(this.state.selectedFactory);
  };

  render() {
    return (
      <>
        <div
          style={{
            width: '80vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: 'flex',
              flexFlow: 'row',
              padding: '1.2rem',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '350px',
            }}
          >
            <Typography variant='h6'>Select a factory by ID:</Typography>
            <FormControl
              style={{
                alignItems: 'flex-start',
                marginLeft: 10,
                fontSize: '1.2rem',
              }}
              variant='outlined'
            >
              <InputLabel htmlFor='id-selector'>ID</InputLabel>

              <Select
                color='secondary'
                label='id-selector'
                native
                value={this.state.selectedFactory}
                onChange={this.handleSelectionChange}
              >
                <option value={''}></option>
                {this.context.factories.map(
                  (factory: RealEstateAsset<BuildingType.FACTORY>) => (
                    <option
                      key={`option-key-id-${factory.factoryId}-${factory.factoryName}`}
                      value={factory.factoryId}
                    >
                      {factory.factoryId}
                    </option>
                  )
                )}
              </Select>
            </FormControl>
          </Paper>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          {this.state.loading ? (
            <CircularProgress color='secondary' />
          ) : (
            <>
              {!!this.state.machines.length ? (
                <Paper elevation={3}>
                  <CapitalEquipmentTable machines={this.state.machines} />
                </Paper>
              ) : (
                <>
                  {!!this.state.selectedFactory && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Paper
                        elevation={3}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          width: '38vw',
                          padding: 5,
                          margin: 5,
                        }}
                      >
                        <ErrorOutlineIcon fontSize='large' />
                        <Typography variant='h6'>
                          This factory has no machinery equipment!
                        </Typography>
                      </Paper>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}
export default CapitalEquipmentPage;
