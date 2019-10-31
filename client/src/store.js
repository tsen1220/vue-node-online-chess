import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    userid: localStorage.getItem("userid") || null,
    type: "",
    error: null
  },
  mutations: {
    Auth_Start(state) {
      state.type = "Auth_Start";
    },
    Auth_Success(state, token, userid) {
      state.type = "Auth_Success";
      state.userid = userid;
      state.token = token;
      state.error = null;
    },
    Auth_Fail(state) {
      state.type = "Auth_Fail";
      state.error = "error";
      state.token = null;
      state.userid = null;
    },
    Auth_Logout(state) {
      state.type = "Auth_Logout";
      state.token = null;
      state.error = null;
      state.userid = null;
    }
  },
  actions: {
    login({ commit }, user) {
      commit("Auth_Start");
      axios
        .post("http://localhost:8000/api/user/login", user)
        .then(res => {
          const token = res.data.token;
          const userid = res.data.userid;
          localStorage.setItem("token", token);
          localStorage.setItem("userid", userid);
          commit("Auth_Success", token);
        })
        .catch(err => {
          alert(err.response.data);
          commit("Auth_Fail");
          localStorage.removeItem("token");
          localStorage.removeItem("userid");
        });
    },
    register({ commit }, user) {
      commit("Auth_Start");
      axios
        .post("http://localhost:8000/api/user/register", user)
        .then(res => {
          const token = res.data.token;
          const userid = res.data.userid;
          localStorage.setItem("token", token);
          localStorage.setItem("userid", userid);
          commit("Auth_Success", token);
        })
        .catch(err => {
          alert(err.response.data);
          commit("Auth_Fail");
          localStorage.removeItem("token");
          localStorage.removeItem("userid");
        });
    },
    logout({ commit }) {
      commit("Auth_Logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
    }
  }
});
