<template>
  <main ref="map" class="map" v-if="isLoggedIn">
    <iframe @load="setHeight" ref="map__iframe" width="100%" height="auto" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw" allowfullscreen></iframe>
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
  },
  mounted() {
    this.setHeight()
  },
  methods: {
    setHeight() {
      let height = window.innerHeight
      this.$refs.map__iframe.height = height - 100
      this.$refs.map.style.maxHeight = height - 200 + "px"
    }
  }
}
</script>

<style lang="scss">
.map {
  width: 100vw;
  max-width: 100vw !important;
  overflow: hidden;
}
</style>
