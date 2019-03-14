import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import { validateAccess } from "utils/apiAuth.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  handleClick = () => {
    validateAccess().then(() => {
        window.location = "/dashboard";
      },
      () => {
        window.location = "/pages/login";
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={10}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>TÉRMINOS Y CONDICIONES</h4>
                </CardHeader>
                <CardBody>
                  <h3>INFORMACIÓN IMPORTANTE</h3>
                  <p align="justify">
                    Convecinos se reserva el derecho a exigir que cada usuario
                    acepte y cumpla los términos aquí expresados como condición
                    previa y necesaria para el acceso y utilización de los
                    servicios y/o contenido brindado por el sitio. Por lo que al
                    acceder y/o crear una cuenta en Convecinos aceptas los
                    términos y condiciones descritos en esta página o documento.
                  </p>
                  <p align="justify">
                    El usuario que no acepte, se halle en desacuerdo o
                    incurriera en el incumpliemiento de las disposiciones fijas
                    por Convecinos en estas condiciones generales, no contará
                    con la autorización para el uso de los servicios y contenido
                    que existe o pueda existir en el sitio.
                  </p>
                  <p align="justify">
                    Los términos y condiciones de Convecions aquí descritos
                    pueden sufrir modificaciones sin previo aviso, estar
                    revisando este documento con constancia.
                  </p>
                  <h3>LICENCIA</h3>
                  <p align="justify">
                    Conveciones es de uso gratuito y de código abierto.
                  </p>
                  <p align="justify">
                    Solo podrá existir una cuenta ligada a un correo electrónico
                    que el usuario haya dado de alta para poder hacer uso de los
                    servicios del portal. Queda prohibido crear cuentas
                    impostoras/falsas.
                  </p>
                  <h3>CONDICIONES DE USO</h3>
                  <p align="justify">
                    La plataforma Convecinos es de uso gratuito y está
                    completamente deslindado de cualquier entidad gubernamental,
                    a su vez este es un proyecto open source por lo que su
                    código estará presente en github.
                  </p>
                  <h3>MODIFICACIONES</h3>
                  <p align="justify">
                    La plataforma y/o su contenido puede sufrir modificaciones,
                    las cuales serán notificadas a los usuarios registrados
                    dentro de la plataforma, una vez se hayan hecho, vía correo
                    electrónico.
                  </p>
                  <h3>OBLIGACIONES DE USUARIO</h3>
                  <p align="justify">
                    El usuario deberá respetar en todo momento los términos y
                    condiciones establecidos en las presentes condiciones
                    generales de uso del portal. De forma expresa el usuario
                    manifiesta que utilizará el portal de forma diligente y
                    asumiendo cualquier responsabilidad que pudiera derivarse
                    del incumplimiento de las normas.
                  </p>
                  <p align="justify">
                    La reimpresión, publicación, distribución y venta de
                    cualquier información que aparezca en Convecinos para
                    cualquier uso distinto al personal no comercial se le será
                    prohibido al usuario a menos de que cuente con la
                    autorización previa de Convecinos .
                  </p>
                  <h3>RESPONSABILIDAD DEL PORTAL</h3>
                  <p align="justify">
                    El usuario conoce y acepta que el portal no otorga ninguna
                    garantía de cualquier naturaleza, ya sea expresa o
                    implícita, sobre los datos, contenidos, información y
                    servicios que se incorporan y ofrecen desde el portal.
                  </p>
                  <h3>PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
                  <p align="justify">
                    Todos los contenidos, marcas, logos o cualquier otro
                    elemento susceptible de protección por la legislación de
                    propiedad intelectual o industrial, que sean accesibles en
                    el portal corresponden exclusivamente a la empresa o a sus
                    legítimos titulares y queda expresamente reservados todos
                    los derechos sobre los mismos.
                  </p>
                  <p align="justify">
                    En cualquier caso, el portal se reserva todos los derechos
                    sobre los contenidos, información de datos y servicios que
                    ostente sobre los mismos.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    onClick={this.handleClick}
                    color="rose"
                    size="lg"
                    block
                  >
                    Convecinos App
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
