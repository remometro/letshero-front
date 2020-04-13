<template>
  <main class="forgot">
    <validation-observer ref="observer">
      <form action="" class="forgot__form" v-if="!isLoggedIn">
        <validation-provider rules="required|email" class="lh--input--text forgot__form__user">
          <label for="forgot__form__user__input">What's your email?</label>
          <input type="text" v-model="forgotEmail" />
        </validation-provider>
        <button class="lh--button forgot__form__submit" @click="askReset">
          {{ !isAskingReset ? "Reset Password" : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isAskingReset" />
        </button>
        <div class="lh--alert lh--alert--hold" v-if="askedReset">If your user exists, an email has been sent to reset your password. Check your inbox.</div>
      </form>
    </validation-observer>
  </main>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: "forgot",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: function() {
    return {
      forgotEmail: null
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
    isAskingReset() {
      return this.$store.state.isAskingReset
    },
    askedReset() {
      return this.$store.state.askedReset
    },
    askingResetError() {
      return this.$store.state.askingResetError
    }
  },
  methods: {
    askReset(e) {
      e.preventDefault()
      let isValid = this.$refs.observer.validate()
      if (isValid) {
        let payload = { email: this.forgotEmail }
        this.$store.dispatch('askReset', payload)
      }
    }
  }
}
</script>

<style lang="scss">
.forgot {
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
