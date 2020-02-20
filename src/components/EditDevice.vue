<template>
  <span>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">
            <h3>Add new device</h3>
            <form @submit.prevent="editDevice">
            <!-- <label>Name</label> -->
            <input required v-model="name" type="text" placeholder="Device name"/>
            <br>
            <!-- <label>Location</label> -->
            <input v-model="location" type="text" placeholder="Device location"/>
            <br>
            <!-- <label>Variables</label> -->
            <input v-model="variables" type="text" placeholder="Device variables"
                   title="Enter up to 10 variable names separated by a comma" />
            <br>
            <button type="submit">Submit</button>
            <button type="reset" @click="isOpen=false">Cancel</button>
            <button type="button" @click="deleteDevice()">Delete device</button>
            </form>
            <div v-if="msg!=''"> {{msg}} </div>
          </div>
        </div>
      </div>
    </transition>
    <button @click="isOpen = true">
      Edit Device
    </button>
  </span>
</template>

<script>
import store from '@/store/index'
import axios from 'axios'
import router from '@/router/index'

export default {
    name: "EditDevice",
    data() {
        return {
            isOpen: false,
            name: String(),
            location: String(),
            variables: String(),
            msg: String(),
        }
    },

    props: {
        dev_id: Number
    },

    methods: {
        editDevice: function() {
            let dev_name = this.name;
            let dev_location = this.location;
            let variables = this.variables.split(",");
            let user = store.getters.user;
            let pass = store.getters.password;

            let request_data = Object();

            if (dev_name != "") request_data.device_name = dev_name;
            if (dev_location != "") request_data.device_location = dev_location;
            if (variables != [""]) request_data.variables = variables;

            let request_config =  {
              method: 'put',
              url: 'http://api.zrak.janvr.wtf/devices?device_id=' + this.dev_id,
              data: request_data,
              auth: {
                username: user,
                password: pass
              },
            }

            axios(request_config)
            .then(() => {
              window.location.reload();
            })
            .catch(error => {
              this.msg = error.response.data;
            })
        },

        deleteDevice: function () {
            let user = store.getters.user;
            let pass = store.getters.password;

            let request_config =  {
              method: 'delete',
              url: 'http://api.zrak.janvr.wtf/devices?device_id=' + this.dev_id,
              auth: {
                username: user,
                password: pass
              }
            };

            axios(request_config)
            .then(() => {
                router.push('/home');
                // console.log(response.data);
            })
            .catch(() => {
                // console.log(error.response.data);
            });
        }
    }
}
</script>

<style scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

/* button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
} */

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>