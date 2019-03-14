import React from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

// @material-ui/core styles
import withStyles from "@material-ui/core/styles/withStyles";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import Info from "@material-ui/icons/Info";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "components/CustomButtons/Button.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import priceImage3 from "assets/img/card-1.jpeg";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import { fetchToVoteProposals, vote } from "utils/apiServices.jsx";

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

class ProposalsToVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      selectedValue: "",
      result: { option: 0, proposal: "" },
      proposals: [],
      alert: null,
      show: false
    };
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    const url = queryString.parse(window.location.search);
    fetchToVoteProposals(url.category).then(rep => {
      this.setState({ proposals: rep });
    });
  }

  handleChange = event => {
    let res = JSON.parse(event.target.value);
    this.setState({ selectedValue: event.target.value, result: res });
  };

  handleVote = () => {
    let data = {
      Option: this.state.result.option,
      proposalId: this.state.result.proposal
    };
    vote(data).then(() => {
      window.location.href = "/proposals"
    });
  };

  successAlert() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ marginTop: "-200px", marginLeft: "-120px" }}
          title="¡Muchas gracias!"
          onConfirm={this.handleVote}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        />
      )
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  render() {
    const { classes } = this.props;
    const { alert, activeStep, selectedValue, proposals, result } = this.state;
    const proposalsList = proposals.map(proposal => (
      <GridItem xs={12} sm={12} md={4} key={proposal.id}>
        <Card product className={classes.cardHover}>
         <CardHeader image className={classes.cardHeaderHover}>
            <img src={priceImage3} alt="..." />
          </CardHeader>
          <CardBody>
            <div className={classes.cardHoverUnder}>
              <Tooltip
                id="tooltip-top"
                title="Favor"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Checkbox
                  tabIndex={-1}
                  checked={
                    selectedValue ===
                    '{"option":1,"proposal":"' + proposal.id + '"}'
                  }
                  onChange={this.handleChange}
                  checkedIcon={
                    <i
                      className={"far fa-thumbs-up " + classes.iconCheckboxIcon}
                    />
                  }
                  icon={
                    <i
                      className={"far fa-thumbs-up " + classes.iconCheckboxIcon}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox
                  }}
                  value={'{"option":1,"proposal":"' + proposal.id + '"}'}
                  aria-label="A"
                />
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Nulo"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Checkbox
                  tabIndex={-1}
                  checked={
                    selectedValue ===
                    '{"option":2,"proposal":"' + proposal.id + '"}'
                  }
                  onChange={this.handleChange}
                  checkedIcon={
                    <i className={"far fa-meh " + classes.iconCheckboxIcon} />
                  }
                  icon={
                    <i className={"far fa-meh " + classes.iconCheckboxIcon} />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox
                  }}
                  value={'{"option":2,"proposal":"' + proposal.id + '"}'}
                  aria-label="B"
                />
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="En contra"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Checkbox
                  tabIndex={-1}
                  checked={
                    selectedValue ===
                    '{"option":0,"proposal":"' + proposal.id + '"}'
                  }
                  onChange={this.handleChange}
                  checkedIcon={
                    <i
                      className={
                        "far fa-thumbs-down " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i
                      className={
                        "far fa-thumbs-down " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox
                  }}
                  value={'{"option":0,"proposal":"' + proposal.id + '"}'}
                  aria-label="C"
                />
              </Tooltip>
            </div>
            <h4 className={classes.cardProductTitle}>{proposal.name}</h4>
            <p className={classes.cardProductDesciprion}>
              {proposal.description}
            </p>
          </CardBody>
          <CardFooter product>
            <div className={classes.price}>
              <h4>
                {proposal.current_votes}/{proposal.max_votes}
              </h4>
            </div>
          </CardFooter>
          {result.proposal === proposal.id ? (
            <CardFooter product>
              <GridContainer justify="center">
                <Button
                  color="info"
                  size="lg"
                  className={classes.marginRight}
                  onClick={this.successAlert.bind(this)}
                >
                  Enviar Voto
                </Button>
              </GridContainer>
            </CardFooter>
          ) : (
            <div />
          )}
        </Card>
      </GridItem>
    ));
    return (
      <div>
        {alert}
        <GridContainer justify="center" style={{ marginBottom: "50px" }}>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>
                <Link to="/vote">Categorías</Link>
              </StepLabel>
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
          {proposals.length === 0 ? (<SnackbarContent
            message={<span>Ya no hay más propuestas por las que votar</span>}
            color="#FFEBCD" icon={Info}
          />) : (<div />)}
          {proposalsList}
        </GridContainer>
      </div>
    );
  }
}
const combinedStyles = combineStyles(dashboardStyle, sweetAlertStyle);
export default withStyles(combinedStyles)(ProposalsToVote);
