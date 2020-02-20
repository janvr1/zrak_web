<template>
<div>
    <form class="login" @submit.prevent="login" novalidate>
    <h1>Sign in</h1>
    <!-- <label>Username</label> -->
    <input required v-model="username" type="username" placeholder="Username"/>
    <br>
    <br>
    <!-- <label>Password</label> -->
    <input required v-model="password" type="password" placeholder="Password"/>
    <br>
    <br>
    <span>
    <button type="submit">Login</button>
    <NewUser/>
    </span>
    </form>
    <p v-if="msg!=''">{{msg}}</p>
</div>
</template>
<script>
import store from '@/store/index.js'
import axios from 'axios';
import router from '@/router/index.js'
import NewUser from '@/components/NewUser'

export default {
    name: "LoginView",
    components: {
        NewUser,
    },
    data() {
        return {
        username: String(),
        password: String(),
        msg: String(),
        storage: store,
        };
    },
    methods: {
        login: function() {
        let username = this.username;
        let password = this.password;

        axios
            .get('http://api.zrak.janvr.wtf/users', {auth: {username:username, password:password}})
            .then(response => {
               if (response.status==200) {
                store.commit('setUser', username);
                store.commit('setPassword', password);
                store.commit('setAuthorized', "true")
                // this.msg = "";
                router.push('/home');
                }
            })
            .catch(error => {
                store.commit('setUser', username);
                store.commit('setPassword', password);
                store.commit('setAuthorized', "false")
                this.msg = error.response.data;

            })
        }
    },
}
</script>