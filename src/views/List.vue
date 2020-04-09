<template>
  <main class="list" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="list__table">
        <div class="list__table__item" :key="item._id" v-for="(item, i) in entries" @click="openTab(i)">
          <div class="list__table__item" :class="{itemUrgent: item.category.urgency == 1, itemMediumUrgent: item.category.urgency == 2, itemNonUrgent: item.category.urgency == 3 }">
            <div class="list__table__item__top">
              <div class="list__table__item__top__left">
                <span class="list__table__item__img"></span>
                <span class="list__table__item__title">{{item.user.username}}<img class="lh--badge" v-if ="item.user.account_type > 0" :src="require('../assets/imgs/badge-small.svg')" /> needs {{item.category.main_category}}</span>
              </div>
              <button class="list__table__item__expand" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}"></button>
            </div>
            <div class="list__table__item__bottom" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}">
              <div class="list__table__item__location">In {{item.location.place_name}}</div>
              <div class="list__table__item__distance">({{currentLocation ? distance(currentLocation.lat, currentLocation.lng, item.location.lat, item.location.lng, "K").toLocaleString("en-US", { maximumFractionDigits: 0 }) + "KM Away": "Distance Unknown"}})</div>
              <div class="list__table__item__reward">{{getRewardText(item.user.data.gender, item.reward)}}
              </div>
              <router-link :to="'/help/' + item._id" class="list__table__item__cta lh--button lh--button--white" @click.stop="">Be {{treatmentOf(item.user.data.gender)}} hero</router-link>
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
import Subtitles from "./components/Subtitles"
import Login from "./Login"
export default {
  components: {
    Subtitles,
    Login
  },
  data() {
    return {
      tabOpened: null,
      currentLocation: null
    }
  },
  computed: {
    entries() {
      return this.sortData(this.$store.state.allHelpsData)
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    loading() {
      return this.$store.state.loadingList
    }
  },
  mounted() {
    this.$store.dispatch("fetchAllHelpData")
    this.mylocation()
  },
  updated() {
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
    },
    mylocation: function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    distance(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0
      } else {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist
      }
    },
    sortData(data) {
      return data.sort((a, b) => {
        if (this.currentLocation) {
          let distanceA = this.distance(Number(this.currentLocation.lat), Number(this.currentLocation.lng), Number(a.location.lat), Number(a.location.lng), "K")
          let distanceB = this.distance(Number(this.currentLocation.lat), Number(this.currentLocation.lng), Number(b.location.lat), Number(b.location.lng), "K")
          return distanceA - distanceB
        }
      })
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

      &__title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%
      }
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
