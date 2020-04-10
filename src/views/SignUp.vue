<template>
  <main class="signup">
    <ValidationObserver v-slot="{ invalid }" v-if="!isLoggedIn">
      <form action="" class="signup__form" @submit="signUp($event, invalid)">
        <validation-provider class="lh--input--text signup__form__user" rules="required|alpha_dash|min:3|max:12" v-slot="{ errors }">
          <label for="signup__form__user__input">Heroname</label>
          <input type="text" v-model="formUser" name="heroname" data-vv-as="Hero Name" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-observer class="lh--input--observer">
          <validation-provider name="password" class="lh--input--text signup__form__pass" rules="required|min:6" v-slot="{ errors }">
            <label for="signup__form__user__input">Password</label>
            <input type="password" v-model="formPass" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider name="confirmation pass" class="lh--input--text signup__form__pass" rules="required|min:6|password:@password" v-slot="{ errors }">
            <label for="signup__form__user__input">Confirm password</label>
            <input type="password" v-model="formPassVer" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
        </validation-observer>
        <validation-provider name="email" class="lh--input--text signup__form__email" rules="required|email" v-slot="{ errors }">
          <label for="signup__form__user__email">Email</label>
          <input type="email" v-model="formEmail" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="paypal email" class="lh--input--text signup__form__paypal" rules="email" v-slot="{ errors }">
          <label for="signup__form__user__paypal">Paypal email (to receive donations you must setup a PayPal merchant account with this email)</label>
          <input type="email" v-model="formPaypal" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <LH-Dropdown rules="required" fieldName="Gender" ref="typeOpen" label="What do you identify with?" :options="getOptionsGender" @selected="setGender" />
        <validation-provider name="whatsapp number" class="lh--input--text signup__form__whatsapp" rules="required" v-slot="{ errors }">
          <label for="signup__form__user__whatsapp">What's your whatsapp number?</label>
          <input type="tel" placeholder="+55123456789" v-mask="'+##############'" v-model="formWhatsapp" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <button class="lh--button signup__form__submit" @click="signUp($event, invalid)">
          {{ !isSigningUp ? "Sign Up" : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isSigningUp" />
        </button>
        <div class="lh--alert lh--alert--warning" v-if="signupError || hasErrors"><span class="error-message" v-if="signupError && !hasErrors">{{signupErrorMessage}}</span><span class="error-message" v-if="hasErrors && !signupError">{{generalError}}</span></div>
        <router-link to="/login" class="lh--link--black signup__form__existing">Existing hero?</router-link>
      </form>
    </ValidationObserver>
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
      formWhatsapp: null,
      hasErrors: false,
      generalError: ''
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
    signUp(e, invalid) {
      e.preventDefault()
      if (!invalid) {
        this.hasErrors = false
        let payload = { username: this.formUser.toLowerCase(), password: this.formPass, password_verify: this.formPassVer, email: this.formEmail, whatsapp: this.formWhatsapp, paypal: this.formPaypal, gender: this.formGender }
        this.$store.dispatch('signUp', payload)
      } else {
        this.hasErrors = true
        this.generalError = "Form has errors! Please fix them and try again."
        console.log("form with errors!")
      }
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
