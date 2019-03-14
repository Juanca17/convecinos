import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

export const indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard }
];

export const noAuthRoutes = [
  { path: "/pages", name: "Pages", component: Pages }
];
