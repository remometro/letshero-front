<template>
  <main class="find-a-hero">
    <form action="" class="find-a-hero__form">

      <LH-Dropdown ref="typeOpen" label="What do you need?" :options="getTypesOfHelp" @selected="setType" />
      <LH-Dropdown ref="typeOpen" label="Do you offer/need some money?" :options="getOptionsHasReward" @selected="setReward" />
      <div class="lh--input--text find-a-hero__form__reward" v-if="formReward && formReward !== 4">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" min="1" step="1" v-model="formAmount" />
      </div>
      <div class="lh--input--text find-a-hero__form__where">
        <label for="find-a-hero__form__where__label">Where are you at the moment?</label>
        <!--<input type="text" required v-model="formWhere" @change="getPlaces" /> -->
        <GmapAutocomplete />
      </div>
      <div class="lh--input--text find-a-hero__form__why">
        <label for="find-a-hero__form__where__label">Please describe in a few words why you need help.</label>
        <textarea class="lh--input--textarea" type="text" required maxlength="256" rows="5" v-model="formWhy" />
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
import axios from 'axios'
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
      formWhere: null,
      formWhy: null
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
          "label": "I need some cash or help",
          "value": 2
        },
        {
          "label": "I need some cash only",
          "value": 3
        },
        {
          "label": "I need some help only",
          "value": 4
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
    getPlaces() {
      let token = this.$store.state.sessionToken
      let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(this.formWhere)}&key=&sessiontoken=${token}`

      axios.get(url, { mode: 'no-cors' })
        .then(res => {
          if (res.statusText === 'OK') {
            console.log('fetched places results data.')

            res.json()
              .then(parRes => {
                console.log(parRes)
              })
          }
        })
    }
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
