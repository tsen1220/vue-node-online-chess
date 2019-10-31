<template>
  <div class="loginForm">
    <form id="login" @submit="onSubmit">
      <h1>Login</h1>
      <label>Email</label>
      <br />
      <input name="email" type="text" v-model="email" />
      <br />
      <span v-if="emailerror">{{emailerrorMsg}}</span>
      <br />
      <label>Password</label>
      <br />
      <input name="password" type="text" v-model="password" />
      <br />
      <span v-if="passworderror">{{passworderrorMsg}}</span>
      <br />
      <button>Login</button>
      <span>
        or
        <a href="#/register">Sign Up</a>
      </span>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      emailerror: Boolean,
      passworderror: Boolean,
      emailerrorMsg: "",
      passworderrorMsg: ""
    };
  },
  watch: {
    email: function() {
      if (this.email.length < 6) {
        this.emailerror = true;
        this.emailerrorMsg = "請輸入郵件";
      } else {
        this.emailerror = false;
        this.emailerrorMsg = "";
      }
    },
    password: function() {
      var pass = /[0-9A-Za-z]+/;
      if (this.password === "") {
        this.passworderror = false;
        this.passworderrorMsg = "";
      } else if (!pass.test(this.password)) {
        this.passworderror = true;
        this.passworderrorMsg = "請勿包含特殊字元";
      } else if (pass.test(this.password)) {
        this.passworderror = false;
        this.passworderrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passworderror = true;
        this.passworderrorMsg = "密碼最少要6個英文數字";
      }
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      var email = this.email;
      var password = this.password;
      this.$store
        .dispatch("login", { email: email, password: password })
        .then(() => {
          this.$router.push("/");
        })

        .catch(err => {
          /* eslint-disable */

          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans&display=swap");

.loginForm {
  font-family: "Fira Sans", sans-serif;
  width: 800px;
  height: 300px;
  position: absolute;
  left: 27%;
  text-align: center;
  top: 200px;
  border: 2px solid gray;
  position: absolute;
  border-radius: 30px;

  button {
    color: white;
    width: 100px;
    height: 40px;
    border: 2px solid purple;
    background: purple;
    border-radius: 30px;

    &:hover {
      background: red;
      transition: 0.3s linear;
      border: 2px solid red;
    }
  }

  input {
    &:focus {
      background: aqua;
      transition: 0.3s linear;
    }
  }
}
</style>