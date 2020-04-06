<template>
  <main class="find-a-hero">
    <form action="" class="find-a-hero__form">

      <LH-Dropdown ref="typeOpen" label="What do you need?" :options="getTypesOfHelp" @selected="setType" :isOpen="typeOpen" />
      <LH-Dropdown ref="typeOpen" label="Do you offer a reward?" :options="getOptionsHasReward" @selected="setType" :isOpen="typeOpen" />
      <div class="lh--input--text find-a-hero__form__reward">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" min="1" step="1" />
      </div>
      <div class="lh--input--text find-a-hero__form__where">
        <label for="find-a-hero__form__where__label">Where do you need help?</label>
        <input type="text" required />
      </div>
      <button class="lh--button find-a-hero__form__submit">
        Find a Hero
      </button>

    </form>

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
      formTypeLabel: null,
      formTypeValue: null,
      typeOpen: false,
      formHasRewardLabel: null,
      formHasRewardValue: null,
      hasRewardOpen: false
    }
  },
  computed: {
    getTypesOfHelp() {
      return [
        {
          "label": "Food",
          "value": "1"
        },
        {
          "label": "Shelter",
          "value": "2"
        },
        {
          "label": "Medical Care",
          "value": "3"
        },
        {
          "label": "Companion",
          "value": "4"
        },
        {
          "label": "Other",
          "value": "5"
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
      this.formTypeLabel = value[1]
      this.formTypeValue = value[0]
      this.toggleSelect('typeOpen')
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
