<template>
  <div>
    <Modal v-if="newUserActive" @close="newUserActive=false">
      <NewUser @close="newUserActive=false" />
    </Modal>

    <div class="columns is-desktop" id="background">
      <div class="column is-4 is-offset-4">
        <div id="login" class="box">
          <h1 class="title">Sign in</h1>
          <hr />
          <form @submit.prevent="userLogin()">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input required v-model="username" class="input" type="text" placeholder="Username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  required
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <article v-if="msg!=''" class="message is-danger">
              <div class="message-body is-danger">{{msg}}</div>
            </article>

            <div class="field">
              <div class="control" style="text-align: center;">
                <button type="submit" class="button is-link">Login</button>
              </div>
            </div>
            <div class="field">
              <label class="label">Don't yet have an account?</label>
              <div class="control" style="text-align: center;">
                <button
                  class="button is-link is-light"
                  @click.prevent="newUserActive=true"
                >Register here</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import router from "../router/index.js";
import NewUser from "../components/NewUser";
import Modal from "../components/Modal";
import zrak_api from "../main";

export default {
  name: "LoginView",
  components: {
    NewUser,
    Modal
  },
  data() {
    return {
      username: String(),
      password: String(),
      msg: String(),
      newUserActive: false
    };
  },

  created() {
    if (this.$route.query.deleted !== undefined) {
      this.msg = "Your account has been deleted";
    }
  },

  methods: {
    userLogin: function() {
      let username = this.username;
      let password = this.password;

      let request_config = {
        url: "/users",
        auth: {
          username: username,
          password: password
        }
      };

      zrak_api(request_config)
        .then(response => {
          if (response.status == 200) {
            store.commit("setUser", username);
            store.commit("setPassword", password);
            store.commit("setAuthorized", "true");
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
#login {
  margin-top: 30%;
}
</style>