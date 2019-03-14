import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { Link } from "react-router-dom";
import { fetchVotedProposals, fetchProposals } from "utils/apiServices.jsx";
import {
  validateCreateProposal,
  validateRepresentant
} from "utils/apiAuth.jsx";

import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

class Proposals extends React.Component {
  state = {
    create: false,
    voted: [],
    approved: [],
    ongoing: []
  };
  componentDidMount() {
    validateRepresentant().then(rep => {
      if (rep) {
        this.setState({ create: true });
      } else {
        validateCreateProposal().then(rep => {
          this.setState({ create: rep });
        });
      }
    });
    fetchProposals(3).then(rep => {
      this.setState({ ongoing: rep });
    });
    fetchProposals(2).then(rep => {
      this.setState({ approved: rep });
    });
    fetchVotedProposals().then(rep => {
      this.setState({ voted: rep });
    });
  }
  render() {
    const { classes } = this.props;
    const { create, voted, approved, ongoing } = this.state;
    return (
      <div>
        <Heading
          textAlign="center"
          title="Propuestas"
          category={
            <span>
              El voto es un derecho. Éste nos da la oportunidad de hacernos
              escuchar y expresar nuestras opiniones, sugerencias e inconformidades.
              Votar consiste en brindar apoyo a una propuesta en forma anónima, pues
              mediante este acto de participación ciudadana que ejercemos de acuerdo
              a nuestros ideales, se define los caminos a seguir por parte de una comunidad.
              Es  por esto que es esencial estar informados sobre las propuestas que se
              encuentran en gestión en la asociación vecinal y ejercer nuestro derecho.
            </span>
          }
        />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4} align="center">
            <Card>
              <CardBody>
                <div className={classes.center}>
                  <h5>
                    Apoya a tu comunidad votando por las propuestas de tus
                    convecinos
                  </h5>
                  <Link to="/vote">
                    <Button
                      color="info"
                      size="lg"
                      className={classes.marginRight}
                    >
                      ¡Vota!
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          {create ? (
            <GridItem xs={12} sm={12} md={4} align="center">
              <Card>
                <CardBody>
                  <div className={classes.center}>
                    <h5>
                      Es momento de crear una propuesta para mejorar tu comunidad.
                    </h5>
                    <Link to="/CreateProposal">
                      <Button
                        color="info"
                        size="lg"
                        className={classes.marginRight}
                      >
                        ¡Crear Propuesta!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          ) : (
            <div />
          )}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} align="left">
            <Card>
              <CardHeader color="primary" text>
                <CardText color="primary">
                  <h4 className={classes.cardTitleWhite}>Aprobadas</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  tableHeaderColor="warning"
                  tableHead={["Nombre", "Categoría", "Autor", "Votos"]}
                  tableData={approved}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} align="right">
            <Card>
              <CardHeader color="primary" text>
                <CardText color="primary">
                  <h4 className={classes.cardTitleWhite}>En Gestión</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  tableHeaderColor="warning"
                  tableHead={["Nombre", "Categoría", "Autor", "Votos"]}
                  tableData={ongoing}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {voted.length ? (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} align="center">
              <Card>
                <CardHeader color="primary" text>
                  <CardText color="primary">
                    <h4 className={classes.cardTitleWhite}>Tus votos</h4>
                  </CardText>
                </CardHeader>
                <CardBody>
                  <Table
                    hover
                    tableHeaderColor="warning"
                    tableHead={["Nombre", "Descripción", "Votos", "Decisión"]}
                    tableData={voted}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        ) : (
          <div/>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Proposals);
