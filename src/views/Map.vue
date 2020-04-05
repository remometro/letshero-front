<template>
  <main ref="map" class="map" v-if="isLoggedIn">
    <iframe @load="setHeight" ref="map__iframe" width="100%" height="auto" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw" allowfullscreen></iframe>
    <div class="map__subtitle">
      <div class="lh-container">
        <div class="map__subtitle__item">
          <img src="@/assets/imgs/heart-green.svg" alt="" class="map__subtitle__item__img">
          <span class="map__subtitle__item__caption text-green">Non <br/> urgent</span>
        </div>
        <div class="map__subtitle__item">
          <img src="@/assets/imgs/heart-yellow.svg" alt="" class="map__subtitle__item__img">
          <span class="map__subtitle__item__caption text-yellow">Medium <br/> urgent</span>
        </div>
        <div class="map__subtitle__item">
          <img src="@/assets/imgs/heart-red.svg" alt="" class="map__subtitle__item__img">
          <span class="map__subtitle__item__caption text-red">Very <br/> urgent</span>
        </div>
      </div>
    </div>
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
      this.$refs.map.style.minHeight = height - 100 + "px"
    }
  }
}
</script>

<style lang="scss">
.map {
  width: 100vw;
  max-width: 100vw !important;
  overflow: hidden;
  margin: 0 !important;

  &__subtitle {
    background-color: $color-black;
    height: 100px;
    margin-top: -5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;

    .lh-container {
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      align-items: center;
      text-align: left;

      &__img {
        margin-right: 1rem;
      }
    }

  }
}
</style>
