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
                  <h4 className={classes.cardTitle}>
                    POLÍTICA DE PRIVACIDAD DE DATOS
                  </h4>
                </CardHeader>
                <CardBody>
                  <h3>INFORMACIÓN GENERAL</h3>
                  <p align="justify">
                    La página Convecinos, es la responsable del tratamiento de
                    los datos personales que nos proporcione, los cuales serán
                    protegidos conforme a lo dispuesto por la Ley General de
                    Protección de Datos Personales en Posesión de Sujetos
                    Obligados, publicada en el Diario Oficial de la Federación
                    el 26 de enero de 2017, y demás normatividad que resulte
                    aplicable, en cumplimiento de su artículo 27 se da a el
                    presente AVISO DE PRIVACIDAD SIMPLIFICADO PARA EL SITIO WEB
                    DE CONVECINOS Y TODA LA INFORMACIÓN PUBLICADA BAJO EL NOMBRE
                    O DOMINIO www.convecinos.com.mx, en los términos siguientes:
                  </p>
                  <article>
                    <section>
                      <h3>I. La denominación del responsable;</h3>
                      <p align="justify">
                        La Autoridad Responsable es Convecinos
                      </p>
                    </section>
                    <section>
                      <h3>
                        II. Las finalidades del tratamiento para las cuales se
                        obtienen los datos personales, distinguiendo aquéllas
                        que requieran consentimiento del titular;
                      </h3>
                      <p align="justify">
                        La información que nos proporcione sus datos personales
                        mediante el llenado de formularios publicados en esta
                        página, puede ser incluida dentro de los informes que se
                        elaboran para el seguimiento de avances de Convecino,
                        los cuales serán meramente estadísticos y no incluirán
                        información que permita identificarle en lo individual.
                      </p>
                      <p align="justify">
                        Convecinos se compromete a su personal que tiene acceso
                        a datos personales en el ejercicio de sus funciones o
                        intervención en cualquier fase del tratamiento, a
                        mantener confidencialidad respecto de dicha información.
                      </p>
                      <p align="justify">
                        Los datos personales que se ingresen en los formularios
                        de contacto, no serán difundidos, distribuidos o
                        comercializados.
                      </p>
                    </section>
                    <section>
                      <h3>
                        III. Cuando se realicen transferencias de datos
                        personales que requieran consentimiento, se deberá
                        informar:
                      </h3>
                      <h5>
                        a) Las autoridades, poderes, entidades, órganos y
                        organismos gubernamentales de los tres órdenes de
                        gobierno y las personas físicas o morales a las que se
                        transfieren los datos personales, y
                      </h5>
                      <p align="justify">
                        Únicamente podrán ser proporcionados a terceros si se
                        cumplen los supuestos establecidos al efecto en los
                        artículos en los artículos 22, 65, 66 y 70 de la Ley
                        General de Protección de Datos Personales en Posesión de
                        Sujetos Obligados de la Ley Federal de Transparencia y
                        Acceso a la Información Pública Gubernamental, para lo
                        cual, Convecinos se compromete a tratar dicha
                        información, de conformidad con los principios de
                        principios de licitud, finalidad, lealtad,
                        consentimiento, calidad, proporcionalidad, información y
                        responsabilidad en el tratamiento de datos personales.
                      </p>
                      <h5>b) Las finalidades de estas transferencias;</h5>
                      <p align="justify">
                        Se informa que no se realizarán transferencias de datos
                        personales, salvo aquéllas que sean necesarias para
                        atender requerimientos de información de una autoridad
                        competente, que estén debidamente fundados y motivados.
                      </p>
                      <h5>
                        c) Los mecanismos y medios disponibles para que el
                        titular, en su caso, pueda manifestar su negativa para
                        que el tratamiento de sus datos personales para
                        finalidades y transferencias de datos personales que
                        requieran el consentimiento del titular, y
                      </h5>
                      <p align="justify">
                        Para que Usted pueda manifestar su negativa para el
                        tratamiento de sus datos personales para finalidades y
                        transferencias de datos personales que requieren el
                        consentimiento del titular, podrá acudir al DOMICILIO
                        OFICIAL DE LA UNIDAD DE TRANSPARENCIA que se localiza en
                        Av. Paseo de la Reforma 476, Col. Juárez, Cuauhtémoc,
                        Distrito Federal, México, C.P. 06600; cuenta con un
                        HORARIO DE ATENCIÓN de 8:00 a 19:00 horas y como
                        TELÉFONO DE ATENCIÓN 52113011, Ext. 10588, donde se le
                        indicarán los pasos a seguir para tal efecto.
                      </p>
                    </section>
                  </article>
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
