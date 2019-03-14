import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

import defaultImage from "assets/img/default-avatar.png";

import {
  fetchNeighborInfo,
  editProfileInfo,
  uploadFile
} from "utils/apiServices.jsx";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      first_name: "",
      last_name: "",
      about: "",
      profile_img: "",
      file: null,
      imagePreviewUrl: defaultImage
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetchNeighborInfo().then(rep => {
      this.setState({
        loading: false,
        email: rep.email,
        first_name: rep.first_name,
        last_name: rep.last_name,
        about: rep.about,
        profile_img: rep.profile_img
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      about: this.state.about
    };
    if (this.state.file) {
      uploadFile(this.state.file).then(rep => {
        data.profile_img = rep;
        editProfileInfo(data).then(() => {
          this.setState({ loading: false });
          fetchNeighborInfo().then(rep => {
            this.setState({
              loading: false,
              email: rep.email,
              first_name: rep.first_name,
              last_name: rep.last_name,
              about: rep.about,
              profile_img: rep.profile_img
            });
          });
        });
      });
    } else {
      editProfileInfo(data).then(() => {
        this.setState({ loading: false });
        fetchNeighborInfo().then(rep => {
          this.setState({
            loading: false,
            email: rep.email,
            first_name: rep.first_name,
            last_name: rep.last_name,
            about: rep.about,
            profile_img: rep.profile_img
          });
        });
      });
    }
  };

  change = (event, stateValue) => {
    if (stateValue === "email") {
      this.setState({ [stateValue]: event.target.value });
    } else if (stateValue === "first_name") {
      this.setState({ [stateValue]: event.target.value });
    } else if (stateValue === "last_name") {
      this.setState({ [stateValue]: event.target.value });
    } else if (stateValue === "about") {
      this.setState({ [stateValue]: event.target.value });
    }
  };
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { classes } = this.props;
    const { loading, email, first_name, last_name, about, profile_img } = this.state;
    return (
      <div>
        <form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Tu perfil - <small>Completa o Edita tu perfil.</small>
                  </h4>
                </CardHeader>
                <CardBody>
                  {
                    loading ? (
                      <CircularProgress className={classes.progress} />
                    ) : (
                      <div>
                        <GridContainer>
                          <GridItem xs={12} sm={4}>
                            <div className="picture-container">
                              <div className="picture">
                                <img
                                  src={this.state.imagePreviewUrl}
                                  className="picture-src"
                                  alt="..."
                                />
                                <input
                                  type="file"
                                  onChange={e => this.handleImageChange(e)}
                                />
                              </div>
                              <h6 className="description">Choose Picture</h6>
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Correo electrónico"
                              id="email"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => this.change(event, "email"),
                                placeholder: email
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Nombre"
                              id="first_name"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => this.change(event, "first_name"),
                                placeholder: first_name
                              }}
                              />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Apellidos"
                              id="last_name"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => this.change(event, "last_name"),
                                placeholder: last_name
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                              labelText="Escribe un texto corto para que la gente sepa quién eres..."
                              id="about"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: event => this.change(event, "about"),
                                placeholder: about
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </div>
                    )
                  }
                  <Button color="rose" className={classes.updateProfileButton} onClick={this.handleSubmit}>
                    Actualizar Perfil
                  </Button>
                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  {profile_img ? (
                    <img src={profile_img} alt="..." />
                  ) : (
                    <img src={defaultImage} alt="..." />
                  )}
                </CardAvatar>
                <CardBody profile>
                  <h4 className={classes.cardTitle}>{first_name} {last_name}</h4>
                  <p className={classes.description}>{about}</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(userProfileStyles)(Profile);
