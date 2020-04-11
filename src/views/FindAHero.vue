<template>
  <main class="find-a-hero" v-if="isLoggedIn">
    <ValidationObserver v-slot="{ invalid }" ref="observer">
    <form action="" class="find-a-hero__form" @submit="addHelp($event, invalid)" v-if="!foundAHero">
      <LH-Dropdown rules="required" fieldName="necessity" ref="typeOpen" label="What do you need?" :options="getTypesOfHelp" @selected="setType" />
      <LH-Dropdown rules="required" fieldName="reward" ref="typeOpen" label="Do you offer/need some money?" :options="getOptionsHasReward" @selected="setReward" />
      <validation-provider :rules="formReward && formReward !== 5 && formReward !== 2 ? 'required' : ''" name="reward amount" v-slot="{ errors }" class="lh--input--text find-a-hero__form__reward" v-if="formReward && formReward !== 5 && formReward !== 2">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" v-model="formAmount" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider name="reward description" :rules="formReward && formReward === 2 ? 'required|max:32' : ''" class="lh--input--text find-a-hero__form__reward" v-if="formReward && formReward === 2" v-slot="{ errors }">
        <label for="find-a-hero__form__reward__label">What do you offer?</label>
        <input type="text" v-model="formRewardOther" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider class="lh--input--text find-a-hero__form__where" rules="required" name="location" v-slot="{ errors }" ref="location">
        <label for="find-a-hero__form__where__label">Where are you at the moment?</label>
        <input type="hidden" v-model="formPlace" />
        <GmapAutocomplete @blur="validateLocation" @place_changed="setPlace" />
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
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider name="description" rules="required" v-slot="{ errors }" class="lh--input--text find-a-hero__form__why">
        <label for="find-a-hero__form__where__label">Please describe in a few words why you need help.</label>
        <textarea class="lh--input--textarea" type="text" maxlength="256" rows="5" v-model="formWhy" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider name="video link" rules="isvideo" v-slot="{ errors }" class="lh--input--text find-a-hero__form__reward">
        <label for="find-a-hero__form__reward__label">Is there a video link explaining your need? (Youtube and Vimeo links only)</label>
        <input type="text" maxlength="128" v-model="formLink" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <button class="lh--button find-a-hero__form__submit">
        {{ !isFinding ? "Find a Hero" : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isFinding" />
      </button>
      <div class="lh--alert lh--alert--warning" v-if="findError">{{findErrorMessage}}</div>
      <div class="lh--alert lh--alert--warning" v-if="findError || hasErrors"><span class="error-message" v-if="findError && !hasErrors">{{signupErrorMessage}}</span><span class="error-message" v-if="hasErrors && !findError">{{generalError}}</span></div>
    </form>
    <div class="lh--alert lh--alert--success" v-else>Your hero is on the way, now you just have to wait!</div>
    <router-link class="lh--link lh--link--small lh--link--black" to="/list">Or be someone's hero.</router-link>
    </ValidationObserver>
  </main>
   <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import LHDropdown from "./components/LH-Dropdown"
import Login from "./Login"
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: "FindAHero",
  components: {
    LHDropdown,
    Login,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      formType: null,
      formTypeString: null,
      formTypeUrgency: null,
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
      place: null,
      hasErrors: false
    }
  },
  computed: {
    getTypesOfHelp() {
      return [
        {
          "label": "Food",
          "value": { "name": "Food", "value": 1, "urgency": 1 }
        },
        {
          "label": "Shelter",
          "value": { "name": "Shelter", "value": 2, "urgency": 1 }
        },
        {
          "label": "Medical Care",
          "value": { "name": "Medical Care", "value": 3, "urgency": 1 }
        },
        {
          "label": "Psychological Care",
          "value": { "name": "Psychological Care", "value": 4, "urgency": 1 }
        },
        {
          "label": "Companion",
          "value": { "name": "Companion", "value": 5, "urgency": 3 }
        },
        {
          "label": "Other",
          "value": { "name": "Other", "value": 6, "urgency": 2 }
        }
      ]
    },
    getOptionsHasReward() {
      return [
        {
          "label": "I offer some cash",
          "value": { "value": 1 }
        },
        {
          "label": "I offer some other help",
          "value": { "value": 2 }
        },
        {
          "label": "I need some cash or help",
          "value": { "value": 3 }
        },
        {
          "label": "I need some cash only",
          "value": { "value": 4 }
        },
        {
          "label": "I need some help only",
          "value": { "value": 5 }
        }
      ]
    },
    findError() {
      return this.$store.state.errorFindingAHero
    },
    findErrorMessage() {
      return this.$store.state.errorFindingAHeroMessage
    },
    isFinding() {
      return this.$store.state.isFindingAHero
    },
    foundAHero() {
      return this.$store.state.foundAHero
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    }
  },
  methods: {
    setType(value) {
      this.formType = value.value
      this.formTypeString = value.name
      this.formTypeUrgency = value.urgency
    },
    setReward(value) {
      this.formReward = value.value
      this.formRewardOther = null
      this.formAmount = null
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
    },
    async addHelp(e, invalid) {
      const isValid = await this.$refs.observer.validate()
      e.preventDefault()
      if (isValid && this.formPlace && this.place) {
        this.hasErrors = false
        let payload = {
          category: {
            main_category: this.formTypeString,
            main_category_id: this.formType,
            custom_description: this.formWhy,
            custom_link: this.formLink,
            urgency: this.formTypeUrgency
          },
          location: {
            lat: this.formPosition && this.formPosition.lat,
            lng: this.formPosition && this.formPosition.lng,
            place_name: this.formPlace
          },
          reward: {
            value: this.formAmount,
            type: this.formReward,
            other_reward: this.formRewardOther
          }
        }
        this.$store.dispatch("addHelp", payload)
      } else {
        this.hasErrors = true
        this.generalError = "Form has errors! Please fix them and try again."
        console.log("form with errors!")
      }
    },
    validateLocation(place) {
      this.formPlace = place.formatted_address
      this.$refs.location.validate()
    }
  },
  mounted: function() {
    this.$store.commit("resetFoundAHero")
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
