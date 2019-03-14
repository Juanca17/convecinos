import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";

// core components
import Button from "components/CustomButtons/Button";

import pagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";

import { validateAccess } from "utils/apiAuth.jsx";

const pagesRoutes = [
  {
    path: "/pages/register",
    name: "Register Page",
    short: "Registrar",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login",
    name: "Iniciar Sesión",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  }
];

class PagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      auth: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  componentDidMount() {
    validateAccess().then(rep => {
      if (rep) {
        this.setState({ auth: rep });
      } else {
        this.setState({ auth: false });
      }
    });
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }
  render() {
    const { classes, color } = this.props;
    const { auth } = this.state;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    var list = (
      <List className={classes.list}>
        {
          auth ? (
            <ListItem className={classes.listItem}>
              <NavLink to={"/dashboard"} className={classes.navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText
                  primary={"Tablero"}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          ) : (
            <div />
          )
        }
        {pagesRoutes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [" " + classes.navLinkActive]: this.activeRoute(prop.path)
            });
          return (
            <ListItem key={key} className={classes.listItem}>
              <NavLink to={prop.path} className={navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.short}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex} />
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                MD Pro React
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

PagesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(pagesHeaderStyle)(PagesHeader);
