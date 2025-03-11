
import Index from "views/Index.js";

import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/auth",
  },
  
  
 

  
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
 
];
export default routes;
