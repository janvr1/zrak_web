<template>
    <div>
        <DeviceInfoBox v-bind:device="device"/>
        <MeasurementsBox v-bind:id="device_id"/>
    </div>
</template>

<script>
import axios from "axios"
import DeviceInfoBox from '@/components/DeviceInfoBox'
import MeasurementsBox from '@/components/MeasurementsBox'
import store from '@/store/index.js'


export default {
    name: 'DeviceView',
    components: {
        DeviceInfoBox,
        MeasurementsBox,
    },

    created() {
        const ID = Number(this.$route.params.id);
        this.device_id = ID
    },

    data() {
        return {
            device_id: Number(),
            device: Object(),
        }
    },

    mounted() {
        let user = store.getters.user;
        let pass = store.getters.password;
        axios
        .get('http://api.zrak.janvr.wtf/devices?device_id=' + this.device_id,
         {auth: {username: user, password: pass}})
        .then(response => (this.device = response.data))
    }
}
</script>