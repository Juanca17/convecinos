import React from "react";

import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";

// core components
import CardWBackground from "components/Card/CardWBackground.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import { fetchNeighborsRequest } from "utils/apiServices.jsx";
import { acceptRequest, cancelRequest } from "utils/apiRequest.jsx";

class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    fetchNeighborsRequest().then(rep => {
      const requests = rep;
      let length = requests.length;
      let array = [];
      for (let i = 0; i < length; i++) {
        // eslint-disable-next-line
        let cell = new Array(
          requests[i].neighbor.first_name +
            " " +
            requests[i].neighbor.last_name,
          requests[i].neighbor.email,
          [
            <Button
              key={1}
              color={"success"}
              onClick={() => this.handleAccept(requests[i].neighbor.id)}
            >
              <Done />
            </Button>,
            <Button
              key={2}
              color={"danger"}
              onClick={() => this.handleCancel(requests[i].neighbor.id)}
            >
              <Close />
            </Button>
          ]
        );
        array[i] = cell;
      }
      this.setState({ list: array });
    });
  }

  handleAccept = id => {
    acceptRequest(id).then(()=> {
      window.location = "/Administration"
    });
  };

  handleCancel = id => {
    cancelRequest(id).then(()=> {
      window.location = "/Administration"
    });
  };

  render() {
    const { classes } = this.props;
    const { list } = this.state;
    return (
      <CardWBackground>
        <CardHeader>
          <h4 className={classes.cardTitle}>Solicitudes</h4>
          <Table
            hover
            tableHeaderColor="warning"
            tableHead={["Nombre", "Correo", "Acción"]}
            tableData={list}
          />
        </CardHeader>
      </CardWBackground>
    );
  }
}

export default RequestList;
