<template>
   <div id="app">
      <VuePassportLogin
        @success="handleLogin"
        @failed="handleErrors"
      />
   </div>
</template>

<script>
import VuePassportLogin from 'vue-passport'
import axios from 'axios'

var instance = axios.create();

export default {
  components: { Login },
  methods: {
    handleLogin (payload) {
      this.$store.dispatch('setUser', payload.authUser)
      instance.defaults.headers.common['Authorization'] = payload.headers.Authorization;
    },
    handleErrors (errors) {
      alert('Authorization error' + errors)
    }
  }
}
</script>