import React from "react";

import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import VoiceOverOff from "@material-ui/icons/VoiceOverOff";

// core components
import CardWBackground from "components/Card/CardWBackground.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import { fetchNeighbors, toggleRepresentant } from "utils/apiServices.jsx";

class NeighborsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    fetchNeighbors().then(rep => {
      const neighbors = rep;
      let length = neighbors.length;
      let array = [];
      for (let i = 0; i < length; i++) {
        if (neighbors[i].id !== convecinos.userId) {
          let button = neighbors[i].representant ? [
                <Button
                  key={2}
                  color={"danger"}
                  onClick={() => this.handleToggle(neighbors[i].id, false)}
                >
                  <VoiceOverOff />
                </Button>
              ]
            : [
                <Button
                  key={1}
                  color={"success"}
                  onClick={() => this.handleToggle(neighbors[i].id, true)}
                >
                  <RecordVoiceOver />
                </Button>
              ];
          let cell = new Array(
            neighbors[i].first_name + " " + neighbors[i].last_name,
            neighbors[i].email,
            button
          );
          array[i] = cell;
        }
      }
      this.setState({ list: array });
    });
  }

  handleToggle = (id, toggle) => {
    toggleRepresentant(id, toggle).then(()=> {
      window.location = "/Administration"
    });
  };

  render() {
    const { classes } = this.props;
    const { list } = this.state;
    return (
      <CardWBackground>
        <CardHeader>
          <h4 className={classes.cardTitle}>Convecinos en esta comunidad</h4>
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

export default NeighborsList;
