<template>
  <div class="box">
    <h1 class="title">New device</h1>
    <hr/>
    <form @submit.prevent="addNewDevice()" style="text-align:left">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" required v-model="name" type="text" placeholder="Device name" />
        </div>
      </div>
      <div class="field">
        <label class="label">Location</label>
        <div class="control">
          <input class="input" v-model="location" type="text" placeholder="Device location" />
        </div>
      </div>
      <div class="field">
        <label class="label">Variables</label>
        <div class="control">
          <input
            required
            class="input"
            v-model="variables"
            type="text"
            placeholder="Device variables"
            title="Enter up to 10 variable names separated by a comma"
          />
        </div>
      </div>
      <article v-if="msg!=''" class="message is-danger">
        <div class="message-body is-danger">{{msg}}</div>
      </article>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button type="submit" class="button is-link">Create</button>
        </div>
        <div class="control">
          <button type="reset" class="button is-link is-light" @click.prevent="$emit('close')">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";

export default {
  name: "NewDevice",
  data() {
    return {
      isOpen: false,
      name: String(),
      location: String(),
      variables: String(),
      msg: String()
    };
  },
  methods: {
    addNewDevice: function() {
      let dev_name = this.name;
      let dev_location = this.location;
      let variables = this.variables.replace(/\s/g,'').split(",");
      let user = store.getters.user;
      let pass = store.getters.password;

      let request_config = {
        method: "post",
        url: "https://api.zrak.janvr.wtf/devices",
        data: {
          device_name: dev_name,
          device_location: dev_location,
          variables: variables
        },
        auth: {
          username: user,
          password: pass
        }
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