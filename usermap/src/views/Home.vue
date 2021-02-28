<template>
  <div class="home">
    <HelloWorld> </HelloWorld>
      this is home public page? 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
