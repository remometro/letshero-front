<template>
  <main class="find-a-hero">
    <form action="" class="find-a-hero__form">

      <LH-Dropdown ref="typeOpen" label="What do you need?" :options="getTypesOfHelp" @selected="setType" />
      <LH-Dropdown ref="typeOpen" label="Do you offer/need some money?" :options="getOptionsHasReward" @selected="setReward" />
      <div class="lh--input--text find-a-hero__form__reward" v-if="formReward && formReward !== 4 && formReward !== 2">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" min="1" step="1" v-model="formAmount" />
      </div>
      <div class="lh--input--text find-a-hero__form__reward" v-if="formReward && formReward === 2">
        <label for="find-a-hero__form__reward__label">What do you offer?</label>
        <input type="text" maxlength="32" v-model="formRewardOther" />
      </div>
      <div class="lh--input--text find-a-hero__form__where">
        <label for="find-a-hero__form__where__label">Where are you at the moment?</label>
        <!--<input type="text" required v-model="formWhere" @change="getPlaces" /> -->
        <GmapAutocomplete @place_changed="setPlace" />
        <gmap-map
        v-if="formPlace"
        :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="17" :options="{disableDefaultUI:true}"
        map-type-id="terrain"
        style="width: 100%; height: 150px"
        >
        <gmap-marker
        @dragend="updateMaker"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="formPosition=m.position"
        ></gmap-marker>
    </gmap-map>
      </div>
      <div class="lh--input--text find-a-hero__form__why">
        <label for="find-a-hero__form__where__label">Please describe in a few words why you need help.</label>
        <textarea class="lh--input--textarea" type="text" required maxlength="256" rows="5" v-model="formWhy" />
      </div>
      <div class="lh--input--text find-a-hero__form__reward">
        <label for="find-a-hero__form__reward__label">Is there a video link explaining your need? (Youtube and Vimeo links only)</label>
        <input type="text" maxlength="128" v-model="formLink" />
      </div>
      <button class="lh--button find-a-hero__form__submit">
        Find a Hero
      </button>
    </form>
    <router-link class="lh--link lh--link--small lh--link--black" to="/list">Or be someone's hero.</router-link>

  </main>
</template>

<script>
import LHDropdown from "./components/LH-Dropdown"
export default {
  name: "FindAHero",
  components: {
    LHDropdown
  },
  data() {
    return {
      formType: null,
      formReward: null,
      formAmount: null,
      formRewardOther: null,
      formWhere: null,
      formWhy: null,
      formPosition: null,
      formPlace: null,
      formLink: null,
      currentLocation: { lat: 0, lng: 0 },
      markers: [{
        position: { lat: 0, lng: 0 }
      }],
      place: null
    }
  },
  computed: {
    getTypesOfHelp() {
      return [
        {
          "label": "Food",
          "value": 1
        },
        {
          "label": "Shelter",
          "value": 2
        },
        {
          "label": "Medical Care",
          "value": 3
        },
        {
          "label": "Psychological Care",
          "value": 4
        },
        {
          "label": "Companion",
          "value": 5
        },
        {
          "label": "Other",
          "value": 6
        }
      ]
    },
    getOptionsHasReward() {
      return [
        {
          "label": "I offer some cash",
          "value": 1
        },
        {
          "label": "I offer some other help",
          "value": 2
        },
        {
          "label": "I need some cash or help",
          "value": 3
        },
        {
          "label": "I need some cash only",
          "value": 4
        },
        {
          "label": "I need some help only",
          "value": 5
        }
      ]
    }
  },
  methods: {
    setType(value) {
      this.formType = value
    },
    setReward(value) {
      this.formReward = value
    },
    setPlace(place) {
      this.place = place
      this.formPlace = place.formatted_address
      this.formPosition = place.geometry.location
      this.recenterMap(this.place.geometry.location)
      this.updateMaker(null, this.place.geometry.location)
    },
    geolocation: function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    updateMaker: function(event, center) {
      this.markers[0].position = {
        lat: (center && center.lat()) || event.latLng.lat(),
        lng: (center && center.lng()) || event.latLng.lng()
      }
      this.formPosition = this.markers[0].position
    },
    recenterMap(center) {
      this.currentLocation.lat = center.lat()
      this.currentLocation.lng = center.lng()
    }
  },
  mounted: function() {
    this.geolocation()
  }
}
</script>

<style lang="scss">
.find-a-hero {
  padding: 2rem;

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
</style>
