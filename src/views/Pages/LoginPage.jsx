import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import AddAlert from "@material-ui/icons/AddAlert";
import logo from "assets/img/logo.png";

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

import { login } from "utils/apiAuth.jsx";

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
      cardAnimaton: "cardHidden",
      password: "",
      passwordState: "",
      email: "",
      emailState: "",
      isToggleOn: false
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    if (
      this.state.passwordState === "success" &&
      this.state.emailState === "success"
    ) {
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      login(data).then(rep => {
          window.location = "/dashboard";
        },
        err => {
        this.showNotification("tc");
      });
    }
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
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Snackbar
          place="tc"
          color="danger"
          icon={AddAlert}
          message="Credenciales incorrectas"
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <div className={classes.socialLine}>
                    <img src={logo} style={{ width: "100px" }} alt="C" />
                    <h3>Convecinos</h3>
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    success={this.state.emailState === "success"}
                    error={this.state.emailState === "error"}
                    labelText={
                      <span>
                        Correo Electrónico <small>(requerido)</small>
                      </span>
                    }
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => this.change(event, "email", "email"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    success={this.state.passwordState === "success"}
                    error={this.state.passwordState === "error"}
                    labelText={
                      <span>
                        Contraseña <small>(requerido)</small>
                      </span>
                    }
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => this.change(event, "password", "length", 1),
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  {this.state.passwordState === "success" &&
                  this.state.emailState === "success" ? (
                    <Button
                      onClick={this.handleClick}
                      color="rose"
                      size="lg"
                      block
                    >
                      Iniciar Sesión
                    </Button>
                  ) : (
                    <div />
                  )}
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

const combinedStyles = combineStyles(loginPageStyle, notificationsStyle);
export default withStyles(combinedStyles)(LoginPage);
