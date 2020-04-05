<template>
  <main class="map" v-if="isLoggedIn">
    <iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw" allowfullscreen></iframe>
  </main>
  <main class="not-logged" v-else>
    <LogIn />
  </main>
</template>

<script>
import LogIn from "./Login"
export default {
  components: {
    LogIn
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    }
  }
}
</script>

<style>
.map {
  width: 100vw;
  height: calc(100vh - 200px);
}
</style>
