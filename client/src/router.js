import Vue from "vue";
import Router from "vue-router";
import chessBoard from "./components/chessBoard";
import Login from "./components/login";
import Register from "./components/register";
import Room from "./components/chessRoom";
import fullRoom from "./components/fullroom";
import Home from "./components/home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/chess",
      name: "Room",
      component: Room
    },

    {
      path: "/chess/:chessroom",
      name: "chess",
      component: chessBoard
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/full",
      name: "full",
      component: fullRoom
    },
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
