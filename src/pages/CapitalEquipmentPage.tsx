import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IMachine } from 'types/Machine';
import { CircularProgress, Paper } from '@material-ui/core';
import { CapitalEquipmentTable } from 'components/CapitalEquipmentTable';

interface ICapitalEquipmentPageState {
  machines: IMachine[];
  loading: boolean;
}

//leaving this as a class component on purpose.
class CapitalEquipmentPage extends Component {
  state: ICapitalEquipmentPageState = {
    machines: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    //mocking a delay from the back-end to show the spinner
    await setTimeout(() => {
      axios
        .get<IMachine[]>('http://localhost:3001/machines')
        .then((response: AxiosResponse) => {
          this.setState({ machines: response.data });
        })
        .catch((error) => {
          alert(error);
        });
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <CircularProgress color='secondary' />
        ) : (
          <Paper elevation={3}>
            {!!this.state.machines.length && (
              <CapitalEquipmentTable machines={this.state.machines} />
            )}
          </Paper>
        )}
      </>
    );
  }
}
export default CapitalEquipmentPage;
