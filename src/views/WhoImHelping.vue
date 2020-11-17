<template>
  <main class="helped-me" v-if="isLoggedIn">
    <div class="lh-container">
      <h2 class="helped-me__title">{{str.im_helping}}</h2>
      <div class="helped-me__table" v-if="entries.length">
        <div class="helped-me__table__item" :key="item.id" v-for="(item, i) in entries" @click="openTab(i)">
          <div class="helped-me__table__item" :class="{itemUrgent: item.category.urgency == 1, itemMediumUrgent: item.category.urgency == 2, itemNonUrgent: item.category.urgency == 3 }">
            <div class="helped-me__table__item__top">
              <div class="helped-me__table__item__top__left">
                <span class="helped-me__table__item__img"></span>
                <span class="helped-me__table__item__title">{{item.user.username}}<img class="lh--badge" v-if ="item.user.data.account_type > 0" :src="require('../assets/imgs/badge-small.svg')" /> {{str.needs}} {{category(item)}}</span>
              </div>
              <button class="helped-me__table__item__expand" :class="{itemOpened: i === tabOpened}"></button>
            </div>
            <div class="helped-me__table__item__bottom" :class="{itemOpened: i === tabOpened}">
              <router-link :to="'/help/' + item._id" class="helped-me__table__item__cta lh--button lh--button--black" @click.stop="">{{str.know_more}}</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="helped-me__nothing" v-else>
          {{str.nothing}}
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
      return this.$store.state.userData.im_helping.filter((el) => {
        return el.stats.completed === false
      })
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    str() {
      return this.$store.state.localeStrings.list
    },
    out_str() {
      return this.$store.state.localeStrings
    }
  },
  methods: {
    treatment(gender) {
      let treatment = this.out_str.help.id
      switch (gender) {
      case 1:
        treatment = this.out_str.help.he
        break
      case 2:
        treatment = this.out_str.help.she
        break
      case 3:
        treatment = this.out_str.help.it
        break
      }
      return treatment
    },
    treatmentOf(gender) {
      let treatment = this.out_str.help.its
      switch (gender) {
      case 1:
        treatment = this.out_str.help.his
        break
      case 2:
        treatment = this.out_str.help.hers
        break
      case 3:
        treatment = this.out_str.help.its
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
      let text = ''
      switch (reward.type) {
      case 1:
        text = `${this.treatment(gender) + " " + this.out_str.help.that_offers} ${reward.value} ${this.out_str.help.usd} ${this.out_str.help.in_reward}`
        break
      case 2:
        text = `${this.treatment(gender) + " " + this.out_str.help.that_offers} ${reward.other_reward} ${this.out_str.help.in_reward}.`
        break
      case 3:
        text = `${this.treatment(gender) + " " + this.out_str.help.that_needs} ${reward.value} ${this.out_str.help.usd} ${this.out_str.help.in_assistance} ${this.out_str.help.or_some_other}.`
        break
      case 4:
        text = `${this.treatment(gender) + " " + this.out_str.help.that_needs} ${reward.value} ${this.out_str.help.usd} ${this.out_str.help.in_assistance}.`
        break
      case 5:
        text = `${this.treatment(gender) + " " + this.out_str.help.only} ${this.out_str.help.needs} ${this.out_str.help.help_no_cash}.`
        break
      }
      return text
    },
    getIsHelpingText(helper) {
      let text = ''
      switch (helper.hasHelped) {
      case 0:
        text = `Has ${helper.name} helped you?`
        break
      case 1:
        text = helper.name + " has helped me"
        break
      case -1:
        text = helper.name + " has not helped"
      }
      return text
    },
    category(help) {
      return this.out_str.find_a_hero.need_options.filter(el => {
        return el.value.value === help.category.main_category_id
      })[0].label
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
  &__nothing {
    padding: 2rem 0;
    max-width: 80%;
    margin: 0 auto;
    color: $color-white;
  }
  &__title {
    padding-top: 2rem;
    color: $color-white;
  }
  &__table {
    padding: 2rem 0;
    max-width: 80%;
    margin: 0 auto;
    &__item {
      background-color: $color-white;
      color: $color-black;
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
        background: url(../assets/imgs/plus.svg) center center no-repeat;
        margin-left: 1rem;

        &.itemOpened {
          background: url(../assets/imgs/minus.svg) center center no-repeat;
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
