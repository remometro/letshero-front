<template>
  <main class="settings" v-if="isLoggedIn">
    <form action="" class="settings__form">
      <div class="lh--input--text settings__form__user">
        <label for="settings__form__user__input">Heroname</label>
        <input type="text" :disabled="notEditMode" :value="me.user.name"/>

      </div>
      <div class="lh--input--text settings__form__pass">
        <label for="settings__form__user__input">Password</label>
        <input type="password" :disabled="notEditMode" placeholder="*****" />
      </div>
      <div class="lh--input--text settings__form__email">
        <label for="settings__form__user__email">Email</label>
        <input type="email" required :value="me.user.email" :disabled="notEditMode"/>
      </div>
      <div class="lh--input--text settings__form__paypal">
        <label for="settings__form__user__email">Payments Email</label>
        <input type="email" required :value="me.user.paypal" :disabled="notEditMode"/>
      </div>
      <LH-Dropdown ref="typeOpen" label="What do you identify with?" :disabled="notEditMode" :options="getOptionsGender" @selected="setGender" :placeholder="getGender()" />
      <div class="lh--input--text settings__form__email">
        <label for="settings__form__user__email">What's your whatsapp number?</label>
        <input type="tel" pattern="+^[0-9-+\s()]*$" v-mask="'+##############'" :disabled="notEditMode" :value="me.user.whatsapp" required>
      </div>
      <button class="lh--button settings__form__submit" @click.prevent="toggleEditMode">
        {{ !notEditMode ? "Save" : "Edit" }}
      </button>
      <router-link to="/login" class="lh--link--black settings__form__existing">Delete hero?</router-link>
    </form>
  </main>
  <main class="not-logged" v-else>
    <Login />
  </main>
</template>

<script>
import LHDropdown from "./components/LH-Dropdown"
import userData from "../../data/profile-data.json"
import Login from "./Login"
export default {
  name: "Settings",
  components: {
    LHDropdown,
    Login
  },
  data() {
    return {
      formGender: null,
      notEditMode: true
    }
  },
  computed: {
    me() {
      return userData
    },
    isLoggedIn() {
      return !!this.$store.state.isLoggedIn
    },
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
    }
  },
  methods: {
    setGender(value) {
      this.formGender = value
    },
    getGender() {
      let gender = this.getOptionsGender.filter(el => el.value === Number(this.me.user.gender))[0].label
      return gender
    },
    toggleEditMode() {
      this.notEditMode = !this.notEditMode
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
