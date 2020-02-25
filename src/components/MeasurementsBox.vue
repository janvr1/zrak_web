<template>
  <div class="box" style="text-align:left">
    <ConfirmDialog
      v-if="deleteActive"
      :message="deleteMessage"
      @confirm="removeMeasurementsRange()"
      @deny="deleteActive=false"
    />
    <div class="columns is-mobile">
      <div class="column">
        <p class="title is-3">Measurements</p>
      </div>
      <div class="column">
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button is-success" @click="refreshMeasurements()">Refresh</button>
          </div>
          <div class="control">
            <button
              class="button is-danger"
              @click="deleteActive=true"
              title="Deletes the entire specified range"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-desktop">
      <div class="column">
        <div class="field">
          <label class="label">Start time</label>
          <div class="control">
            <datetime
              type="datetime"
              input-class="input"
              input-style="text-align:left"
              v-model="datetime_start"
            ></datetime>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">End time</label>
          <div class="control">
            <datetime
              input-class="input"
              type="datetime"
              input-style="text-align:left"
              v-model="datetime_end"
            ></datetime>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-desktop">
      <div class="column">
        <div class="field">
          <label class="label">Time format</label>
          <div class="control">
            <input class="input" v-model="date_format" type="text" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Limit</label>
          <div class="control">
            <input
              class="input"
              v-model="limit"
              type="number"
              title="Enter the maximum number of measurements to display"
            />
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div class="table-container">
      <table v-if="msg==''" class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="variable in variables" :key="variable">{{variable}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(measurement, key) in measurements" :key="key">
            <td>{{measurement.local_time.local().format(date_format)}}</td>
            <td v-for="variable in variables" :key="variable">{{measurement[variable]}}</td>
            <td>
              <a class="delete" @click="removeMeasurement(key)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <article v-if="msg!=''" class="message is-warning">
      <div class="message-body is-danger">{{msg}}</div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index";
import moment from "moment";
import ConfirmDialog from "./ConfirmDialog";

export default {
  name: "MeasurementsBox",
  props: {
    id: Number,
    variables: Array
  },

  components: {
    ConfirmDialog
  },

  data() {
    return {
      measurements: Object(),
      msg: String(),
      date_format: "HH:mm DD/MM/YY",
      datetime_start: String(),
      datetime_end: String(),
      limit: 20,
      deleteMessage: "Are you sure you want to delete these measurements?",
      deleteActive: false
    };
  },

  methods: {
    removeMeasurement: function(key) {
      let meas_id = this.measurements[key].id;
      let username = store.getters.user;
      let password = store.getters.password;
      moment();

      let request_config = {
        method: "delete",
        url:
          "https://api.zrak.janvr.wtf/measurements?measurement_id=" + meas_id,
        auth: { username: username, password: password }
      };

      axios(request_config)
        .then(() => {
          window.location.reload();
        })
        .catch(() => {});
    },

    refreshMeasurements: function() {
      this.getMeasurements();
    },

    removeMeasurementsRange: function() {
      let user = store.getters.user;
      let pass = store.getters.password;

      let url = "https://api.zrak.janvr.wtf/measurements?device_id=" + this.id;

      if (this.datetime_start != "") {
        url =
          url +
          "&start=" +
          this.datetime_start.replace(/(-|:)/g, "").slice(0, -5);
      }
      if (this.datetime_end != "") {
        url =
          url + "&stop=" + this.datetime_end.replace(/(-|:)/g, "").slice(0, -5);
      }

      axios
        .delete(url, { auth: { username: user, password: pass } })
        .then(() => {
          this.refreshMeasurements();
          this.msg = "";
        })
        .catch(error => {
          this.msg = error.response.data;
        });
      this.deleteActive = false;
    },

    getMeasurements: function() {
      let user = store.getters.user;
      let pass = store.getters.password;

      let url =
        "https://api.zrak.janvr.wtf/measurements?device_id=" +
        this.id +
        "&lim=" +
        this.limit;

      if (this.datetime_start != "") {
        url =
          url +
          "&start=" +
          this.datetime_start.replace(/(-|:)/g, "").slice(0, -5);
      }
      if (this.datetime_end != "") {
        url =
          url + "&stop=" + this.datetime_end.replace(/(-|:)/g, "").slice(0, -5);
      }

      axios
        .get(url, { auth: { username: user, password: pass } })
        .then(response => {
          if (Object.keys(response.data).length > 0) {
            // this.measurements = response.data;
            let measurements = response.data;

            for (var key of Object.keys(measurements)) {
              measurements[key].local_time = moment.utc(
                measurements[key].time,
                "YYYY-MM-DD HH:mm:ss"
              );
            }
            this.measurements = measurements;
            this.msg = "";
            this.$emit("newMeasurements", measurements);
          } else {
            this.msg = "No measurements were found";
          }
        })
        .catch(() => {
          // this.msg = error.response.data;
        });
    }
  },

  mounted() {
    this.getMeasurements();
  }
};
</script>

<style scoped>
#refresh {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>