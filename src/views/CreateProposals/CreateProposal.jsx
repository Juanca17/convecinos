import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Loupe from "@material-ui/icons/Loupe";

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

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { createProposal } from "utils/apiServices.jsx";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: "22px",
    color: "#AAAAAA !important",
    fontSize: "1em",
    fontWeight: 400
  },
  customLabelPos:{
    position: "absolute",
    marginLeft: "7px"
  }
});

class CreateProposal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        NombrePropuesta: "",
        Descripcion: "",
        age: "",
        open: false,
        isToggle: false

      };

    this.ProponerBoton = this.ProponerBoton.bind(this);
  }

    Change(event, stateName){

      if(this.state.NombrePropuesta!=="" &&
      this.state.Descripcion!==""&&
      this.state.age!==""){
        this.setState({ isToggle: true });
      }else{
        this.setState({ isToggle: false });
      }
        if(stateName==="NombrePropuesta"){
            this.setState({ [stateName]: event.target.value });
        }

        if(stateName==="Descripcion"){
            this.setState({ [stateName]: event.target.value });
        }
        if(stateName==="age"){
          this.setState({ [stateName]: event.target.value });
      }
    }

  ProponerBoton() {
    let data = {
      name: this.state.NombrePropuesta,
      description: this.state.Descripcion,
      categoryId: this.state.age
    }
    createProposal(data).then(() => {
      window.location = "/proposals"
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <form >
          <GridContainer  >
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <Loupe />
                  </CardIcon>
                  <h4 className={classes.cardTitle}>
                    ¡Convecino!, ayudanós a mejorar.
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        inputProps={{
                            onChange: event => this.Change(event, "NombrePropuesta"),
                        }}
                        labelText="Nombre de la propuesta"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>

                        <label className={classes.customLabelPos}>Selecciona una Categoría</label>
                    <FormControl className={classes.formControl}>
                      <Select
                          inputProps={{
                            onChange: event => this.Change(event, "age"),
                        }}
                        value={this.state.age}
                        onChange={this.handleChange}
                        displayEmpty
                        name="age"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={"5bc75eaa2ded92052b327d1e"}>Comunidad</MenuItem>
                        <MenuItem value={"5bc75eb32ded92052b327d1f"}>Seguridad</MenuItem>
                        <MenuItem value={"5bc75ebd2ded92052b327d20"}>Administración</MenuItem>
                      </Select>
                    </FormControl>

                        </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        inputProps={{
                            onChange: event => this.Change(event, "Descripcion"),
                            multiline: true,
                            rows: 2
                        }}
                        labelText="Descripción de la propuesta."
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}

                      />
                    </GridItem>
                  </GridContainer>
                      {
                        this.state.isToggle ? (
                          <Button onClick={this.ProponerBoton} color="rose" className={classes.updateProfileButton} >
                          Crear Propuesta
                        </Button>
                        ) : (
                          <div></div>
                        )

                      }
                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>

          </GridContainer>
        </form>
      </div>
    );
  }
}

CreateProposal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateProposal);
