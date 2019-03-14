import React from "react";

import Done from "@material-ui/icons/Done";
import Build from "@material-ui/icons/Build";
import Delete from "@material-ui/icons/Delete";

// core components
import CardWBackground from "components/Card/CardWBackground.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import { fetchAllProposals, toggleProposal } from "utils/apiServices.jsx";

class ProposalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    fetchAllProposals().then(rep => {
      const proposals = rep;
      let length = proposals.length;
      let array = [];
      for (let i = 0; i < length; i++) {
        let button = [
          <Button
            key={2}
            color={"danger"}
            onClick={() => this.handleToggle(proposals[i].id, 0)}
          >
            <Delete />
          </Button>
        ];
        if (proposals[i].status === 1) {
          button = [
            <Button
              key={1}
              color={"success"}
              onClick={() => this.handleToggle(proposals[i].id, 2)}
            >
              <Done />
            </Button>,
            <Button
              key={2}
              color={"danger"}
              onClick={() => this.handleToggle(proposals[i].id, 0)}
            >
              <Delete />
            </Button>
          ];
        } else if (proposals[i].status === 2) {
          button = [
            <Button
              key={2}
              color={"info"}
              onClick={() => this.handleToggle(proposals[i].id, 3)}
            >
              <Build />
            </Button>,
            <Button
              key={2}
              color={"danger"}
              onClick={() => this.handleToggle(proposals[i].id, 0)}
            >
              <Delete />
            </Button>
          ];
        }
        let cell = new Array(
          proposals[i].name,
          proposals[i].description,
          proposals[i].current_votes + "/" + proposals[i].max_votes,
          button
        );
        array[i] = cell;
      }
      this.setState({ list: array });
    });
  }

  handleToggle = (id, toggle) => {
    toggleProposal(id, toggle).then(()=> {
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
            tableHead={["Nombre", "Descripción", "Votos", "Acciones"]}
            tableData={list}
          />
        </CardHeader>
      </CardWBackground>
    );
  }
}

export default ProposalList;
