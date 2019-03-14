import React from "react";
import { Link } from "react-router-dom";

// core components
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import GridContainer from "components/Grid/GridContainer.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Button from "components/CustomButtons/Button.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Vote extends React.Component {
  state = {
    activeStep: 0,
    selectedValue: ""
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { selectedValue, activeStep } = this.state;
    const linkTo = "/vote/proposals?category=" + selectedValue;
    return (
      <div>
        <GridContainer justify="center" style={{ marginBottom: "50px" }}>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Categorías</StepLabel>
            </Step>
            <Step>
              <StepLabel>Propuestas</StepLabel>
            </Step>
            <Step>
              <StepLabel>Vota</StepLabel>
            </Step>
          </Stepper>
        </GridContainer>
        <GridContainer justify="center">
          <h4 className={classes.infoText}>Selecciona una categoría</h4>
        </GridContainer>
        <GridContainer justify="center">
          <div className={classes.choiche} style={{ marginRight: "50px" }}>
            <Checkbox
              tabIndex={-1}
              checked={this.state.selectedValue === "5bc75eaa2ded92052b327d1e"}
              onChange={this.handleChange}
              checkedIcon={
                <i className={"fas fa-home " + classes.iconCheckboxIcon} />
              }
              icon={<i className={"fas fa-home " + classes.iconCheckboxIcon} />}
              classes={{
                checked: classes.iconCheckboxChecked,
                root: classes.iconCheckbox
              }}
              value="5bc75eaa2ded92052b327d1e"
              aria-label="A"
            />
            <h6>Comunidad</h6>
          </div>
          <div className={classes.choiche} style={{ marginRight: "50px" }}>
            <Checkbox
              tabIndex={-1}
              checked={this.state.selectedValue === "5bc75eb32ded92052b327d1f"}
              onChange={this.handleChange}
              checkedIcon={
                <i
                  className={"fas fa-shield-alt " + classes.iconCheckboxIcon}
                />
              }
              icon={
                <i
                  className={"fas fa-shield-alt " + classes.iconCheckboxIcon}
                />
              }
              classes={{
                checked: classes.iconCheckboxChecked,
                root: classes.iconCheckbox
              }}
              value="5bc75eb32ded92052b327d1f"
              aria-label="B"
            />
            <h6>Seguridad</h6>
          </div>
          <div className={classes.choiche}>
            <Checkbox
              tabIndex={-1}
              checked={this.state.selectedValue === "5bc75ebd2ded92052b327d20"}
              onChange={this.handleChange}
              checkedIcon={
                <i className={"fas fa-server " + classes.iconCheckboxIcon} />
              }
              icon={
                <i className={"fas fa-server " + classes.iconCheckboxIcon} />
              }
              classes={{
                checked: classes.iconCheckboxChecked,
                root: classes.iconCheckbox
              }}
              value="5bc75ebd2ded92052b327d20"
              aria-label="C"
            />
            <h6>Administración</h6>
          </div>
        </GridContainer>
        {selectedValue ? (
          <GridContainer justify="center" style={{ marginTop: "50px" }}>
            <Link to={linkTo}>
              <Button color="info" size="lg" className={classes.marginRight}>
                Ver propuestas
              </Button>
            </Link>
          </GridContainer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default withStyles(style)(Vote);
