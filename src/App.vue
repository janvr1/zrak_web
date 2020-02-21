<template>
  <div id="app">
    <!-- <div v-if="storage.getters.authorized == 'true'" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">
      Account {{storage.getters.authorized == "true" ? "("+storage.getters.user+")" : ""}}
      </router-link>
      <span @click="logout">Logout</span>
    </div>
    <router-view/>-->

    <nav
      v-if="storage.getters.authorized == 'true'"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/home">
          <img src="./assets/logo.png" />
        </a>
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
          <a class="navbar-item" @click="goHome()">Home</a>
          <a class="navbar-item" @click="goAccount()">Account</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a @click="logout()" class="button is-link">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <div @click="burgerOpen=false" id="background">
      <router-view />
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
}
</style>
