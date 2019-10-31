<template>
  <div id="app">
    <div id="nav">
      <div id="list">
        <router-link id="home" to="/">Home</router-link>
        <router-link id="chess" to="/chess">Chess</router-link>
        <router-link v-if="!token" id="regist" to="/register">Sign Up</router-link>
        <router-link v-if="!token" id="logi" to="/login">Login</router-link>
        <span id="logout" v-if="token" @click="logout">Logout</span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState(["token", "userid", "type", "error"])
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          /*eslint-disable */
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
@import url("https://fonts.googleapis.com/css?family=Zhi+Mang+Xing&display=swap");
#nav {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0%;
  left: 0%;
  font-size: 30px;
  font-family: "Zhi Mang Xing", cursive;
  background: #0a9660;
  & #list {
    position: absolute;
    right: 5%;
    top: 10px;
  }
}

#home {
  text-decoration: none;
  margin: 30px;
  color: #000000;
  &:hover {
    color: #3c3caf;
    transition: 0.5s ease-out;
  }
}

#chess {
  text-decoration: none;
  margin: 30px;
  color: #000000;
  &:hover {
    color: #3c3caf;
    transition: 0.5s ease-out;
  }
}

#logi {
  text-decoration: none;
  margin: 30px;
  color: #000000;
  &:hover {
    color: #3c3caf;
    transition: 0.5s ease-out;
  }
}

#regist {
  text-decoration: none;
  margin: 30px;
  color: #000000;
  &:hover {
    color: #3c3caf;
    transition: 0.5s ease-out;
  }
}
#logout {
  cursor: pointer;
  &:hover {
    color: #3c3caf;
    transition: 0.5s ease-out;
  }
}
</style>