<template>
  <main ref="lh-map" class="map">
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :center="{lat:currentLocation.lat, lng:currentLocation.lng}" @load="mapLoaded" />
  </main>
</template>

<script>
import Mapbox from "mapbox-gl"
import { MglMap } from "vue-mapbox"

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYW5nZWxvcmVhbGUiLCJhIjoiY2tobDk2bHd2MDh3cTJ6cXRja3RtN3RhdCJ9.iqcyq19xPQhIYuAWIi4VZQ',
      mapStyle: 'mapbox://styles/mapbox/dark-v10',
      mapHeight: window.innerHeight,
      currentLocation: { lat: 0, lng: 0 },
      markers: [{
        position: { lat: 0, lng: 0 }
      }],
      selectedId: null,
      helpPopupShown: false,
      listPopupShown: false,
      listLocation: {}
    }
  },
  methods: {
    mapLoaded(e) {
      this.map = e.map
    },
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
      this.currentLocation.lat = center.lat
      this.currentLocation.lng = center.lng
    }
  },
  created() {
    this.mapbox = Mapbox
  }
  // mounted() {
  //   if (this.isLoggedIn) {
  //     this.setHeight()
  //     this.map.resize()
  //   }
  //   // this.$parent.$refs.hp__footer.style.display = "none"
  //   this.geolocation()
  // },
  // updated() {
  //   if (this.isLoggedIn) {
  //     this.setHeight()
  //     this.map.resize()
  //   }
  // }
}
</script>
<style lang="scss">
.map {
  width: 100%;
  max-width: 100vw !important;
  overflow: hidden;
  // margin: 0 !important;
}

</style>
