<template>
  <main class="find-a-hero">
    <form action="" class="find-a-hero__form">

      <LH-Dropdown ref="typeOpen" label="What do you need?" :options="getTypesOfHelp" @selected="setType" :isOpen="typeOpen" />
      <LH-Dropdown ref="typeOpen" label="Do you offer a reward?" :options="getOptionsHasReward" @selected="setReward" :isOpen="typeOpen" />
      <div class="lh--input--text find-a-hero__form__reward">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" min="1" step="1" v-model="formAmount" />
      </div>
      <div class="lh--input--text find-a-hero__form__where">
        <label for="find-a-hero__form__where__label">Where do you need help?</label>
        <input type="text" required v-model="formWhere" />
      </div>
      <div class="lh--input--text find-a-hero__form__why">
        <label for="find-a-hero__form__where__label">Please describe in a few words why you need help.</label>
        <textarea class="lh--input--textarea" type="text" required maxlength="256" rows="5" v-model="formWhy" />
      </div>
      <button class="lh--button find-a-hero__form__submit">
        Find a Hero
      </button>
    </form>
    <router-link class="lh--link lh--link--small" to="/list">Or be someone's hero.</router-link>

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
