<template>
  <main class="login">
    <form action="" class="login__form" v-if="!isLoggedIn">
      <div class="lh--input--text login__form__user">
        <label for="login__form__user__input">Heroname</label>
        <input type="text" v-model="username" />
      </div>
      <div class="lh--input--text login__form__pass">
        <label for="login__form__user__input">Password</label>
        <input type="password" v-model="password" />
      </div>
      <button class="lh--button login__form__submit" @click="login">
        Log In
      </button>
      <router-link to="/signup" class="login__form__new">New hero?</router-link>
      <router-link to="/forgot" class="login__form__forgot">Forgot?</router-link>
      <div class="lh--alert lh--alert--warning">Invalid username or password</div>
    </form>

    <div class="login__islogged" v-else>
      <h1 class="login__islogged__welcome">
        Welcome hero!
      </h1>
      <router-link class="login__islogged__logout" to="/logout" @click.native="logout">Log out</router-link>
    </div>

  </main>
</template>

<script>
export default {
  name: "login",
  components: {},
  data: function() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    }
  },
  methods: {
    login(e) {
      let payload = { username: this.uname, password: this.pwd }
      e.preventDefault()
      this.$store.dispatch('logIn', payload)
    },
    logout(e) {
      e.preventDefault()
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style lang="scss">
.login {
  height: calc(100vh - 200px);
  padding: 2rem;
  color: $color-black;

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &__new, &__forgot {
      margin: 1rem;
      &:link {
        color: $color-black;
        font-size: 12px;
      }
    }
  }
}
</style>
