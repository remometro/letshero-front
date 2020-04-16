<template>
  <main class="profile" v-if="isLoggedIn">
    <div class="lh-container">
      <div class="profile__data">
        <h2 class="profile__data__welcome">
          <span class="profile__data__welcome__thin">
              {{profile.username}}, {{str.youre}}
          </span><br/>
          {{getTitle(profile.stats.title_id)}}
        </h2>
        <div class="profile__data__awards">
          <div class="profile__data__awards__points profile__data__awards--content"><img src="@/assets/imgs/points.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.points}}</div>
          <div class="profile__data__awards__medals profile__data__awards--content"><img src="@/assets/imgs/medals.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.medals}}</div>
          <div class="profile__data__awards__trophees profile__data__awards--content"><img src="@/assets/imgs/trophees.svg" alt="" class="profile__data__awards__img"/>{{profile.stats.trophees}}</div>
        </div>
        <!-- <div class="profile__data__graphs">
          <img src="@/assets/imgs/dummy-graphic.svg" alt="" class="profile__data__graphs__dummygraph">
          <img src="@/assets/imgs/dummy-graphic.svg" alt="" class="profile__data__graphs__dummygraph">
        </div> -->
      </div>
    </div>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
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
      return this.$store.state.userData
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    str() {
      return this.$store.state.localeStrings.profile
    }
  },
  methods: {
    getTitle(id) {
      let title = ''
      switch (id) {
      case 0:
        title = this.str.app
        break
      case 1:
        title = this.str.fellow
        break
      }
      return title
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
