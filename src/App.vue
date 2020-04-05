<template lang="pug">
  <div id="app">
    .nav
      button.nav__toggle.desktop-hidden(@click="toggleNav",:class='{"nav-opened": isNavOpen}' )
      img.nav__logo(src="./assets/imgs/logo-hor-nobg.svg")
      .nav__links--wrapper(:class='{"nav-opened": isNavOpen}')
        <div id="nav-logged" class="nav__links"  v-if="isLogged">
          <router-link class="nav__links__link" to="/">Home</router-link>
          <router-link class="nav__links__link" to="/map">Map</router-link>
          <router-link class="nav__links__link" to="/list">List</router-link>
          <router-link class="nav__links__link" to="/profile">Profile</router-link>
          <router-link class="nav__links__link" to="/settings">Settings</router-link>
        </div>
        <div id="nav-unlogged" class="nav__links" v-else>
        <router-link class="nav__links__link" to="/signup">Sign Up</router-link>
          <router-link class="nav__links__link" to="/login">Log In</router-link>
        </div>
    <router-view/>
    .bg
    .hp__footer
      small.hp__footer__copy="© Copyright 2012-{{new Date().getUTCFullYear()}}"
      small="Irmãos Reale Desenvolvimento de Softwares Ltda."
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      serverURL: String,
      isNavOpen: false
    }
  },
  mounted() {
    this.serverURL = window.serverURL
    this.$store.dispatch("checkLogin")
  },
  computed: {
    isLogged() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: $font-main;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

.nav {
  background-color: $color-black;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  position: fixed;

  &__logo {
    max-width: 225px;
  }

  &__toggle {
    width: 35px;
    height: 35px;
    position: absolute;
    left: 1rem;
    background: url(./assets/imgs/hamburger.svg) center center no-repeat;
    border: none;
    background-color: none;

    &.nav-opened {
      background: url(./assets/imgs/exit.svg) center center no-repeat;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
    width: 100vw;
    opacity: 1;
    background-color: $color-black;
    padding: 2rem;
    padding-left: 1rem;
    justify-items: flex-start;
    text-align: left;
    color: $color-white;

    &__link {
      font-size: 2rem;
      text-decoration: none;
      margin: 0.5rem;

      &:link,
      &:visited {
        color: $color-white;
      }
    }

    &--wrapper {
      display: none;

      &.nav-opened {
        display: flex;
        flex-basis: 100%;
        position: absolute;
        top: 80px;
        left: 0;
      }
    }
  }
}

.bg {
  background-image: url("./assets/imgs/heart-transparent.svg");
  background-size: cover;
  background-position: center center;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  position: fixed;
  height: 300px;
  width: 300px;
  opacity: 0.2;
}

.nav {
  padding: 10px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
.hp {
  &__footer {
    height: fit-content;
    padding: 1em;
    color: #333333;
    font-family: $font-main;
    background-color: $color-black;
    color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    left: 0;

    &__copy {
      max-width: 80%;
    }
  }
}
</style>
