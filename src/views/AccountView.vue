<template>
  <div>
    <div class="columns is-desktop is-centered is-vcentered">
      <div class="column is-one-quarter">
        <div class="box">
          <ConfirmDialog
            v-if="deleteActive"
            :message="deleteMessage"
            @confirm="deleteUser()"
            @deny="deleteActive=false"
          />
          <h1 class="title">Edit your account</h1>

          <form @submit.prevent="editUser()" style="text-align:left">
            <div class="field">
              <label class="label">Username: {{username}}</label>
              <div class="control">
                <input class="input" v-model="new_username" placeholder="New username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Email: {{email}}</label>
              <div class="control">
                <input class="input" v-model="new_email" placeholder="New email" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  v-model="new_password"
                  placeholder="New password"
                  type="password"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm assword</label>
              <div class="control">
                <input
                  class="input"
                  v-model="confirm_password"
                  placeholder="Confirm password"
                  type="password"
                />
              </div>
            </div>
            <article v-if="msg!=''" class="message is-danger">
              <div class="message-body is-danger">{{msg}}</div>
            </article>
            <div class="field">
              <div class="control" style="text-align: center;">
                <button type="submit" class="button is-link">Submit</button>
              </div>
            </div>
          </form>
          <br />
          <div class="field">
            <div class="control" style="text-align:center">
              <p>Would you like to delete your account?</p>
            </div>
          </div>
          <div class="field">
            <div class="control" style="text-align:center">
              <button class="button is-danger" @click="deleteActive=true">Click here</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import axios from "axios";
import router from '../router/index'
import ConfirmDialog from "../components/ConfirmDialog";

export default {
  name: "AccountView",

  components: {
    ConfirmDialog
  },

  data() {
    return {
      username: String(),
      email: String(),
      new_username: String(),
      new_email: String(),
      new_password: String(),
      confirm_password: String(),
      msg: String(),
      deleteActive: false,
      deleteMessage: "Are you sure you want to delete your account?"
    };
  },

  methods: {
    editUser: function() {
      let new_username = this.new_username;
      let new_email = this.new_email;
      let new_password = this.new_password;
      let confirm_password = this.confirm_password;

      if (new_password != confirm_password) {
        this.msg = "Passwords do not match";
        return;
      }

      let username = store.getters.user;
      let password = store.getters.password;

      let request_data = Object();
      if (new_username != "") request_data.username = new_username;
      if (new_email != "") request_data.email = new_email;
      if (new_password != "") request_data.password = new_password;

      // console.log(request_data);

      let request_config = {
        method: "put",
        url: "https://api.zrak.janvr.wtf/users",
        auth: {
          username: username,
          password: password
        },
        data: request_data
      };

      axios(request_config)
        .then(response => {
          // console.log(response);
          this.username = response.data.username;
          this.email = response.data.email;

          if (Object.prototype.hasOwnProperty.call(request_data, "password")) {
            store.commit("setAuthorized", false);
            window.location.reload();
          }
          store.commit("setUser", this.username);
        })
        .catch(error => {
          // console.log(error.response.data);
          this.msg = error.response.data;
        });
    },

    deleteUser: function() {
      let username = store.getters.user;
      let password = store.getters.password;
      let request_config = {
        method: "delete",
        url: "https://api.zrak.janvr.wtf/users",
        auth: {
          username: username,
          password: password
        }
      };

      axios(request_config)
        .then(() => {
          store.commit("setAuthorized", false);
          store.commit('setUser', "");
          store.commit('setPassword', "");
          router.push('/login?deleted')
          window.location.reload();
        })
        .catch(() => {
          // console.log(error.response.data);
        });
    }
  },

  mounted() {
    let username = store.getters.user;
    let password = store.getters.password;

    let request_config = {
      method: "get",
      url: "https://api.zrak.janvr.wtf/users",
      auth: {
        username: username,
        password: password
      }
    };

    axios(request_config).then(response => {
      let account = response.data;
      this.username = account.username;
      this.email = account.email;
    });
  }
};
</script>