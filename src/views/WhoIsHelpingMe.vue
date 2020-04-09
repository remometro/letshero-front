<template>
  <main class="helped-me" v-if="isLoggedIn">
    <div class="lh-container">
      <h2 class="helped-me__title">Who has helped me</h2>
      <div class="helped-me__table">
        <div class="helped-me__table__item" :key="item.id" v-for="(item, i) in entries" @click="openTab(i)">
          <div class="helped-me__table__item" :class="{itemUrgent: item.category.urgency == 1, itemMediumUrgent: item.category.urgency == 2, itemNonUrgent: item.category.urgency == 3 }">
            <div class="helped-me__table__item__top">
              <div class="helped-me__table__item__top__left">
                <span class="helped-me__table__item__img"></span>
                <span class="helped-me__table__item__title">I need {{item.category.main_category}}</span>
              </div>
              <button class="helped-me__table__item__expand" :class="{itemOpened: i === tabOpened}"></button>
            </div>
            <div class="helped-me__table__item__bottom" :class="{itemOpened: i === tabOpened}">
              <div class="helped-me__table__item__is-helping" :class="{hasHelped: helper.hasHelped === 1, notHelped: helper.hasHelped === -1, offeredHelp: helper.hasHelped === 0}"
                  v-for="helper in item.who_is_helping" :key="helper._id"
              >
                <span class="helped-me__table__item__is-helping__name">{{getIsHelpingText(helper)}}</span>
                <div class="helped-me__table__item__is-helping__buttons">
                  <button v-if="helper.hasHelped === 0" class="helped-me__table__item__is-helping__cancel" @click.stop="evaluateHelp(-1, item._id, helper._id )"><img src="../assets/imgs/exit-red.svg" /></button>
                  <button v-if="helper.hasHelped === 0" class="helped-me__table__item__is-helping__confirm" @click.stop="evaluateHelp(1, item._id, helper._id )"><img src="../assets/imgs/check-green.svg" /></button>
                  <button v-if="helper.hasHelped !== 0" class="helped-me__table__item__is-helping__undo" @click.stop="evaluateHelp(0, item._id, helper._id)">Undo</button>
                </div>
              </div>
              <button class="helped-me__table__item__cta lh--button lh--button--white" @click.stop="completeHelp(item._id)">Finish this help</button>
            </div>
          </div>
        </div>
      </div>
      <button class="helped-me__find-help" ><router-link to="/find-a-hero"><img src="@/assets/imgs/find-a-help.svg" alt="" class="helped-me__find-help--img"></router-link></button>
      <Subtitles isFixed="true" />
    </div>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
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
      return this.$store.state.userData.my_helps.filter((el) => {
        return el.stats.completed === false
      })
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
    },
    getIsHelpingText(helper) {
      let text = ''
      switch (helper.hasHelped) {
      case 0:
        text = `Has ${helper.user.username} helped you?`
        break
      case 1:
        text = helper.user.username + " has helped me"
        break
      case -1:
        text = helper.user.username + " has not helped"
      }
      return text
    },
    evaluateHelp(newStatus, helpId, helperId) {
      let payload = {
        help_id: helpId,
        helper_id: helperId,
        new_status: newStatus
      }
      this.$store.dispatch("evaluateHelp", payload)
    },
    completeHelp(helpId) {
      let payload = {
        help_id: helpId
      }
      this.$store.dispatch("completeHelp", payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.helped-me__find-help {
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
.helped-me {
  &__title {
    padding-top: 2rem;
    color: $color-black;
  }
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

      &__is-helping {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        width: 100%;
        border-radius: 8px;
        padding: .5rem 1rem;
        box-sizing: border-box;
        margin: 0.5rem 0;

        &__name {
          font-size: 10px;
          margin-left: .5rem;
        }

        &__buttons {
          display: flex;
        }
        &__confirm, &__cancel, &__undo {
          border: none;
          background: none;
          display: flex;
          font-family: $font-main;
          color: $color-black;
        }

        &.offeredHelp {
          background-color: $color-white;
          color: $color-black;
        }

        &.hasHelped {
          background-color: $color-green;
          color: $color-black;
        }

        &.notHelped {
          background-color: $color-red;
          color: $color-black;
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
    .helped-me__table__item__img {
      display: block;
      width: 35px;
      height: 35px;
      background: url(../assets/imgs/heart-red.svg) center center no-repeat;
    }

  }
  &MediumUrgent {
    .helped-me__table__item__img {
      display: block;
      width: 35px;
      height: 35px;
      background: url(../assets/imgs/heart-yellow.svg) center center no-repeat;
    }
  }

  &NonUrgent {
    .helped-me__table__item__img {
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
