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
      <div class="column is-5">
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
import DeviceInfoBox from "../components/DeviceInfoBox";
import MeasurementsBox from "../components/MeasurementsBox";
import EditDevice from "../components/EditDevice";
import store from "../store/index";
import Modal from "../components/Modal";
import PlotBox from "../components/PlotBox";
import zrak_api from "../main";

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
    let request_config = {
      url: "/devices?device_id=" + this.device_id,
      auth: { username: user, password: pass }
    };
    zrak_api(request_config).then(response => {
      this.device = response.data;

      for (let key of Object.keys(this.device).sort()) {
        if (key.startsWith("var") && this.device[key] != null) {
          this.variables.push(this.device[key]);
        }
      }
      this.$refs.plotbox.updateMeasurements(this.measurements, this.variables);
    });
  },

  methods: {
    updateMeasurements: function(measurements) {
      this.measurements = measurements;
      this.$refs.plotbox.updateMeasurements(this.measurements, this.variables);
    }
  }
};
</script>

<style scoped>
.columns {
  background-color: lightblue;
}
</style>