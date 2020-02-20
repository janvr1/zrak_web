<template>
  <div>
    <div v-if="isOpen" class="modal is-active">
      <div class="modal-background" @click.self="isOpen=false">
        <div class="modal-content">
          <div class="level">
            <div class="box">
              <h3 class="title is-3">Register</h3>
              <form class="login" @submit.prevent="addNewUser">
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input required v-model="user" type="text" placeholder="Username" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">E-mail</label>
                  <div class="control">
                    <input v-model="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input required v-model="pass" type="password" placeholder="Password" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Confirm password</label>
                  <div class="control">
                    <input
                      required
                      v-model="confirm_pass"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" type="submit">Register</button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-light"
                      type="reset"
                      @click="isOpen=false"
                    >Cancel</button>
                  </div>
                </div>
              </form>
              <div v-if="msg!=''">{{msg}}</div>
            </div>
          </div>
        </div>
      </div>
      <button @click="isOpen=false" class="modal-close is-large" aria-label="close"></button>
    </div>
    <div class="box" @click="isOpen = true">Don't yet have an account? Register here</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewUser",
  data() {
    return {
      isOpen: false,
      user: String(),
      email: String(),
      pass: String(),
      confirm_pass: String(),
      msg: String()
    };
  },
  methods: {
    addNewUser: function() {
      let username = this.user;
      let email = this.email;
      let password = this.pass;
      let confirm_password = this.confirm_pass;

      if (password != confirm_password) {
        this.msg = "Passwords do not match";
        return;
      }

      let request_data = Object();
      if (username != "") request_data.username = username;
      if (email != "") request_data.email = email;
      if (password != "") request_data.password = password;

      let request_config = {
        method: "post",
        url: "http://api.zrak.janvr.wtf/users",
        data: request_data
      };

      axios(request_config)
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          this.msg = error.response.data;
        });
    }
  }
};
</script>

<style scoped>
</style>