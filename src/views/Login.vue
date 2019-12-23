<template lang="pug">
  main
    .login
      form.login__form(:action="serverURL+'/api-v1/login'", method="POST")
        .field
          label.login__form__username--label='Username'
          input.login__form__username(name='username', v-model='uname')
        .field
          label.login__form__password--label='Password'
          input.login__form__password(name='password', type="password", v-model='pwd')
        button(type='submit', @click='login')='Submit'
</template>

<script>
import axios from 'axios'

export default {
  props: {
    serverURL: String
  },
  mounted () {
    this.serverURL = window.serverURL
  },
  methods: {
    login (e) {
      e.preventDefault()
      let url = `${window.serverURL}/api-v1/login`
      console.log('fetching..', url)
      var fetchOptions = {
        method: 'POST',
        body: { username: this.uname, password: this.pwd }
      }
      axios.post(url, fetchOptions.body)
        .then(res => {
          if (res.ok) {

          }
        })
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
