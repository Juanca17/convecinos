import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

class Terms extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
          <p>Terms</p>
      </div>
    );
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Terms);
