import React from "react";
import { Document, Page } from "react-pdf";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { fetchNeighborhoodRules } from "utils/apiServices.jsx"

const style = {
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class Rules extends React.Component {
  state = {
    rules: "",
    numPages: 1,
    pageNumber: 1
  };

  componentDidMount() {
    fetchNeighborhoodRules().then(rep => {
      this.setState({ rules: rep });
    });
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  previousPage = () => {
    if (this.state.pageNumber > 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  };

  nextPage = () => {
    if (this.state.pageNumber < this.state.numPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
  };

  render() {
    const { pageNumber, numPages, rules } = this.state;
    const { classes } = this.props;
    console.log(rules);
    return (
      <div>
        <Heading
          textAlign="center"
          title="Reglamento"
          category={
            <span>
              El conglomerado de normas que forman el reglamento de una organización vecinal
              es indispensable, ya que no todas las personas funcionamos o pensamos de la misma
              manera y es mejor tener por escrito aquellas reglas que se consideran fundamentales
              para el ejercicio de una convivencia plena, pacifica y satisfactoria entre las
              personas que cohabitan un espacio determinado.
            </span>
          }
        />
        <GridContainer align="center">
          <GridItem xs={12} sm={12} md={12}>
            <Document
              file={rules}
              onLoadSuccess={this.onDocumentLoad}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <br />
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Button className={classes.marginRight} onClick={this.previousPage}>
              <KeyboardArrowLeft className={classes.icons} /> Atrás
            </Button>
            <Button className={classes.marginRight} onClick={this.nextPage}>
              Siguiente <KeyboardArrowRight className={classes.icons} />
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(style)(Rules);
