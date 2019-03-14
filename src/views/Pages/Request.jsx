import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";

import {
  makeRequest,
  cancelRequest,
  validateRequest
} from "utils/apiRequest.jsx";

function combineStyles(...styles) {
  return function CombineStyles(theme) {
    const outStyles = styles.map(arg => {
      // Apply the "theme" object for style functions.
      if (typeof arg === "function") {
        return arg(theme);
      }
      // Objects need no change.
      return arg;
    });

    return outStyles.reduce((acc, val) => Object.assign(acc, val));
  };
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      neighborhoodFlag: false,
      cardAnimaton: "cardHidden",
      codigo: "",
      mensaje: "",
      loading: false
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification(place) {
    if (!this.state[place]) {
      var x = [];
      x[place] = true;
      this.setState(x);
      setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
      );
    }
  }

  handleRequest = () => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos) {
      if (this.state.codigo !== "") {
        let data = {
          //message: this.state.message
        };
        makeRequest(convecinos.userId, this.state.codigo, data).then(() => {
          window.location = "request";
        }, () => {
          this.showNotification("tc");
        })
      }
    } else {
      window.location = "login";
    }
  };

  handleCancel = () => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos) {
      cancelRequest(convecinos.userId).then(() => {
        window.location = "request";
      })
    } else {
      window.location = "login";
    }
  };

  change = (event, stateValue) => {
    if (stateValue === "codigo") {
      this.setState({ [stateValue]: event.target.value });
    }
    if(stateValue === "mensaje") {
      this.setState({ [stateValue]: event.target.value });
    }
  };

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    validateRequest().then(rep => {
      if (rep === 2) {
        window.location = "/dashboard"
      } else if (rep === 1) {
        this.setState({ loading: true });
      }
    });
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

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.container}>
        <Snackbar
          place="tc"
          color="danger"
          icon={AddAlert}
          message="Código inválido"
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              {
                loading ? (
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="rose"
                    >
                      <h4>CONVECINOS</h4>
                    </CardHeader>
                    <CardBody>
                    <GridItem xs={12} sm={12} md={12}>
                        <h3 align="center">Procesando Solicitud...</h3>
                      </GridItem>
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button
                        color="rose"
                        simple
                        size="lg"
                        block
                        onClick={this.handleCancel}
                      >
                        Cancelar Solicitud
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="rose"
                    >
                      <h4>Ingresar Código</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Escribe el código de alguna comunidad"
                        id="codigo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "codigo")
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button
                        color="rose"
                        simple
                        size="lg"
                        block
                        onClick={this.handleRequest}
                      >
                        Solicitar
                      </Button>
                    </CardFooter>
                  </Card>
                )
              }
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

const combinedStyles = combineStyles(loginPageStyle, notificationsStyle);
export default withStyles(combinedStyles)(LoginPage);
