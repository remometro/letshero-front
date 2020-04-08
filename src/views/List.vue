<template>
  <main class="list" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="list__table">
        <div class="list__table__item" :key="item.id" v-for="(item, i) in entries" @click="openTab(i)">
          <div class="list__table__item" :class="{itemUrgent: item.category.urgency == 3, itemMediumUrgent: item.category.urgency == 2, itemNonUrgent: item.category.urgency == 1 }">
            <div class="list__table__item__top">
              <div class="list__table__item__top__left">
                <span class="list__table__item__img"></span>
                <span class="list__table__item__title">{{item.user.name}} needs {{item.category.mainCategory}}</span>
              </div>
              <button class="list__table__item__expand" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}"></button>
            </div>
            <div class="list__table__item__bottom" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}">
              <div class="list__table__item__location">In {{item.location.placeName}}</div>
              <div class="list__table__item__distance">(2km away)</div>
              <div class="list__table__item__reward">{{getRewardText(item.user.gender, item.reward)}}
              </div>
              <router-link :to="'/help/' + item.id" class="list__table__item__cta lh--button lh--button--white" @click.stop="">Be {{treatmentOf(item.user.gender)}} hero</router-link>
            </div>
          </div>
        </div>
      </div>
      <button class="list__find-help" ><router-link to="/find-a-hero"><img src="@/assets/imgs/find-a-help.svg" alt="" class="list__find-help--img"></router-link></button>
      <Subtitles isFixed="true" />
    </div>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import data from "../../data/help-data.json"
import Subtitles from "./components/Subtitles"
import Login from "./Login"
export default {
  components: {
    Subtitles,
    Login
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
.list__find-help {
  display: block;
  width: 75px;
  height: 75px;
  background-size: cover;
  border: none;
  //background: url(../assets/imgs/find-a-help.svg) center center no-repeat;
  margin-left: 1rem;
  position: fixed;
  bottom: 110px;
  background: none;

  &--img {
    -webkit-filter: drop-shadow( -8px 8px 1px $color-black);
    filter: drop-shadow( -8px 8px 1px $color-black);
  }
}
.list {
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
      cursor: pointer;

      &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        &__left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }

      &__bottom {
        display: none;
        margin-top: 2rem;
        text-align: left;

        &.itemOpened {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: flex-start;
        }
      }

      &__expand {
        display: block;
        width: 35px;
        height: 35px;
        border: none;
        background: url(../assets/imgs/plus-white.svg) center center no-repeat;
        margin-left: 1rem;

        &.itemOpened {
          background: url(../assets/imgs/minus-white.svg) center center no-repeat;
        }
      }

      &__cta {
        align-self: center;
        margin-bottom: 0;
        margin-top: 3rem;
      }

      &__reward {
        margin-top: 1rem;
      }

      &__img {
        margin-right: .5rem;
      }
    }
  }
}

.item {
  &Urgent {
    .list__table__item__img {
      display: block;
      width: 35px;
      height: 35px;
      background: url(../assets/imgs/heart-red.svg) center center no-repeat;
    }

  }
  &MediumUrgent {
    .list__table__item__img {
      display: block;
      width: 35px;
      height: 35px;
      background: url(../assets/imgs/heart-yellow.svg) center center no-repeat;
    }
  }

  &NonUrgent {
    .list__table__item__img {
      display: block;
      width: 35px;
      height: 35px;
      background: url(../assets/imgs/heart-green.svg) center center no-repeat;
    }
  }
}
</style>
<style lang="scss" scoped>
.hp__footer {
  display: none;
}
</style>
