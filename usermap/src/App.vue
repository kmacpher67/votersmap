<template>
  <div id="app">
      <div id="sidebar scrollable-menu">
      <router-link class = "nav-link" v-if="!isOnLoginPage()" to="/">Public | </router-link>
      <router-link class = "nav-link" v-if="!isOnLoginPage()" to="/home">Home  _|_ </router-link>
      <!-- <router-link to="/profile">Profile</router-link>  |  -->
      <router-link class = "nav-link" v-if="!isOnLoginPage()" to="/login" active-class="user">Login</router-link> 
    </div>
    <router-view/> 
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    // is it the login page? otherwise don't show the nav.
    isOnLoginPage: function() {
      return this.$route.path != '/login' || this.$route.path === '/'
    }
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
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
