import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import SwapHoriz from "@material-ui/icons/SwapHoriz";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { fetchExpenses } from "utils/apiServices.jsx";

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

class Transparency extends React.Component {
  state = {
    expenses: []
  };
  componentDidMount() {
    fetchExpenses().then(rep => {
      this.setState({ expenses: rep });
    });
  }
  render() {
    const { classes } = this.props;
    const { expenses } = this.state;
    return (
      <div>
        <Heading
          textAlign="center"
          title="Rendición de Cuentas"
          category={
            <span>
              Generar transparencia es el objetivo de la rendición de cuentas, 
              como también generar condiciones de confianza entre representantes 
              y miembros de la asociación mediante los mecanismos de rendición 
              de cuentas que permiten obtener con mayor facilidad información 
              sobre la gestión de los representantes y sus resultados; dando 
              margen a que que los comités representativos tomen mejores decisiones, 
              incrementando la efectividad y legitimidad de su ejercicio.
            </span>
          }
        />
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <SwapHoriz />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Últimos movimientos del mes
                </h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Responsable",
                    "Concepto",
                    "Beneficiario",
                    "Monto",
                    "Fecha"
                  ]}
                  tableData={expenses}
                  coloredColls={[3]}
                  colorsColls={["primary"]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Transparency.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Transparency);
