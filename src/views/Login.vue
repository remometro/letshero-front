<template>
  <main class="login">
    <form action="" class="login__form" v-if="!isLoggedIn">
      <div class="lh--input--text login__form__user">
        <label for="login__form__user__input">{{ str.name }}</label>
        <input type="text" v-model="username" />
      </div>
      <div class="lh--input--text login__form__pass">
        <label for="login__form__user__input">{{str.pass}}</label>
        <input type="password" v-model="password" />
      </div>
      <button class="lh--button login__form__submit" @click="login">
        {{ !isLogging ? str.cta : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isLogging" />
      </button>
      <router-link to="/signup"  class="lh--link--black login__form__new">{{str.new}}</router-link>
      <router-link to="/forgot" class="lh--link--black login__form__forgot">{{str.forgot}}</router-link>
      <div class="lh--alert lh--alert--warning" v-if="loginError">{{loginErrorMessage}}</div>
    </form>

    <div class="login__islogged" v-else>
      <h1 class="login__islogged__welcome">
        {{str.welcome}}
      </h1>
      <router-link :to="'/list/'" class="help__table__item__cta--back lh--link lh--link--black" @click.stop="">{{str.now_be}}</router-link>
      <router-link :to="'/find-a-hero/'" class="help__table__item__cta--back lh--link lh--link--black" @click.stop="">{{str.find}}</router-link>
      <router-link class="lh--link--black login__islogged__logout" @click.native="logout">{{str.or_logout}}</router-link>
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
    },
    loginError() {
      return this.$store.state.loginError
    },
    loginErrorMessage() {
      return this.$store.state.loginErrorMessage
    },
    isLogging() {
      return this.$store.state.isLogging
    },
    str() {
      return this.$store.state.localeStrings.login
    }
  },
  methods: {
    login(e) {
      let payload = { username: this.username.toLowerCase(), password: this.password }
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

.lh--spinner-btn {
  width: 20px;
}
</style>
