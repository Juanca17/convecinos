import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

// @material-ui/icons
import Announcement from "@material-ui/icons/Announcement";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Add from "@material-ui/icons/Add";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import HowToReg from "@material-ui/icons/HowToReg";
import defaultImage from "assets/img/images.png";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CardWBackground from "components/Card/CardWBackground.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import NeighborsList from "views/Administration/NeighborsList.jsx";
import RequestList from "views/Administration/RequestList.jsx";
import ProposalList from "views/Administration/ProposalList.jsx";

import {
  makeNotice,
  makeTransaction,
  uploadFile,
  changeRulesFile
} from "utils/apiServices.jsx";

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesFile: null,
      imagePreviewUrl: defaultImage,
      Concepto: "",
      Beneficiario: "",
      Monto: "",
      aviso: "",
      startDate: new Date()
    };
    this.SubmitBoton = this.SubmitBoton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.SubmitBotonAviso = this.SubmitBotonAviso.bind(this);
  }

  Change(event, stateName) {
    if (stateName === "Concepto") {
      this.setState({ [stateName]: event.target.value });
    }
    if (stateName === "Beneficiario") {
      this.setState({ [stateName]: event.target.value });
    }
    if (stateName === "Monto") {
      this.setState({ [stateName]: event.target.value });
    }
    //Fecha
    if (stateName === "aviso") {
      this.setState({ [stateName]: event.target.value });
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  SubmitBoton() {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (
      this.state.Concepto !== "" &&
      this.state.Monto !== "" &&
      this.state.Beneficiario !== "" &&
      this.state.startDate !== ""
    ) {
      let data = {
        concept: this.state.Concepto,
        amount: this.state.Monto,
        beneficiary: this.state.Beneficiario,
        issued_date: this.state.startDate,
        neighborhoodId: convecinos.neighborhoodId,
        neighborId: convecinos.userId
      };
      makeTransaction(data).then(()=> {
        window.location = "/Administration"
      });
    }
  }

  SubmitBotonAviso() {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    let data = {
      description: this.state.aviso,
      neighborhoodId: convecinos.neighborhoodId
    };
    console.log("HOORAY", data);
    makeNotice(data).then(() => {
      window.location = "/dashboard";
    })
  }

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
  handleSubmitRules = e => {
    e.preventDefault();
    let data = {};
    uploadFile(this.state.file).then(rep => {
      data.rules_file = rep;
      changeRulesFile(data).then(() => {
        window.location = "/rules";
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { aviso } = this.state;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <NavPills
              color="success"
              alignCenter
              tabs={[
                {
                  tabButton: "Subir Avisos Generales",
                  tabIcon: Announcement,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>Comunicación</h4>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                              inputProps={{
                                onChange: event => this.Change(event, "aviso"),
                                multiline: true,
                                rows: 5
                              }}
                              labelText="Aquí escribe tu aviso."
                              id="aviso"
                              formControlProps={{
                                fullWidth: true
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <center>
                          {aviso ? (
                            <Button
                              onClick={this.SubmitBotonAviso}
                              color="success"
                              size="md"
                              className={classes.marginRight}
                            >
                              Publicar
                            </Button>
                          ) : (
                            <div />
                          )}
                        </center>
                      </CardHeader>
                    </Card>
                  )
                },
                {
                  tabButton: "Lista de Usuarios",
                  tabIcon: AssignmentInd,
                  tabContent: <NeighborsList classes={classes} />
                },
                {
                  tabButton: "Subir Reglamento",
                  tabIcon: NoteAdd,
                  tabContent: (
                    <CardWBackground>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>
                          Reglas de convivencia de los convecinos
                        </h4>
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
                          <h6 className="description">Selecciona un archivo</h6>
                        </div>
                      </CardHeader>
                      <center>
                        <Button
                          color="success"
                          size="md"
                          className={classes.marginRight}
                          onClick={this.handleSubmitRules}
                        >
                          Subir
                        </Button>
                      </center>
                    </CardWBackground>
                  )
                },
                {
                  tabButton: "Añadir Movimiento",
                  tabIcon: Add,
                  tabContent: (
                    <Card>
                      <CardHeader>
                        <h4 className={classes.cardTitle}>Transparencia</h4>
                        <p className={classes.cardCategory}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={11}>
                              <CustomInput
                                inputProps={{
                                  onChange: event =>
                                    this.Change(event, "Concepto")
                                }}
                                labelText="Concepto"
                                id="username"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={11}>
                              <CustomInput
                                inputProps={{
                                  onChange: event =>
                                    this.Change(event, "Beneficiario")
                                }}
                                labelText="Beneficiario"
                                id="username"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={5}>
                              <CustomInput
                                inputProps={{
                                  onChange: event => this.Change(event, "Monto")
                                }}
                                labelText="Monto"
                                id="username"
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <div style={{paddingTop: "40px" }}>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                            </div>
                            </GridItem>
                          </GridContainer>
                        </p>
                        <center>
                          <Button
                            onClick={this.SubmitBoton}
                            color="success"
                            size="md"
                            className={classes.marginRight}
                          >
                            Añadir
                          </Button>
                        </center>
                      </CardHeader>
                    </Card>
                  )
                },
                {
                  tabButton: "Lista de Propuestas",
                  tabIcon: FormatListBulleted,
                  tabContent: <ProposalList classes={classes} />
                },
                {
                  tabButton: "Lista de Solicitudes",
                  tabIcon: HowToReg,
                  tabContent: <RequestList classes={classes} />
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Administration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Administration);
