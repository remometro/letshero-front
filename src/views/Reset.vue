<template>
  <main class="reset">
    <ValidationObserver ref="observer" >
    <form action="" class="reset__form" @submit="clickEdit" ref="reset__form">
      <div class="reset__form__fields">
        <validation-observer class="lh--input--observer">
          <validation-provider name="password" class="lh--input--text reset__form__pass" rules="min:6" v-slot="{ errors }">
            <label for="reset__form__user__input">new Password</label>
            <input type="password" v-model="formPass" placeholder="******" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider name="confirmation pass" class="lh--input--text reset__form__pass" rules="min:6|password:@password" v-slot="{ errors }">
            <label for="reset__form__user__input">Confirm new password</label>
            <input type="password" v-model="formPassVer" placeholder="******" />
            <span class="lh--error--message">{{ errors[0] }}</span>
          </validation-provider>
        </validation-observer>
      </div>
      <div class="lh--alert lh--alert--warning" v-if="editError || hasErrors"><span class="error-message" v-if="editError && !hasErrors">{{editErrorMessage}}</span><span class="error-message" v-if="hasErrors && !editError">{{generalError}}</span></div>
      <button class="lh--button reset__form__submit">
        {{ !isEditing && (!notEditMode ? "Save" : "Edit") }} <img class="lh--spinner-btn" src="../assets/imgs/spinner.svg" v-if="isEditing" />
      </button>
    </form>
    </ValidationObserver>
  </main>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: "reset",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      formPass: null,
      formPassVer: null,
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
      this.editProfile(event)
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
        let payload = { token: this.$route.params.token, username: this.formUser && this.formUser.toLowerCase(), new_password: this.formPass, new_password_ver: this.formPassVer, data: { email: this.formEmail, whatsapp: this.formWhatsappRaw, paypal: this.formPaypal, gender: this.formGender } }
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
.reset {
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
