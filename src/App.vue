<template lang="pug">
  <div id="app">
    .nav
      .lh-container
        button.nav__toggle.desktop-hidden(@click="toggleNav",:class='{"nav-opened": isNavOpen}' )
        img.nav__logo(src="./assets/imgs/logo-hor-nobg.svg")
      .nav__links--wrapper(:class='{"nav-opened": isNavOpen}')
        .lh-container
          <div id="nav-logged" class="nav__links"  v-if="isLogged">
            <router-link class="nav__links__link" @click.native="toggleNav" to="/">Home</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/map">Map</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/list">List</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/who-im-helping">Who I'm Helping</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/who-is-helping-me">Who Is Helping me</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/profile">Profile</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/settings">Settings</router-link>
            <router-link class="nav__links__link" @click.native="logout" to="/logout">Logout</router-link>
            .bg.bg--menu
          </div>
          <div id="nav-unlogged" class="nav__links" v-else>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/">Home</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/signup">Sign Up</router-link>
            <router-link class="nav__links__link" @click.native="toggleNav" to="/login">Log In</router-link>
            .bg.bg--menu
          </div>
    <router-view/>
    .bg
    .hp__footer
      router-link.hp__footer__manifesto(to="/manifesto")="Read our manifesto."
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
    },
    logout(e) {
      e.preventDefault()
      this.$store.dispatch('logOut')
      this.toggleNav()
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
  height: 100px;
  z-index: 999;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  .lh-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
  }

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
    padding: 2rem;
    padding-left: 1rem;
    justify-items: flex-start;
    text-align: left;
    color: $color-white;
    overflow-y: scroll;
    z-index: 1;

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
        width: 100vw;
        background-color: $color-black;
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
  z-index: -1;
  position: fixed;
  height: 300px;
  width: 300px;
  opacity: 0.2;

  &--menu {
    z-index: 0;
  }
}

.nav {
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
    //position: absolute;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    height: 100px;
    position: relative;
    bottom: 0;

    &__manifesto {
      color: $color-white;
      font-size: 10px;
    }

    &__copy {
      max-width: 80%;
    }
  }
}
</style>
