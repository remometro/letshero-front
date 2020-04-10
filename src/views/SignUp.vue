<template>
  <main class="signup">
    <form action="" class="signup__form" @submit="signUp" v-if="!isLoggedIn">

      <validation-provider class="lh--input--text signup__form__user" rules="required|alpha_dash|min:3|max:12" v-slot="{ errors }">
        <label for="signup__form__user__input">Heroname</label>
        <input type="text" v-model="formUser" name="heroname" data-vv-as="Hero Name" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <validation-observer class="lh--input--observer">
        <validation-provider name="password" class="lh--input--text signup__form__pass" rules="required|min:6" v-slot="{ errors }">
          <label for="signup__form__user__input">Password</label>
          <input type="password" required v-model="formPass" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="confirmpass" class="lh--input--text signup__form__pass" rules="required|min:6|password:@password" v-slot="{ errors }">
          <label for="signup__form__user__input">Confirm password</label>
          <input type="password" required v-model="formPassVer" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
      </validation-observer>
      <validation-provider name="email" class="lh--input--text signup__form__pass" rules="required|email" v-slot="{ errors }">
        <label for="signup__form__user__email">Email</label>
        <input type="email" required v-model="formEmail" />
        <span class="lh--error--message">{{ errors[0] }}</span>
      </validation-provider>
      <div class="lh--input--text signup__form__paypal">
        <label for="signup__form__user__paypal">Paypal email (to receive donations you must setup a PayPal merchant account with this email)</label>
        <input type="email" required v-model="formPaypal" />
      </div>
      <LH-Dropdown rules="required" fieldName="Gender" ref="typeOpen" label="What do you identify with?" :options="getOptionsGender" @selected="setGender" />
      <div class="lh--input--text signup__form__whatsapp">
        <label for="signup__form__user__whatsapp">What's your whatsapp number?</label>
        <input type="tel" pattern="+^[0-9-+\s()]*$" placeholder="+55123456789" v-mask="'+##############'" v-model="formWhatsapp" required>
      </div>
      <button class="lh--button signup__form__submit" @click="signUp">
        {{ !isSigningUp ? "Sign Up" : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isSigningUp" />
      </button>
      <div class="lh--alert lh--alert--warning" v-if="signupError">{{signupErrorMessage}}</div>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: "SignUp",
  components: {
    LHDropdown,
    ValidationProvider,
    ValidationObserver
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
    },
    isSigningUp() {
      return this.$store.state.isSigningUp
    },
    hasSignedUp() {
      return this.$store.state.hasSignedUp
    },
    signupError() {
      return this.$store.state.signupError
    },
    signupErrorMessage() {
      return this.$store.state.signupErrorMessage
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
.lh--input--observer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup {
  height: 100vh;
  padding: 2rem;
  overflow-y: auto;
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
