<template>
    <div v-if="Object.keys(devices).length > 0" class="grid-container">
        <div
            v-for="device in devices"
            v-bind:key="device.id" class="grid-item">
        <router-link v-bind:to="'/device/' + device.id">
        <DeviceCard v-bind:device="device"/>
        </router-link>
        </div>
    </div>
    <div v-else>
        {{msg}}
    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard"
import axios from "axios"
import store from '@/store/index.js'

export default {
    name: "DevicesGrid",
    components: {
        DeviceCard
    },
    data() {
        return {
            devices: Object(),
            msg: String(),
        }
    },
    mounted() {
        let user = store.getters.user;
        let pass = store.getters.password;
        axios
        .get('http://api.zrak.janvr.wtf/devices',
         {auth: {username: user, password: pass}})
        .then(response => {
            if (Object.keys(response.data).length > 0) {
            this.devices = response.data;
            } else {
                this.msg = "You do not have any devices set up. Add a new one!";
            }
        })
        .catch(error => {
            this.msg = error.response.data;
        })
    },
}
</script>

<style scoped>
.grid-container {
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-item {
  border: 0px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  background-color: aqua;
}
</style>
