import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IMachine } from 'types/Machine';
import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DataTable from 'components/DataTable';

//leaving this as a class component on purpose.
interface ICapitalEquipmentPageState {
  machines: IMachine[];
  loading: boolean;
}

const getTableHeaders = (machine: IMachine): string[] => {
  let tableHeaders: string[] = [];
  if (machine !== null && machine !== undefined) {
    tableHeaders = Object.keys(machine).map((header) => {
      return header.replace(/([a-z])([A-Z])/g, '$1 $2');
    });

    return tableHeaders;
  } else {
    return [];
  }
};

class CapitalEquipmentPage extends Component {
  state: ICapitalEquipmentPageState = {
    machines: [],
    loading: true,
  };
  async componentDidMount() {
    //mocking a delay from the back-end to show the spinner
    await setTimeout(() => {
      axios
        //   .get<Machine[]>('http://localhost:3000/warehouses')
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
          // <TableContainer component={Paper}>
          //   <Table>
          //     <TableHead>
          //       <TableRow>
          //         {getTableHeaders(this.state.machines[0]).map(
          //           (header: string, idx: number) => (
          //             <TableCell
          //               align={idx === 0 ? 'left' : 'right'}
          //               key={`table-cell-header-key-${header}`}
          //             >
          //               {header.toUpperCase()}
          //             </TableCell>
          //           )
          //         )}
          //       </TableRow>
          //     </TableHead>
          //     <TableBody>
          //       {this.state.machines.map((machine: IMachine) => (
          //         <TableRow key={`table-row-key-${machine.machineId}`}>
          //           {Object.values(machine).map((value: any, idx: number) => (
          //             <TableCell
          //               align={idx === 0 ? 'left' : 'right'}
          //               key={`table-cell-values-key-${value}${idx}`}
          //             >
          //               {value}
          //             </TableCell>
          //           ))}
          //         </TableRow>
          //       ))}
          //     </TableBody>
          //   </Table>
          // </TableContainer>
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
