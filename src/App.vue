<template>
  <div id="app">
    <div id="nav-logged" class="nav" v-if="isLogged">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/bookings">Bookings</router-link>
    </div>
    <div id="nav-unlogged" class="nav" v-else>
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      serverURL: String
    }
  },
  mounted () {
    this.serverURL = window.serverURL
    this.$store.dispatch('checkLogin')
  },
  computed: {
    isLogged () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav-logged {
  background-color: #f9f9f9;
  color: #333333;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav-unlogged {
  position: absolute;
  font-family: $font-main;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 12px;

  a {
    color: #f9f9f9;
    letter-spacing: 2px;

    &:visited, &:focus, &:active {
      color: #f9f9f9;
    }
  }
}

.nav {
  padding: 10px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
