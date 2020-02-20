<template>
    <div>
        <h3> Measurements </h3>
        <table v-if="Object.keys(measurements).length > 0">
            <th>Time</th>
            <th v-for="variable in variables" :key="variable"> {{variable}}</th>
            <th>Remove</th>
            <tr v-for="(measurement, key) in measurements" :key="key">
                <td> {{measurement.time}}</td>
                <td v-for="variable in variables" :key="variable"> {{measurement[variable]}}</td>
                <td @click="removeMeasurement(key)"> x </td>
            </tr>
        </table>
        <div v-else>
            {{msg}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '@/store/index.js'

export default {
    name: 'MeasurementsBox',
    props: {
        id: Number(),
    },

    data() {
        return {
            measurements: Object(),
            variables: Array(),
            msg: String(),
        }
    },

    methods: {
        removeMeasurement: function (key) {
            let meas_id = this.measurements[key].id;
            let username = store.getters.user;
            let password = store.getters.password

            let request_config =  {
                method: 'delete',
                url: 'http://api.zrak.janvr.wtf/measurements?measurement_id='+meas_id,
                auth: {username: username, password: password}
              }

            axios(request_config)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data)
            })
            }
    },

    mounted() {
        let user = store.getters.user;
        let pass = store.getters.password;
        axios
        .get('http://api.zrak.janvr.wtf/measurements?device_id=' + this.id + '&lim=' + 20,
            {auth: {username: user, password: pass}})
        .then(response => {
            if (Object.keys(response.data).length > 0) {
                this.measurements = response.data;
                for (var key in response.data["0"]) {
                    if (key != "dev_id" && key != "time" && key != "id") this.variables.push(key);
                }
            } else {
                this.msg = "Thid device does not have any measurements yet"
            }
        })
        .catch(error => {
            this.msg = error.response.data;
        })
    }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

h1, body, nav {
  font-family: airal, sans-serif;
}

td, th {
  border: 1px solid #777777;
  padding: 8px;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>