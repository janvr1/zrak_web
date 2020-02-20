<template>
    <div>
        <h1>Edit your account settings</h1>
        <span>Username: {{username}}</span> <input v-model="new_username" placeholder="New username"/>
        <br>
        <span>Email: {{email}}</span> <input v-model="new_email" placeholder="New email"/>
        <br>
        <span>Password:</span> <input v-model="new_password" placeholder="New password" type="password"/>
        <br>
        <span>Confirm new password:</span> <input v-model="confirm_password" placeholder="Confirm password" type="password"/>
        <br>
        <button @click="editUser">Submit</button>
        <div v-if="msg!=''">{{msg}}</div>
        <div>
            Would you like to delete your account? <button @click="deleteUser">Click here</button>
        </div>
    </div>
</template>

<script>
import store from '@/store/index'
import axios from 'axios'

export default {
    name: 'AccountView',
    data() {
        return {
            username: String(),
            email: String(),
            new_username: String(),
            new_email: String(),
            new_password: String(),
            confirm_password: String(),
            msg: String()
        }
    },

    methods: {
        editUser: function() {
            let new_username = this.new_username;
            let new_email = this.new_email;
            let new_password = this.new_password;
            let confirm_password = this.confirm_password;

            if (new_password != confirm_password) {
                this.msg = "Passwords do not match";
                return;
            }

            let username = store.getters.user;
            let password = store.getters.password;

            let request_data = Object();
            if (new_username != "") request_data.username = new_username;
            if (new_email != "") request_data.email = new_email;
            if (new_password != "") request_data.password = new_password;

            let request_config = {
                method: "put",
                url: "http://api.zrak.janvr.wtf/users",
                auth: {
                    username: username,
                    password: password
                },
                data: request_data
            }

            axios(request_config)
            .then(response => {
                console.log(response);
                this.username = response.data.username;
                this.email = response.data.email;
                store.commit("setAuthorized", false);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data);
                this.msg = error.response.data;
            })
        },

        deleteUser: function() {
            let username = store.getters.user;
            let password = store.getters.password;
            let request_config = {
                method: "delete",
                url: "http://api.zrak.janvr.wtf/users",
                auth: {
                    username: username,
                    password: password
                }
            };
        if (confirm("Are you sure?")) {
            axios(request_config)
            .then(() => {
                store.commit('setAuthorized', false);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data);
            })
            }
        }
    },

    mounted() {
        let username = store.getters.user;
        let password = store.getters.password;

        let request_config = {
            method: "get",
            url: "http://api.zrak.janvr.wtf/users",
            auth: {
                username: username,
                password: password
            }
        }

        axios(request_config)
        .then(response => {
            let account = response.data;
            this.username = account.username;
            this.email = account.email
        })
    }
}
</script>