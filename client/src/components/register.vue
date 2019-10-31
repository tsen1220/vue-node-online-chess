<template>
  <div class="registForm">
    <form id="register" @submit="onSubmit">
      <h1>Register</h1>
      <br />

      <label>Name</label>
      <br />
      <input name="name" type="text" v-model="Nickname" />
      <br />
      <span v-if="nameerror">{{nameerrorMsg}}</span>
      <br />

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

      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      Nickname: "",
      nameerror: Boolean,
      nameerrorMsg: "",
      email: "",
      password: "",
      emailerror: Boolean,
      passworderror: Boolean,
      emailerrorMsg: "",
      passworderrorMsg: ""
    };
  },
  watch: {
    Nickname: function() {
      var pass = /[0-9A-Za-z]+/;
      if (this.Nickname === "") {
        this.nameerror = false;
        this.nameerrorMsg = "";
      } else if (!pass.test(this.Nickname)) {
        this.nameerror = true;
        this.nameerrorMsg = "請勿包含特殊字元";
      } else if (pass.test(this.name)) {
        this.nameerror = false;
        this.nameerrorMsg = "";
      }

      if (this.Nickname.length < 3) {
        this.nameerror = true;
        this.nameerrorMsg = "名稱最少六個字";
      }
    },

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
      var name = this.Nickname;
      this.$store
        .dispatch("register", { name: name, email: email, password: password })
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

.registForm {
  font-family: "Fira Sans", sans-serif;
  width: 800px;
  height: 400px;
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