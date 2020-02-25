<template>
  <div class="container" id="deviceview">
    <Modal v-if="editDeviceActive" @close="editDeviceActive=false">
      <EditDevice :dev_id="device_id" @close="editDeviceActive=false" />
    </Modal>

    <div class="columns">
      <div class="column">
        <MeasurementsBox
          :id="device_id"
          :variables="variables"
          @newMeasurements="updateMeasurements"
        />
      </div>
      <div class="column is-one-third">
        <DeviceInfoBox
          :device="device"
          :variables="variables"
          @editDeviceClicked="editDeviceActive=true"
        />
        <PlotBox :measurements="measurements" :variables="variables" ref="plotbox" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DeviceInfoBox from "@/components/DeviceInfoBox";
import MeasurementsBox from "@/components/MeasurementsBox";
import EditDevice from "@/components/EditDevice";
import store from "@/store/index.js";
import Modal from "../components/Modal";
import PlotBox from "../components/PlotBox";
// import moment from "moment"

export default {
  name: "DeviceView",
  components: {
    DeviceInfoBox,
    MeasurementsBox,
    EditDevice,
    Modal,
    PlotBox
  },

  created() {
    const ID = Number(this.$route.params.id);
    this.device_id = ID;
  },

  data() {
    return {
      device_id: Number(),
      device: Object(),
      variables: Array(),
      editDeviceActive: false,
      measurements: Object()
    };
  },

  mounted() {
    let user = store.getters.user;
    let pass = store.getters.password;

    axios
      .get("https://api.zrak.janvr.wtf/devices?device_id=" + this.device_id, {
        auth: { username: user, password: pass }
      })
      .then(response => {
        this.device = response.data;

        for (var key of Object.keys(this.device).sort()) {
          if (key.startsWith("var") && this.device[key] != null) {
            this.variables.push(this.device[key]);
          }
        }
      });
  },

  methods: {
    updateMeasurements: function(measurements) {
      this.$refs.plotbox.updateMeasurements(measurements, this.variables);
    }
  }
};
</script>

<style scoped>
.columns {
  background-color: lightblue;
}
</style>