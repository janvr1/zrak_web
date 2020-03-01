<template>
  <div>
    <Modal v-if="newDeviceActive" @close="newDeviceActive=false">
      <NewDevice @close="newDeviceActive=false" />
    </Modal>

    <div class="columns is-multiline" :class="{'is-centered':Object.keys(devices).length<4}">
      <div v-for="device in devices" :key="device.id" class="column is-one-quarter">
        <router-link :to="'/device/'+device.id">
          <DeviceTile :device="device" style="height:100%" />
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <a class="box" style="height:100%" @click="newDeviceActive=true" id="addNew">
          <h4 class="title is-4">Add new device</h4>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceTile from "./DeviceTile";
import NewDevice from "./NewDevice";
import store from "../store/index";
import Modal from "./Modal";
import zrak_api from "../main";

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
      newDeviceActive: false
    };
  },
  mounted() {
    let user = store.getters.user;
    let pass = store.getters.password;

    let request_config = {
      method: "get",
      url: "/devices",
      auth: {
        username: user,
        password: pass
      }
    };

    zrak_api(request_config).then(response => {
      if (Object.keys(response.data).length > 0) {
        this.devices = response.data;
      }
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
