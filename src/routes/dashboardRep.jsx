import Dashboard from "views/Dashboard/Dashboard.jsx";
import Proposals from "views/Proposals/Proposals.jsx";
import Transparency from "views/Transparency/Transparency.jsx";
import Rules from "views/Rules/Rules.jsx";
import Representatives from "views/Representatives/Representatives.jsx";
import Administration from "views/Administration/Administration.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalance from "@material-ui/icons/AccountBalance";
import HowToVote from "@material-ui/icons/HowToVote";
import Book from "@material-ui/icons/Book";
import Group from "@material-ui/icons/Group";
import Edit from "@material-ui/icons/Edit";

var dashRoutesRep = [
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
  {
    path: "/Administration",
    name: "Administration",
    icon: Edit,
    component: Administration
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Tablero" }
];

export default dashRoutesRep;
