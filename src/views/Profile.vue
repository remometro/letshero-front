<template>
  <main class="profile" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="profile__data">
        <h2 class="profile__data__welcome">
          <span class="profile__data__welcome__thin">
              {{profile.user.name}}, you're a
          </span><br/>
          {{profile.title.name}}
        </h2>
        <div class="profile__data__awards">
          <div class="profile__data__awards__points profile__data__awards--content"><img src="@/assets/imgs/points.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.points}}</div>
          <div class="profile__data__awards__medals profile__data__awards--content"><img src="@/assets/imgs/medals.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.medals}}</div>
          <div class="profile__data__awards__trophees profile__data__awards--content"><img src="@/assets/imgs/trophees.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.trophees}}</div>
        </div>
        <div class="profile__data__graphs">
          <img src="@/assets/imgs/dummy-graphic.svg" alt="" class="profile__data__graphs__dummygraph">
          <img src="@/assets/imgs/dummy-graphic.svg" alt="" class="profile__data__graphs__dummygraph">
        </div>
      </div>
    </div>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import data from "../../data/profile-data.json"
import Login from "./Login"
export default {
  components: {
    Login
  },
  data() {
    return {
      tabOpened: null
    }
  },
  computed: {
    profile() {
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
    }
  }
}
</script>

<style lang="scss">
.profile {
  color: $color-black;
  &__data {
    padding: 2rem 0;
    &__welcome {
      &__thin {
        font-family: $font-alt;
      }
    }

    &__awards {
      &--content {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        margin: 2rem 0;
      }
      &__img {
        margin-right: 1rem;
      }
    }
  }
}
</style>
