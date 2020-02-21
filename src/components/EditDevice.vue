<template>
  <div class="box">
    <p class="title">Edit device</p>
    <form @submit.prevent="editDevice()" style="text-align:left">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" v-model="name" type="text" placeholder="Device name" />
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
          <button type="submit" class="button is-link is-normal">Edit</button>
        </div>
        <div class="control">
          <button @click.prevent="deleteDevice()" class="button is-danger is-normal">Delete</button>
        </div>
        <div class="control">
          <button
            type="reset"
            class="button is-link is-light is-normal"
            @click.prevent="$emit('close')"
          >Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/index";
import axios from "axios";
import router from "@/router/index";

export default {
  name: "EditDevice",
  data() {
    return {
      isOpen: false,
      name: String(),
      location: String(),
      variables: String(),
      msg: String()
    };
  },

  props: {
    dev_id: Number
  },

  methods: {
    editDevice: function() {
      let dev_name = this.name;
      let dev_location = this.location;
      let variables = this.variables.split(",");
      let user = store.getters.user;
      let pass = store.getters.password;

      let request_data = Object();

      if (dev_name != "") request_data.device_name = dev_name;
      if (dev_location != "") request_data.device_location = dev_location;
      if (this.variables != "") request_data.variables = variables;

      if (Object.keys(request_data).length == 0) {
        this.msg = "You did not enter any data to change";
        return;
      }

      let request_config = {
        method: "put",
        url: "http://api.zrak.janvr.wtf/devices?device_id=" + this.dev_id,
        data: request_data,
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
    },

    deleteDevice: function() {
      let user = store.getters.user;
      let pass = store.getters.password;

      let request_config = {
        method: "delete",
        url: "http://api.zrak.janvr.wtf/devices?device_id=" + this.dev_id,
        auth: {
          username: user,
          password: pass
        }
      };

      axios(request_config)
        .then(() => {
          router.push("/home");
          // console.log(response.data);
        })
        .catch(() => {
          // console.log(error.response.data);
        });
    }
  }
};
</script>