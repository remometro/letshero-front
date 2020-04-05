<template>
  <main ref="map" class="map" v-if="isLoggedIn">
    <iframe @load="setHeight" ref="map__iframe" width="100%" height="auto" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw" allowfullscreen></iframe>
    <Subtitles />
  </main>
  <main class="not-logged" v-else>
    <LogIn />
  </main>
</template>

<script>
import LogIn from "./Login"
import Subtitles from "./components/Subtitles"
export default {
  components: {
    LogIn,
    Subtitles
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
      this.$refs.map.style.minHeight = height - 100 + "px"
    }
  }
}
</script>

<style lang="scss">
.map {
  width: 100%;
  max-width: 100vw !important;
  overflow: hidden;
  margin: 0 !important;
}
.hp__footer {
  display: none;
}
</style>
<style lang="scss" scoped>
.hp__footer {
  display: none;
}
</style>
