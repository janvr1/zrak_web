<template>
  <div class="box">
    <div style="position:relative; text-align:left">
      <button class="button is-link" id="editDeviceBtn" @click="$emit('editDeviceClicked')">Edit Device</button>

      <p class="title">Device Info</p>
      <table class="table">
        <tr>
          <th>Name</th>
          <td>{{device.name}}</td>
        </tr>
        <tr>
          <th>Device ID</th>
          <td>{{device.id}}</td>
        </tr>
        <tr>
          <th>Location</th>
          <td>{{device.location}}</td>
        </tr>
        <tr>
          <th>Time created</th>
          <td>{{moment.utc(this.device.time_created, 'YYYY-MM-DD HH:mm:ss').local().format("H:mm, MMMM Do YYYY")}}</td>
        </tr>
        <tr>
          <th>Variables</th>
          <td>{{variables.join(", ")}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DeviceInfoBox",
  props: {
    device: Object,
    variables: Array
  },
  data() {
    return {
      moment: moment
    };
  }
};
</script>

<style scoped>
#editDeviceBtn {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>