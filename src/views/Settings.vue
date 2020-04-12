<template>
  <main class="settings" v-if="isLoggedIn">
    <ValidationObserver ref="observer" >
    <form action="" class="settings__form" @submit="clickEdit" ref="settings__form">
      <div class="settings__form__fields" :class="{ isLocked: notEditMode }">
        <validation-provider name="heroname" class="lh--input--text settings__form__user" rules="alpha_dash|min:3|max:12|checkusername" v-slot="{ errors }">
          <label for="settings__form__user__input">Heroname</label>
          <input type="text" :disabled="notEditMode" :placeholder="me.username" v-model="formUser"/>
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <!-- <validation-provider name="old password" rules="required" class="lh--input--text settings__form__pass"  v-slot="{ errors }">
          <label for="settings__form__user__input">Old Password*</label>
          <input type="password" :disabled="notEditMode" placeholder="**I***" v-model="formOldPass" />
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider> -->
        <validation-observer class="lh--input--observer">
          <validation-provider name="password" class="lh--input--text settings__form__pass" rules="min:6" v-slot="{ errors }">
            <label for="settings__form__user__input">new Password</label>
            <input type="password" v-model="formPass" placeholder="******" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider name="confirmation pass" class="lh--input--text settings__form__pass" rules="min:6|password:@password" v-slot="{ errors }">
            <label for="settings__form__user__input">Confirm new password</label>
            <input type="password" v-model="formPassVer" placeholder="******" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
        </validation-observer>
        <validation-provider name="email" rules="email" v-slot="{ errors }" class="lh--input--text settings__form__email">
          <label for="settings__form__user__email">Email</label>
          <input type="email" v-model="formEmail" :placeholder="me.data.email" :disabled="notEditMode"/>
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="paypal email" rules="email" class="lh--input--text settings__form__paypal" v-slot="{ errors }">
          <label for="settings__form__user__paypal">paypal merchant Email</label>
          <input type="email" v-model="formPaypal" :placeholder="me.data.paypal" :disabled="notEditMode"/>
          <span class="lh--error--message">{{ errors[0] }}</span>
        </validation-provider>
        <LH-Dropdown :key="notEditMode ? '1' : '0'" fieldName="gender" rules="" ref="typeOpen" label="What do you identify with?" :disabled="notEditMode" :options="getOptionsGender" @selected="setGender" :placeholder="getGender()" />
        <div class="lh--input--text settings__form__whatsapp">
          <label for="settings__form__user__email">What's your whatsapp number?</label>
          <vue-tel-input :key="notEditMode ? '1' : '0'" :disabled="notEditMode" type="tel" :placeholder="me.data.whatsapp" ref="tel" @input="setPhone($event)" :disabledFormatting="true" v-model="formWhatsapp" :validCharactersOnly="true" v-bind="{ mode: 'national'}" />
        </div>
      </div>
      <div class="lh--alert lh--alert--warning" v-if="editError || hasErrors"><span class="error-message" v-if="editError && !hasErrors">{{signupErrorMessage}}</span><span class="error-message" v-if="hasErrors && !editError">{{generalError}}</span></div>
      <button class="lh--button settings__form__submit">
        {{ !isEditing && (!notEditMode ? "Save" : "Edit") }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isEditing" />
      </button>
      <router-link to="/login" class="lh--link--black settings__form__existing">Delete hero?</router-link>
    </form>
    </ValidationObserver>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import LHDropdown from "./components/LH-Dropdown"
import Login from "./Login"
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: "Settings",
  components: {
    LHDropdown,
    Login,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      formGender: null,
      notEditMode: true,
      formUser: null,
      formEmail: null,
      formOldPass: null,
      formPass: null,
      formPassVer: null,
      formPaypal: null,
      formWhatsapp: null,
      formWhatsappRaw: null,
      hasErrors: false
    }
  },
  computed: {
    me() {
      return this.$store.state.userData
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
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
    editError() {
      return this.$store.state.editError
    },
    editErrorMessage() {
      return this.$store.state.editErrorMessage
    },
    isEditing() {
      return this.$store.state.isEditing
    }
  },
  methods: {
    setGender(value) {
      this.formGender = value.value
    },
    clickEdit(event) {
      if (this.notEditMode) {
        this.toggleEditMode()
      } else if (!this.notEditMode) {
        this.editProfile(event)
      }
    },
    getGender() {
      let gender = this.getOptionsGender.filter(el => {
        console.log(el.value.value)
        return el.value.value === Number(this.me.data.gender)
      })[0].label
      return gender
    },
    toggleEditMode() {
      console.log("toggle edit mode")
      this.notEditMode = !this.notEditMode
    },
    setPhone(e) {
      this.formWhatsappRaw = this.$refs.tel.phoneObject.number.e164
    },
    async editProfile(e, invalid) {
      console.log("editiing")
      e.preventDefault()
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.hasErrors = false
        let payload = { username: this.formUser && this.formUser.toLowerCase(), new_password: this.formPass, new_password_ver: this.formPassVer, data: { email: this.formEmail, whatsapp: this.formWhatsappRaw, paypal: this.formPaypal, gender: this.formGender } }
        this.$store.dispatch('editProfile', payload)
        this.toggleEditMode()
        this.formUser = null
        this.formEmail = null
        this.formOldPass = null
        this.formPass = null
        this.formPassVer = null
        this.formPaypal = null
        this.formWhatsapp = null
        this.formWhatsappRaw = null
        this.formGender = null
      } else {
        this.hasErrors = true
        this.generalError = "Form has errors! Please fix them and try again."
      }
    }
  }
}
</script>

<style lang="scss">
.settings {
  height: 100vh;
  padding: 2rem;

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &__fields {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    &__fields.isLocked {
      background-color: lightgray;
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      border-radius: 8px;

    }

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
