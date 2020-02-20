<template>
  <!-- <div class="column"> -->
  <div class="level">
    <div class="box">
      <h1 class="title">Sign in</h1>
      <form class="login" @submit.prevent="userLogin">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input v-model="username" class="input" type="text" placeholder="Username" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input v-model="password" class="input" type="password" placeholder="Password" />
          </div>
        </div>
        <p class="help" v-if="msg!=''">{{msg}}</p>
        <div class="field">
          <div class="control" style="text-align: center;">
            <button class="button is-link" @click="userLogin()">Login</button>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <NewUser />
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
import router from "@/router/index.js";
import NewUser from "@/components/NewUser";

export default {
  name: "LoginView",
  components: {
    NewUser
  },
  data() {
    return {
      username: String(),
      password: String(),
      msg: String()
      // storage: store,
    };
  },
  methods: {
    userLogin: function() {
      let username = this.username;
      let password = this.password;

      axios
        .get("http://api.zrak.janvr.wtf/users", {
          auth: { username: username, password: password }
        })
        .then(response => {
          if (response.status == 200) {
            store.commit("setUser", username);
            store.commit("setPassword", password);
            store.commit("setAuthorized", "true");
            // this.msg = "";
            router.push("/home");
          }
        })
        .catch(error => {
          store.commit("setUser", username);
          store.commit("setPassword", password);
          store.commit("setAuthorized", "false");
          this.msg = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
</style>