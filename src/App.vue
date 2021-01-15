<template>
  <div id="app">
    <nav
      id="nav"
      v-if="storage.getters.authorized == 'true'"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/home">
          <img src="./assets/logo.png" />
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
          data-target="navbarMenu"
          @click="burgerOpen=!burgerOpen"
          :class="{'is-active':burgerOpen}"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" id="navbarMenu" :class="{'is-active':burgerOpen}">
        <div class="navbar-start">
          <router-link to="/home" class="navbar-item">
            <b>Home</b>
          </router-link>
          <router-link to="/account" class="navbar-item">
            <b>Account</b>
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a @click="logout()" class="button is-danger">Logout</a>
          </div>
        </div>
      </div>
      <hr />
    </nav>

    <div @click="burgerOpen=false" id="background">
      <router-view id="currentView"></router-view>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import router from "@/router/index.js";

export default {
  data() {
    return {
      storage: store,
      burgerOpen: false
    };
  },
  methods: {
    logout: function() {
      store.commit("setUser", "");
      store.commit("setPassword", "");
      store.commit("setAuthorized", "false");
      router.push("/login");
    },

    goHome: function() {
      this.burgerOpen = false;
      router.push("/home");
    },

    goAccount: function() {
      this.burgerOpen = false;
      router.push("/account");
    }
  },
  components: {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
  height: 100vh;
}

#nav {
  background-color: aquamarine;
  margin-bottom: 2%;
}

#background {
  background-color: lightblue;
}
</style>
