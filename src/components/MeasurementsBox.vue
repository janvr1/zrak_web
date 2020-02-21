<template>
  <div class="box" style="text-align:left">
    <p class="title is-3">Measurements</p>

    <table class="table is-striped is-fullwidth ">
      <thead>
        <tr>
          <th>Time</th>
          <th v-for="variable in variables" :key="variable">{{variable}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(measurement, key) in measurements" :key="key">
          <td> {{measurement.time}}</td>
          <td v-for="variable in variables" :key="variable">
          {{measurement[variable]}}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";

export default {
  name: "MeasurementsBox",
  props: {
    id: Number,
    variables: Array
  },

  data() {
    return {
      measurements: Object(),
      msg: String()
    };
  },

  methods: {
    removeMeasurement: function(key) {
      let meas_id = this.measurements[key].id;
      let username = store.getters.user;
      let password = store.getters.password;

      let request_config = {
        method: "delete",
        url: "http://api.zrak.janvr.wtf/measurements?measurement_id=" + meas_id,
        auth: { username: username, password: password }
      };

      axios(request_config)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  },

  mounted() {
    let user = store.getters.user;
    let pass = store.getters.password;

    axios
      .get(
        "http://api.zrak.janvr.wtf/measurements?device_id=" +
          this.id +
          "&lim=" +
          20,
        { auth: { username: user, password: pass } }
      )
      .then(response => {
        if (Object.keys(response.data).length > 0) {
          this.measurements = response.data;
        } else {
          this.msg = "This device does not have any measurements yet";
        }
      })
      .catch(error => {
        this.msg = error.response.data;
      });
  }
};
</script>

<style scoped>
</style>