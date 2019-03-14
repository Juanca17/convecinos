import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import WeatherPanels from "components/WeatherPanels/WeatherPanels.jsx";
import Boards from "./Boards.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Boards />
        <h3>Pronóstico del clima</h3>
        <br />
        <WeatherPanels />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
