import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import Terms from "views/Pages/Terms.jsx";
import Privacy from "views/Pages/Privacy.jsx";
import Request from "views/Pages/Request.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Security from "@material-ui/icons/Security";

const pagesRoutes = [
  {
    path: "/pages/register",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/pages/terms",
    name: "Términos y Condiciones",
    short: "Terms",
    mini: "TC",
    icon: InsertDriveFile,
    component: Terms
  },
  {
    path: "/pages/privacy",
    name: "Privacidad de Datos",
    short: "Privacy",
    mini: "PR",
    icon: Security,
    component: Privacy
  },
  {
    path: "/pages/request",
    name: "Solicitar Acceso",
    short: "Request",
    mini: "RQ",
    icon: Security,
    component: Request
  },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/login",
    name: "Register Page"
  }
];

export default pagesRoutes;
