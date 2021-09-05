import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IMachine } from 'types/Machine';
import { CircularProgress, Container } from '@material-ui/core';
import DataTable from 'components/DataTable';

//leaving this as a class component on purpose.
interface ICapitalEquipmentPageState {
  machines: IMachine[];
  loading: boolean;
}

class CapitalEquipmentPage extends Component {
  state: ICapitalEquipmentPageState = {
    machines: [],
    loading: true,
  };
  async componentDidMount() {
    //mocking a delay from the back-end to show the spinner
    await setTimeout(() => {
      axios
        .get<IMachine[]>('http://localhost:3001/machines')
        .then((response: AxiosResponse) => {
          this.setState({ machines: response.data });
        });
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        {this.state.loading ? (
          <CircularProgress color='secondary' />
        ) : (
          <>
            {!!this.state.machines.length && (
              <DataTable T={this.state.machines} />
            )}
          </>
        )}
      </Container>
    );
  }
}
export default CapitalEquipmentPage;
