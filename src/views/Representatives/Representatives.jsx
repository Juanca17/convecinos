import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import defaultImage from "assets/img/default-avatar.png";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { fetchRepresentatives } from "utils/apiServices.jsx";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

class Representatives extends React.Component {
  state = {
    representatives: []
  };
  componentDidMount() {
    fetchRepresentatives().then(rep => {
      this.setState({ representatives: rep });
    });
  }
  render() {
    const { classes } = this.props;
    const { representatives } = this.state;
    return (
      <div>
        <Heading
          textAlign="center"
          title="Representantes"
          category={
            <span>
              La representación legal de una asociación es de suma importancia.
              Es por eso que los comités de colonos son una clave especial, ya que
              facilitan y  transmiten los objetivos y obstáculos de una asociación
              vecinal internamente como externamente. Con el propósito de mejorar
              la calidad de vida en las colonias, mediante la participación activa
              en las asociaciones vecinales.
            </span>
          }
        />
        <GridContainer>
          {representatives.map((item, i) =>
            <GridItem xs={12} sm={12} md={4} key={i}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {item.profile_img ? (
                      <img src={item.profile_img} alt="..." />
                    ) : (
                      <img src={defaultImage} alt="..." />
                    )}
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>{item.position}</h6>
                  <h4 className={classes.cardTitle}>{item.first_name} {item.last_name}</h4>
                  <a href={`mailto:${item.email},`}>
                    <Button color="github" simple>
                      <Email /> {item.email}
                    </Button>
                  </a>
                </CardBody>
              </Card>
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Representatives);
