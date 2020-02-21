<template>
  <div id="login">
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
      </form>
      <div class="field">
        <div class="control">
          <button @click="openModal()" />
        </div>
      </div>
    </div>
    <NewUser :isOpen_prop="modalActive" />
  </div>
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
      msg: String(),
      modalActive: false
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
    },
    openModal: function() {
      this.modalActive = true;
    }
  }
};
</script>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;
}
</style>