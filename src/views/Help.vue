<template>
  <main class="help" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="help__table">
        <div class="help__table__item" :class="{itemUrgent: help.category.urgency == 3, itemMediumUrgent: help.category.urgency == 2, itemNonUrgent: help.category.urgency == 1 }">
          <span class="list__table__item__img"></span>
          <h2 class="help__table__item__header">{{help.user.name}} needs help with {{help.category.mainCategory}}</h2>
          <p class="help__table__item__description">{{help.category.customDescription}}</p>

          <p class="help__table__item__reward">{{getRewardText(help.user.gender, help.reward)}}</p>

          <a v-if="!alreadyHelping()" href="#" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Help {{treatmentTo(help.user.gender)}}</a>
          <router-link v-else :to="'/who-im-helping/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">I'm already helping {{treatmentTo(help.user.gender)}}, see who I'm helping instead.</router-link>

          <a href="#" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Contact {{treatmentTo(help.user.gender)}}</a>

          <a v-if="help.reward.active && help.reward.value < 0" href="#" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Donate to {{treatmentTo(help.user.gender)}}</a>

          <Social-Share />

          <router-link :to="'/list/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">Back to list</router-link>
          <router-link :to="'/map/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">Back to map</router-link>
          </div>
        </div>
      </div>
      <Subtitles isFixed="true" />
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import data from "../../data/help-data.json"
import userData from "../../data/profile-data.json"
import Subtitles from "./components/Subtitles"
import Login from "./Login"
import SocialShare from "./components/LH-SocialShare"
export default {
  components: {
    Subtitles,
    Login,
    SocialShare
  },
  data() {
    return {
      tabOpened: null
    }
  },
  computed: {
    entries() {
      return data
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    help() {
      return this.entries.filter((el) => {
        return el.id === this.$route.params.id
      })[0]
    },
    me() {
      return userData
    }
  },
  methods: {
    treatment(gender) {
      let treatment = "It"
      switch (gender) {
      case "1":
        treatment = "He"
        break
      case "2":
        treatment = "She"
        break
      case "3":
        treatment = "It"
        break
      }
      return treatment
    },
    treatmentOf(gender) {
      let treatment = "Its"
      switch (gender) {
      case "1":
        treatment = "His"
        break
      case "2":
        treatment = "Her"
        break
      case "3":
        treatment = "Its"
        break
      }
      return treatment
    },
    treatmentTo(gender) {
      let treatment = "Its"
      switch (gender) {
      case "1":
        treatment = "Him"
        break
      case "2":
        treatment = "Her"
        break
      case "3":
        treatment = "It"
        break
      }
      return treatment
    },
    alreadyHelping() {
      let amI = this.help.who_is_helping.findIndex(el => {
        return el.id === this.me.user.id
      })
      return amI > -1
    },
    openTab(i) {
      if (i === this.tabOpened) {
        this.tabOpened = -1
      } else {
        this.tabOpened = i
      }
    },
    getRewardText(gender, reward) {
      return reward.active ? reward.value === 0 ? `${this.treatment(gender)} can't afford a reward` : `${this.treatment(gender)} ${reward.value > 0 ? "offers" : "needs"} up to ${(reward.value > 0 ? reward.value : reward.value * -1) + reward.currency} in ${reward.value > 0 ? "reward" : "assistance"}.` : `No money involved in this.`
    }
  }
}
</script>

<style lang="scss" scoped>
.help {
  width: 100%;
  max-width: 100% !important;
  background-color: $color-black;
  color: $color-white;
  &__table {
    padding: 2rem 0;
    max-width: 80%;
    margin: 0 auto;
    &__item {
      background-color: $color-black;
      color: $color-white;
      margin: 1rem 0;
      padding: .5rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;

      &__cta {
        &--back {
          margin: 1rem 0;
        }
      }

     &__description {
       font-size: 12px;
     }
    }
  }
}

.item {
  &Urgent {
    .list__table__item__img {
      display: block;
      width: 130px;
      height: 130px;
      background: url(../assets/imgs/heart-big-red.svg) center center no-repeat;
      align-self: center;
    }

  }
  &MediumUrgent {
    .list__table__item__img {
      display: block;
      width: 130px;
      height: 130px;
      background: url(../assets/imgs/heart-big-yellow.svg) center center no-repeat;
      align-self: center;
    }
  }

  &NonUrgent {
    .list__table__item__img {
      display: block;
      width: 130px;
      height: 130px;
      background: url(../assets/imgs/heart-big-green.svg) center center no-repeat;
      align-self: center;
    }
  }
}
</style>
<style lang="scss" scoped>
.hp__footer {
  display: none;
}
</style>
