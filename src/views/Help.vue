<template>
  <main class="help" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="help__table" v-if="!loadingHelp">
        <div class="help__table__item" :class="{itemUrgent: help.category.urgency == 1, itemMediumUrgent: help.category.urgency == 2, itemNonUrgent: help.category.urgency == 3 }" >
          <span class="list__table__item__img"></span>
          <h2 class="help__table__item__header">{{(help.user._id !== me._id) ? help.user.username : str.you}}<img class="lh--badge" v-if="help.user.account_type > 0" :src="require('../assets/imgs/badge.svg')" /> {{(help.user._id !== me._id) ? str.needs_help : str.need_help}} {{category}}</h2>

          <p class="help__table__item__description">{{help.category.custom_description}}</p>

          <p class="help__table__item__reward">{{getRewardText(help.user.data.gender, help.reward)}}</p>

          <a v-if="help.category.customLink" :href="help.category.customLink" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">{{str.view}} {{treatmentOf(help.user.data.gender)}} {{str.video}}</a>

          <button v-if="!alreadyHelping && (help.user._id !== me._id)" href="#" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="helpSomeone">{{!assumingHelp ? `${str.help} ${treatmentTo(help.user.data.gender)}` : "" }}<img class="lh--spinner-btn" src="../assets/imgs/spinner-white.svg" v-if="assumingHelp" /></button>
          <router-link v-if="alreadyHelping && (help.user._id !== me._id)" :to="'/who-im-helping/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">{{str.im_already}} {{treatmentTo(help.user.gender)}}, {{str.see_who}}</router-link>

          <a v-if="alreadyHelping" :href="`https://api.whatsapp.com/send?phone=${encodeURIComponent(help.user.data.whatsapp)}&text=Hello,%20my%20Hero%20name%20is%20${me.username}%20and%20I%20want%20to%20help%20you%20with%20${encodeURIComponent(help.category.main_category)}:%20${this.$store.state.baseUrl}/help/${help._id}`" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">{{str.contact}} {{treatmentTo(help.user.data.gender)}}</a>

          <a v-if="hasDonation(help.reward) && help.reward.value && alreadyHelping" :href="`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${help.user.data.paypal}&tax=0&currency=USD&item_name=LetsHeroDonation&item_number=${help._id}&quantity=1&return=${this.$store.state.baseUrl}/success/${help.id}`" rel="noreferrer noopener" target="_blank" class="help__table__item__cta--message lh--button lh--button--white" @click.stop="">{{str.donate}} {{treatmentTo(help.user.data.gender)}}</a>

          <Social-Share :link="`${this.$store.state.baseUrl}/help/${help._id}`" :title="`${help.user.username} ${str.needs_your_help}`" />

          <router-link to="/map" class="help__table__item__cta--back lh--button lh--button--white">{{str.back_map}}</router-link>
          <router-link to="/list" class="help__table__item__cta--back lh--button lh--button--white">{{str.back_list}}</router-link>
        </div>
      </div>
      <img class="lh--spinner-btn" src="../assets/imgs/spinner-white.svg" v-else />
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
import SocialShare from "./components/LH-SocialShare"
export default {
  name: "Help",
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
  mounted() {
    let payload = this.$route.params.id
    this.$store.dispatch("fetchHelp", payload)
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    category() {
      return this.out_str.find_a_hero.need_options.filter(el => {
        return el.value.value === this.help.category.main_category_id
      })[0].label
    },
    help() {
      return this.$store.state.helpData
    },
    me() {
      return this.$store.state.userData
    },
    loadingHelp() {
      return this.$store.state.fetchingHelp
    },
    assumingHelp() {
      return this.$store.state.assumingHelp
    },
    alreadyHelping() {
      let amI = this.help.who_is_helping.findIndex(el => {
        return el.user === this.me._id
      })
      return amI > -1
    },
    str() {
      return this.$store.state.localeStrings.help
    },
    out_str() {
      return this.$store.state.localeStrings
    }
  },
  methods: {
    treatment(gender) {
      let treatment = this.str.id
      if (this.help.user._id === this.me._id) {
        treatment = this.str.you
      } else {
        switch (gender) {
        case 1:
          treatment = this.str.he
          break
        case 2:
          treatment = this.str.she
          break
        case 3:
          treatment = this.str.it
          break
        }
      }
      return treatment
    },
    treatmentOf(gender) {
      let treatment = this.str.its
      switch (gender) {
      case 1:
        treatment = this.str.his
        break
      case 2:
        treatment = this.str.hers
        break
      case 3:
        treatment = this.str.its
        break
      }
      return treatment
    },
    treatmentTo(gender) {
      let treatment = this.str.it
      if (this.help.user._id === this.me._id) {
        treatment = this.str.you
      } else {
        switch (gender) {
        case 1:
          treatment = this.str.him
          break
        case 2:
          treatment = this.str.her
          break
        case 3:
          treatment = this.str.it
          break
        }
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
        text = `${this.treatment(gender)} ${(this.help.user._id !== this.me._id) ? this.str.that_needs : this.str.you_need} ${reward.value} ${this.str.usd} ${this.str.in_reward}`
        break
      case 2:
        text = `${this.treatment(gender)} ${(this.help.user._id !== this.me._id) ? this.str.that_offers : this.str.you_offer} ${reward.other_reward} ${this.str.in_reward}.`
        break
      case 3:
        text = `${this.treatment(gender)} ${(this.help.user._id !== this.me._id) ? this.str.that_needs : this.str.you_need} ${reward.value} ${this.str.usd} ${this.str.in_assistance} ${this.str.or_some_other}.`
        break
      case 4:
        text = `${this.treatment(gender)} ${(this.help.user._id !== this.me._id) ? this.str.that_needs : this.str.you_need} ${reward.value} ${this.str.usd} ${this.str.in_assistance}.`
        break
      case 5:
        text = `${this.treatment(gender)} ${this.str.only} ${(this.help.user._id !== this.me._id) ? this.str.needs : this.str.need} ${this.str.help_no_cash}.`
        break
      }
      return text
    },
    hasDonation(reward) {
      let has = false
      switch (reward.type) {
      case 1:
        has = false
        break
      case 2:
        has = false
        break
      case 3:
        has = true
        break
      case 4:
        has = true
        break
      case 5:
        has = false
        break
      }
      return has
    },
    helpSomeone() {
      let payload = { help_id: this.help._id }
      this.$store.dispatch("helpSomeone", payload)
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
