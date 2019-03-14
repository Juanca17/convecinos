import Dashboard from "views/Dashboard/Dashboard.jsx";
import Proposals from "views/Proposals/Proposals.jsx";
import Transparency from "views/Transparency/Transparency.jsx";
import Rules from "views/Rules/Rules.jsx";
import Representatives from "views/Representatives/Representatives.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalance from "@material-ui/icons/AccountBalance";
import HowToVote from "@material-ui/icons/HowToVote";
import Book from "@material-ui/icons/Book";
import Group from "@material-ui/icons/Group";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Tablero",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: "/proposals",
    name: "Propuestas",
    icon: HowToVote,
    component: Proposals
  },
  {
    path: "/rules",
    name: "Reglamento",
    icon: Book,
    component: Rules
  },
  {
    path: "/representatives",
    name: "Representantes",
    icon: Group,
    component: Representatives
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Tablero" }
];

export default dashRoutes;
