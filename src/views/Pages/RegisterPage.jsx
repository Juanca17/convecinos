import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import logo from "assets/img/logo.png";

// @material-ui/icons
import Extension from "@material-ui/icons/Extension";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { register } from "utils/apiAuth.jsx";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      checked: [],
      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      email: "",
      emailState: "",
      password: "",
      passwordState: "",
      isToggleOn: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  handleClick() {
    if (
      this.state.firstNameState === "success" &&
      this.state.lastNameState === "success" &&
      this.state.passwordState === "success" &&
      this.state.emailState === "success" &&
      this.state.isToggleOn
    ) {
      let data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      register(data).then(() => {
        window.location = "/request";
      })
    }
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

  ToggleCheck() {
    this.setState({ isToggleOn: !this.state.isToggleOn });
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
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <center>
                <img src={logo} style={{ width: "100px" }} alt="C" />
              </center>
              <h2 className={classes.cardTitle}>Unirte a Convecinos</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Comunidad"
                      description="Mejora la cálidad de tu comunidad al participar activamente en los eventos y noticias que suceden dentro de ella."
                      icon={Extension}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Transparencia"
                      description="Exige tu derecho a la rendición de cuentas, y revisa los movimientos que se hacen en tu comunidad."
                      icon={AccountBalance}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Convecinos"
                      description="Conoce las preocupaciones de tus Convecinos, únete a su causa o alza la voz."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <form className={classes.form}>
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        id="firstName"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "firstName", "length", 1),
                          placeholder: "Nombre(s)"
                        }}
                      />
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        id="lastName"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "lastName", "length", 1),
                          placeholder: "Apellidos"
                        }}
                      />
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "email", "email"),
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Correo electrónico"
                        }}
                      />
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "password", "length", 1),
                          type: "password",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Contraseña"
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.ToggleCheck()}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        label={
                          <span>
                            Acepto los{" "}
                            <a href="/pages/terms">términos y condiciones</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        {this.state.isToggleOn ? (
                          <Button onClick={this.handleClick} color="primary">
                            Registrar
                          </Button>
                        ) : (
                          <div />
                        )}
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
