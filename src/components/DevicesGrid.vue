<template>
  <div>
    <Modal v-if="newDeviceActive" @close="newDeviceActive=false">
      <NewDevice @close="newDeviceActive=false" />
    </Modal>

    <div class="columns is-multiline">
      <div v-for="device in devices" :key="device.id" class="column is-one-quarter">
        <router-link :to="'/device/'+device.id">
          <DeviceTile :device="device" style="height:100%" />
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <div class="box" style="height:100%" @click="newDeviceActive=true" id="addNew">
          <h4 class="title is-4">Add new device</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceTile from "./DeviceTile";
import NewDevice from "./NewDevice";
import axios from "axios";
import store from "../store/index";
import Modal from "./Modal";

export default {
  name: "DevicesGrid",
  components: {
    DeviceTile,
    NewDevice,
    Modal
  },
  data() {
    return {
      devices: Object(),
      msg: "Add a new device",
      newDeviceActive: false
    };
  },
  mounted() {
    let user = store.getters.user;
    let pass = store.getters.password;
    axios
      .get("https://api.zrak.janvr.wtf/devices", {
        auth: { username: user, password: pass }
      })
      .then(response => {
        if (Object.keys(response.data).length > 0) {
          this.devices = response.data;
        } else {
          this.msg = "You do not have any devices set up. Add a new one!";
        }
      })
      .catch(error => {
        this.msg = error.response.data;
      });
  }
};
</script>

<style scoped>
#addNew {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
  background-color: #76ff03;
}
</style>
