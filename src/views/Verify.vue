<template>
  <main class="verify">
    <div class="verify__content">
      <div class="lh--alert lh--alert--hold" v-if="!verifyError && !verifySuccess">Verifying your email... <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" /></div>
      <div class="lh--alert lh--alert--warning" v-if="verifyError">Sorry, we couldn't verify your email.</div>
      <div class="lh--alert lh--alert--success" v-if="verifySuccess">Congratulations! Your email is now verified!
      </div>
      <div class="verify__cta" v-if="verifySuccess">
        <router-link :to="'/list/'" class="help__table__item__cta--back lh--link lh--link--black" @click.stop="">Now, be someone's hero</router-link>
        <router-link :to="'/find-a-hero/'" class="help__table__item__cta--back lh--link lh--link--black" @click.stop="">Find a hero</router-link>
        <a href="#" class="lh--link--black verify__content__logout" @click.native="logout">Or log out</a>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "Verify",
  components: {},
  data: function() {
    return {
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
    verifyError() {
      return this.$store.state.verifyError
    },
    verifySuccess() {
      return this.$store.state.verifySuccess
    }
  },
  methods: {
    logout(e) {
      e.preventDefault()
      this.$store.dispatch('logOut')
    }
  },
  mounted() {
    this.$store.dispatch('verifyEmail', this.$route.params.token)
  }
}
</script>

<style lang="scss">
.verify {
  padding: 2rem;
  color: $color-black;
}

.lh--spinner-btn {
  width: 20px;
}
</style>
