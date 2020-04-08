<template>
  <main ref="lh-map" class="map" v-if="isLoggedIn">
    <gmap-map
        :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="12" :options="{ disableDefaultUI: true, gestureHandling: 'greedy' }"
        map-type-id="terrain"
        :style="'width: 100%; height:' + mapHeight + 'px;' "
        ref="lh-map__container"
        >
        <gmap-marker
        :key="index"
        v-for="(m, index) in storedMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        help-id=""
        @click="openHelp(m)"
        :icon="{ url: loadMarker(m) }"
        ></gmap-marker>
    </gmap-map>
    <!-- <iframe @load="setHeight" ref="map__iframe" width="100%" height="auto" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyDi_EQFS5kLRRj08KLH0w844aehqKNXOyw" allowfullscreen></iframe> -->
    <Subtitles />
  </main>
  <main class="not-logged" v-else>
    <LogIn />
  </main>
</template>

<script>
import LogIn from "./Login"
import Subtitles from "./components/Subtitles"
import data from "../../data/help-data.json"
export default {
  components: {
    LogIn,
    Subtitles
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    helps() {
      return data
    },
    storedMarkers() {
      let markers = this.helps.map((help) => {
        return { position: { lat: Number(help.location.lat), lng: Number(help.location.lng) }, id: help.id, urgency: help.category.urgency }
      })
      return markers
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.setHeight()
    }
    // this.$parent.$refs.hp__footer.style.display = "none"
    this.geolocation()
  },
  updated() {
    if (this.isLoggedIn) {
      this.setHeight()
    }
  },
  data() {
    return {
      mapHeight: window.innerHeight,
      currentLocation: { lat: 0, lng: 0 },
      markers: [{
        position: { lat: 0, lng: 0 }
      }]
    }
  },
  methods: {
    setHeight() {
      let height = window.innerHeight
      this.mapHeight = height - 200
      this.$refs["lh-map"].style.minHeight = height - 100 + "px"
    },
    geolocation: function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    recenterMap(center) {
      this.currentLocation.lat = center.lat()
      this.currentLocation.lng = center.lng()
    },
    openHelp(m) {
      this.$router.push('/help/' + m.id)
    },
    loadMarker(m) {
      let marker = require('../assets/imgs/heart-green.svg')
      switch (m.urgency) {
      case "1":
        marker = require('../assets/imgs/heart-green.svg')
        break
      case "2":
        marker = require('../assets/imgs/heart-yellow.svg')
        break
      case "3":
        marker = require('../assets/imgs/heart-red.svg')
        break
      }
      return marker
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
</style>
<style lang="scss" scoped>
.hp__footer {
  display: none;
}
.vue-map-container {
  //height: calc(100vh - 200px);
  margin-top: 100px;
}
</style>
