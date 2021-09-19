import Dashboard from "./views/Dashboard.tsx";
import Membership from "./views/Membership";
import History from "./views/History";

var routes = [
  {
    path: "/intro",
    name: "Intro",
    icon: "nc-icon nc-world-2",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/membership",
    name: "Membership",
    icon: "nc-icon nc-tie-bow",
    component: Membership,
    layout: "/admin",
  },
  {
    path: "/connection-history",
    name: "Intros History",
    icon: "nc-icon nc-paper",
    component: History,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-diamond",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "nc-icon nc-diamond",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-diamond",
  //   component: Notifications,
  //   layout: "/admin",
  // }
];
export default routes;
