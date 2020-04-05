<template lang="pug">
  main
    .login
      form.login__form(:action="serverURL+'/api-v1/login'", method="POST" v-if="!isLoggedIn")
        .field
          label.login__form__username--label='Username'
          input.login__form__username(name='username', v-model='uname')
        .field
          label.login__form__password--label='Password'
          input.login__form__password(name='password', type="password", v-model='pwd')
        button(type='submit', @click='login')='Submit'
      .logout(v-else='')
        span="You're already logged in."
        button(@click="logout")="Log out."

</template>

<script>
export default {
  props: {
    serverURL: String
  },
  mounted() {
    this.serverURL = window.serverURL
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

<style scoped lang="scss">
  .login {
    &__form {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;

      .field {
        display: flex;

        label {
          width: 30%;
        }

        input {
          width: 70%;
        }
      }
    }
  }
</style>
