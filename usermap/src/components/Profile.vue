<template>
  <div>
      <h1> PROFILE PAGE </h1>

    </div>    
</template>


<script>
export default {
  name: 'Profile',
  data () {
    return {
        user:{}
    }
  },
  mounted() {
    console.log('Profile.Vue -mounted method... in vue.use');
    this.getUser();
  },
  methods: {
    getUser() {
      console.log('Profile.Vue - getUser() ')
      this.axios.get('/users').then(response => {
              console.log(response.data);
              this.user = this.getRandomUsers(response.data, 6)
          }).catch(function (error) {
            // handle error
            console.log('Profile.Vue - getUser() { error occurred');
            this.users = this.setDefaultUsers();
            console.log(error);
        });
        console.log('Profile.Vue -getUser() - this users = ' + this.users);
    },
  },
}
</script>

