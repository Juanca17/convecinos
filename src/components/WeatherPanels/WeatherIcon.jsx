import React from "react";
import PropTypes from "prop-types";

class WeatherIcon extends React.Component {
  render() {
    return (
      <img
        src={"http://openweathermap.org/img/w/" + this.props.status + ".png"}
        alt={this.props.status}
      />
    );
  }
}
WeatherIcon.propTypes = {
  status: PropTypes.string.isRequired
};
export default WeatherIcon;
