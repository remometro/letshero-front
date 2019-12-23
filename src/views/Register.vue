<template lang="pug">
  main
    .register
      form.register__form(:action="serverURL+'/api-v1/register'", method="POST")
        .field
          label.register__form__name--label='Name'
          input.register__form__name(name='name')
        .field
          label.register__form__email--label='Email'
          input.register__form__email(name='email')
        .field
          label.register__form__password1--label='Password'
          input.register__form__password1(name='password1', type="password")
        .field
          label.register__form__password2--label='Confirm Password'
          input.register__form__password2(name='password2', type="password")
        .field
          label.register__form__username--label='Username'
          input.register__form__username(name='username')
        button(type='submit')='Submit'
</template>

<script>
export default {
  props: {
    serverURL: String
  },
  mounted () {
    this.serverURL = window.serverURL
  }
}
</script>

<style scoped lang="scss">
  .register {
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
