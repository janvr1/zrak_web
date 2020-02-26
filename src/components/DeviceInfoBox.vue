<template>
  <div class="box">
    <div class="columns is-mobile">
      <div class="column">
        <p class="title is-3" style="text-align:left">Device Info</p>
      </div>
      <div class="column">
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button is-link" @click="$emit('editDeviceClicked')">Edit Device</button>
          </div>
        </div>
      </div>
    </div>
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
        <td>{{moment.utc(this.device.time_created, 'YYYY-MM-DD HH:mm:ss').local().format("H:mm, MMM Do YYYY")}}</td>
      </tr>
      <tr>
        <th>Variables</th>
        <td>{{variables.join(", ")}}</td>
      </tr>
    </table>
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