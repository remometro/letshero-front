<template>
  <main class="signup">
    <ValidationObserver v-slot="{ invalid }" v-if="!isLoggedIn">
      <form action="" class="signup__form" @submit="signUp($event, invalid)">
        <validation-provider name="heroname" class="lh--input--text signup__form__user" rules="required|alpha_dash|min:3|max:12|checkusername" v-slot="{ errors }">
          <label for="signup__form__user__input" @click="focusInput('user')">{{ str.name }}</label>
          <input type="text" v-model="formUser" :name="str.name" @change="checkUsername" ref="user" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-observer class="lh--input--observer">
          <validation-provider name="password" class="lh--input--text signup__form__pass" rules="required|min:6" v-slot="{ errors }">
            <label for="signup__form__user__input" @click="focusInput('pass')">{{ str.pass }}</label>
            <input type="password" v-model="formPass" ref="pass" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider name="confirmation pass" class="lh--input--text signup__form__pass" rules="required|min:6|password:@password" v-slot="{ errors }">
            <label for="signup__form__user__input" @click="focusInput('pass_ver')">{{ str.pass_ver }}</label>
            <input type="password" v-model="formPassVer" ref="pass_ver" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
        </validation-observer>
        <validation-provider name="email" class="lh--input--text signup__form__email" rules="required|email" v-slot="{ errors }">
          <label for="signup__form__user__email" @click="focusInput('email')">{{ str.email }}</label>
          <input type="email" v-model="formEmail" ref="email" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="paypal email" class="lh--input--text signup__form__paypal" rules="email" v-slot="{ errors }">
          <label for="signup__form__user__paypal" @click="focusInput('paypal')">{{ str.paypal }}</label>
          <input type="email" v-model="formPaypal" ref="paypal" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <LH-Dropdown rules="required" fieldName="Gender" ref="typeOpen" :label="str.gender" :options="str.gender_options" @selected="setGender" />
        <validation-provider name="whatsapp number" class="lh--input--text signup__form__whatsapp" rules="required" v-slot="{ errors }">
          <label for="signup__form__user__whatsapp" @click="focusInput('tel')">{{ str.whatsapp }}</label>
          <vue-tel-input type="tel" placeholder="+55123456789" ref="tel" @input="setPhone($event)" :disabledFormatting="true" v-model="formWhatsapp" :validCharactersOnly="true" v-bind="{ mode: 'national'}" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <button class="lh--button lh--button--white signup__form__submit" @click="signUp($event, invalid)">
          {{ !isSigningUp ? str.cta : "" }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isSigningUp" />
        </button>
        <div class="lh--alert lh--alert--warning" v-if="signupError || hasErrors"><span class="error-message" v-if="signupError && !hasErrors">{{signupErrorMessage}}</span><span class="error-message" v-if="hasErrors && !signupError">{{generalError}}</span></div>
        <router-link to="/login" class="lh--link--white signup__form__existing">{{ str.existing }}</router-link>
      </form>
    </ValidationObserver>
    <div class="signup__islogged" v-else>
      <h1 class="signup__islogged__welcome">
        {{ str.welcome }}
      </h1>
      <router-link :to="'/list/'" class="help__table__item__cta--back lh--link lh--link--white" @click.stop="">{{ str.now_be }}</router-link>
      <router-link class="lh--link--white login__islogged__logout" to="/logout" @click.native="logout">{{ str.or_logout }}</router-link>
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
      formWhatsappRaw: null,
      hasErrors: false,
      generalError: ''
    }
  },
  computed: {
    str() {
      return this.$store.state.localeStrings.sign
    },
    getOptionsGender() {
      return [
        {
          "label": "Male",
          "value": { "value": 1 }
        },
        {
          "label": "Female",
          "value": { "value": 2 }
        },
        {
          "label": "Other",
          "value": { "value": 3 }
        }
      ]
    },
    isUsernameValid() {
      return this.$store.state.validCandidate
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
    focusInput(ref) {
      this.$refs[ref].focus()
    },
    setGender(value) {
      this.formGender = value.value
    },
    signUp(e, invalid) {
      e.preventDefault()
      if (!invalid) {
        this.hasErrors = false
        let payload = { username: this.formUser.toLowerCase(), password: this.formPass, password_verify: this.formPassVer, email: this.formEmail, whatsapp: this.formWhatsappRaw, paypal: this.formPaypal, gender: this.formGender }
        this.$store.dispatch('signUp', payload)
      } else {
        this.hasErrors = true
        this.generalError = "Form has errors! Please fix them and try again."
      }
    },
    checkUsername() {
      let payload = { candidate: this.formUser }
      this.$store.dispatch("checkUsername", payload)
    },
    setPhone(e) {
      this.formWhatsappRaw = this.$refs.tel.phoneObject.number.e164
    }
  }
}
</script>

<style lang="scss">
.vue-tel-input {
  border: none !important;
}
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
    color: $color-white;
  }

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &__existing {
      margin: 1rem;
      &:link {
        color: $color-white;
        font-size: 12px;
      }
    }
  }
}
</style>
