<template>
  <main class="signup">
    <form action="" class="signup__form" @submit="signUp" v-if="!isLoggedIn">
      <div class="lh--input--text signup__form__user">
        <label for="signup__form__user__input">Heroname</label>
        <input type="text" required v-model="formUser" />
      </div>
      <div class="lh--input--text signup__form__pass">
        <label for="signup__form__user__input">Password</label>
        <input type="password" required v-model="formPass" />
      </div>
      <div class="lh--input--text signup__form__pass">
        <label for="signup__form__user__input">Confirm password</label>
        <input type="password" required v-model="formPassVer" />
      </div>
      <div class="lh--input--text signup__form__email">
        <label for="signup__form__user__email">Email</label>
        <input type="email" required v-model="formEmail" />
      </div>
      <div class="lh--input--text signup__form__paypal">
        <label for="signup__form__user__paypal">Paypal email (to receive donations you must setup a PayPal merchant account with this email)</label>
        <input type="email" required v-model="formPaypal" />
      </div>
      <LH-Dropdown ref="typeOpen" label="What do you identify with?" :options="getOptionsGender" @selected="setGender" />
      <div class="lh--input--text signup__form__whatsapp">
        <label for="signup__form__user__whatsapp">What's your whatsapp number?</label>
        <input type="tel" pattern="+^[0-9-+\s()]*$" placeholder="+55123456789" v-mask="'+##############'" v-model="formWhatsapp" required>
      </div>
      <button class="lh--button signup__form__submit" @click="signUp">
        Sign up
      </button>
      <router-link to="/login" class="lh--link--black signup__form__existing">Existing hero?</router-link>
    </form>
    <div class="signup__islogged" v-else>
      <h1 class="signup__islogged__welcome">
        Welcome hero!
      </h1>
      <router-link :to="'/list/'" class="help__table__item__cta--back lh--link lh--link--black" @click.stop="">Now, be someone's hero</router-link>
      <router-link class="lh--link--black login__islogged__logout" to="/logout" @click.native="logout">Or log out</router-link>
    </div>
  </main>
</template>

<script>
import LHDropdown from "./components/LH-Dropdown"
export default {
  name: "SignUp",
  components: {
    LHDropdown
  },
  data() {
    return {
      formGender: null,
      formUser: null,
      formEmail: null,
      formPass: null,
      formPassVer: null,
      formPaypal: null,
      formWhatsapp: null
    }
  },
  computed: {
    getOptionsGender() {
      return [
        {
          "label": "Male",
          "value": 1
        },
        {
          "label": "Female",
          "value": 2
        },
        {
          "label": "Other",
          "value": 3
        }
      ]
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    }
  },
  methods: {
    setGender(value) {
      this.formGender = value
    },
    signUp(e) {
      e.preventDefault()
      let payload = { username: this.formUser, password: this.formPass, password_verify: this.formPassVer, email: this.formEmail, whatsapp: this.formWhatsapp, paypal: this.formPaypal, gender: this.formGender }
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style lang="scss">
.signup {
  height: 100vh;
  padding: 2rem;

  &__islogged {
    color: $color-black;
  }

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
