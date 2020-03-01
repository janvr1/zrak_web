<template>
  <div id="register" class="box">
    <h1 class="title">Register</h1>
    <hr />
    <form @submit.prevent="addNewUser()" style="text-align:left">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" required v-model="user" type="text" placeholder="Username" />
        </div>
      </div>
      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input class="input" v-model="email" type="email" placeholder="john@example.com" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input required class="input" v-model="pass" type="password" placeholder="Password" />
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm password</label>
        <div class="control">
          <input
            required
            v-model="confirm_pass"
            class="input"
            type="password"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <article v-if="msg!=''" class="message is-danger">
        <div class="message-body is-danger">{{msg}}</div>
      </article>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button type="submit" class="button is-link">Register</button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            type="reset"
            @click.prevent="$emit('close')"
          >Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import zrak_api from "../main";

export default {
  name: "NewUser",
  data() {
    return {
      // isOpen: this.isOpen_prop,
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
        url: "/users",
        data: request_data
      };

      zrak_api(request_config)
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