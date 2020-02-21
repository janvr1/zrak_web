<template>
  <div class="box">
    <article class="media">
      <article class="media-content">
        <p class="title">Device Info</p>
        <table class="table">
          <tr>
            <th>Name</th>
            <td>{{device.name}}</td>
          </tr>
          <tr>
            <th>Device ID:</th>
            <td>{{device.id}}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td>{{device.location}}</td>
          </tr>
          <tr>
            <th>Time created:</th>
            <td>{{device.time_created}}</td>
          </tr>
          <tr>
            <th>Variables:</th>
            <td>{{variables.join(", ")}}</td>
          </tr>
        </table>
        <!-- <div>Name: {{device.name}}</div>
        <div>ID: {{device.id}}</div>
        <div>Location: {{device.location}}</div>
        <div>Time created: {{device.time_created}}</div>
        <div>Variables: {{variables.join(", ")}}</div>-->
      </article>
      <article class="media-right">
        <button class="button is-link" @click="$emit('editDeviceClicked')">Edit Device</button>
      </article>
    </article>
  </div>
</template>

<script>
export default {
  name: "DeviceInfoBox",
  props: {
    device: Object,
    variables: Array
  },
  data() {
    return {};
  }
};
</script>