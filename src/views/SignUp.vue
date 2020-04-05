<template>
  <main class="signup">
    <form action="" class="signup__form">
      <div class="lh--input--text signup__form__user">
        <label for="signup__form__user__input">Heroname</label>
        <input type="text" />
      </div>
      <div class="lh--input--text signup__form__pass">
        <label for="signup__form__user__input">Password</label>
        <input type="password" />
      </div>
      <div class="lh--input--text signup__form__email">
        <label for="signup__form__user__email">Email</label>
        <input type="email" />
      </div>
      <button class="lh--button signup__form__submit">
        Sign up
      </button>
      <router-link to="/login" class="signup__form__existing">Existing hero?</router-link>

    </form>

  </main>
</template>

<script>
export default {
  name: "SignUp",
  components: {}
}
</script>

<style lang="scss">
.signup {
  height: 100vh;
  padding: 2rem;

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &__existing {
      margin: 1rem;
      &:link {
        color: $color-black;
        font-size: 12px;
      }
    }
  }
}
</style>
