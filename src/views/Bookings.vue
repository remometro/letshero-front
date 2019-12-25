<template lang="pug">
  main
    .bookings
      ul.bookings__list
         li.bookings__item(v-for="booking in userData.bookedDates")="({{booking.country}}) - {{booking.city}} - {{parseDate(booking.date)}} - {{booking.project}} - {{booking.link}}"
      form.login__form(v-if="isLoggedIn")
        .field
          label.login__form__country--label='Country'
          input.login__form__country(name='country', v-model='country')
        .field
          label.login__form__city--label='City'
          input.login__form__city(name='city', v-model='city')
        .field
          label.login__form__date--label='Date'
          input.login__form__date(type='datetime-local' name='Date', v-model='date')
        .field
          label.login__form__project--label='Project'
          input.login__form__project(name='project', v-model='project')
        .field
          label.login__form__link--label='Link'
          input.login__form__link(name='link', v-model='link')
        button(type='submit', @click='addBooking')='Submit'
      .logout(v-else='')
        span="You need to login first."
        <router-link to="/login">Login</router-link>

</template>

<script>
export default {
  props: {
    serverURL: String
  },
  mounted () {
    this.serverURL = window.serverURL
  },
  computed: {
    isLoggedIn () {
      return !!this.$store.state.isLoggedIn
    },
    userData () {
      return this.$store.state.userData
    }
  },
  methods: {
    addBooking (e) {
      e.preventDefault()
      let parsedDate = new Date(this.date)
      console.log(parsedDate)

      let payload = { country: this.country, city: this.city, date: parsedDate, project: this.project, link: this.link }
      this.$store.dispatch('addBooking', payload)
    },
    parseDate (date) {
      let parsed = new Date(date)
      parsed = parsed.toLocaleString()
      return parsed
      // return `${parsed.getUTCDate()}/${parsed.getUTCMonth()}/${parsed.getFullYear()}`
    }
  }
}
</script>

<style scoped lang="scss">
  .login {
    &__form {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;

      .field {
        display: flex;

        label {
          width: 30%;
        }

        input {
          width: 70%;
        }
      }
    }
  }
</style>
