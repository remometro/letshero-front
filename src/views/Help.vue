<template>
  <main class="help" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="help__table">
        <div class="help__table__item" :class="{itemUrgent: help.category.urgency == 1, itemMediumUrgent: help.category.urgency == 2, itemNonUrgent: help.category.urgency == 3 }">
          <span class="list__table__item__img"></span>
          <h2 class="help__table__item__header">{{help.user.username}}<img class="lh--badge" v-if="help.user.account_type > 0" :src="require('../assets/imgs/badge.svg')" /> needs help with {{help.category.main_category}}</h2>
          <p class="help__table__item__description">{{help.category.custom_description}}</p>

          <p class="help__table__item__reward">{{getRewardText(help.user.data.gender, help.reward)}}</p>

          <a v-if="help.category.customLink" :href="help.category.customLink" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">View {{treatmentOf(help.user.data.gender)}} video</a>

          <a v-if="!alreadyHelping()" href="#" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Help {{treatmentTo(help.user.data.gender)}}</a>
          <router-link v-else :to="'/who-im-helping/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">I'm already helping {{treatmentTo(help.user.gender)}}, see who I'm helping instead.</router-link>

          <a v-if="alreadyHelping()" :href="`https://api.whatsapp.com/send?phone=${encodeURIComponent(help.user.whatsapp)}&text=Hello,%20my%20Hero%20name%20is%20${me.user.name}%20and%20I%20want%20to%20help%20you%20with%20${encodeURIComponent(help.category.mainCategory)}:%20https://staging.letshero.com/help/829831`" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Contact {{treatmentTo(help.user.data.gender)}}</a>

          <a v-if="help.reward.active && help.reward.value < 0 && alreadyHelping()" :href="`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${help.user.paypal}&tax=0&currency=USD&item_name=LetsHeroDonation&item_number=${help.id}&quantity=1&return=${this.$store.state.baseUrl}/success/${help.id}`" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">Donate to {{treatmentTo(help.user.data.gender)}}</a>

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
      return this.$store.state.allHelpsData
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    help() {
      return this.entries.filter((el) => {
        return el._id === this.$route.params.id
      })[0]
    },
    me() {
      return this.$store.state.userData
    }
  },
  methods: {
    treatment(gender) {
      let treatment = "It"
      switch (gender) {
      case 1:
        treatment = "He"
        break
      case 2:
        treatment = "She"
        break
      case 3:
        treatment = "It"
        break
      }
      return treatment
    },
    treatmentOf(gender) {
      let treatment = "Its"
      switch (gender) {
      case 1:
        treatment = "His"
        break
      case 2:
        treatment = "Her"
        break
      case 3:
        treatment = "Its"
        break
      }
      return treatment
    },
    treatmentTo(gender) {
      let treatment = "It"
      switch (gender) {
      case 1:
        treatment = "Him"
        break
      case 2:
        treatment = "Her"
        break
      case 3:
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
      let text = ''
      switch (reward.type) {
      case 1:
        text = `${this.treatment(gender)} offers up to ${reward.value} USD in reward.`
        break
      case 2:
        text = `${this.treatment(gender)} offers ${reward.other_reward} in reward.`
        break
      case 3:
        text = `${this.treatment(gender)} needs up to ${reward.value} USD in assistance or some other help.`
        break
      case 4:
        text = `${this.treatment(gender)} needs up to ${reward.value} USD in assistance.`
        break
      case 5:
        text = `${this.treatment(gender)} only needs help, no cash involved.`
        break
      }
      return text
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

      &__header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }

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
