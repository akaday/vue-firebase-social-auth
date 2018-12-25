<template>
  <div class="home">
    <img alt="Vue logo" height="100px" src="../assets/logo.png">
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'Dashboard',
  components: {
    LoginComponent
  }
}
</script>
