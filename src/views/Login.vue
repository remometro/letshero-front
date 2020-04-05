<template>
  <main class="login">
    <form action="" class="login__form">
      <div class="lh--input--text login__form__user">
        <label for="login__form__user__input">Heroname</label>
        <input type="text" />
      </div>
      <div class="lh--input--text login__form__pass">
        <label for="login__form__user__input">Password</label>
        <input type="password" />
      </div>
      <button class="lh--button login__form__submit">
        Log In
      </button>
      <router-link to="/signup" class="login__form__new">Existing hero?</router-link>
      <router-link to="/forgot" class="login__form__forgot">Forgot?</router-link>
    </form>
    <div class="lh--alert lh--alert--warning">Invalid username or password</div>

  </main>
</template>

<script>
export default {
  name: "login",
  components: {}
}
</script>

<style lang="scss">
.login {
  height: 100vh;
  padding: 2rem;

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
