<template>
  <div class="container" id="app">
    <div v-if="storage.getters.authorized == 'true'" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">
      Account {{storage.getters.authorized == "true" ? "("+storage.getters.user+")" : ""}}
      </router-link>
      <span @click="logout">Logout</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import store from '@/store/index.js'
import router from '@/router/index.js'

export default {
  data() {
    return {
    storage: store,
    }
  },
  methods: {
    logout: function() {
      store.commit('setUser', "");
      store.commit('setPassword', "");
      store.commit('setAuthorized', "false");
      router.push('/login');
    }
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
