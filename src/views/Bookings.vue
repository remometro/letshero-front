<template lang="pug">
  main
    .bookings
      .bookings__year(v-for="year in bookingsData")="{{Object.keys(year)[0]}}"
        .bookings__item(v-for="booking in year[Object.keys(year)[0]]")
          span.bookings__item__date="{{parseDate(booking.date)}} - "
          span.bookings__item__details
            span.bookings__item__details__country="({{booking.country}} -"
            span.bookings__item__details__city="  {{booking.city}})"
            span.bookings__item__details__project=" - {{booking.project}}"
            span.bookings__item__details__format=" - {{booking.format}}"
          button.bookings__item--edit(@click="toggleEditMode(booking)")="Edit"
          button.bookings__item--remove(@click="removeBooking(booking._id)")="Delete"
      form.bookings__form(v-if="isLoggedIn")
        .field
          label.bookings__form__country--label='Country'
          input.bookings__form__country(name='country', v-model='country')
        .field
          label.bookings__form__city--label='City'
          input.bookings__form__city(name='city', v-model='city')
        .field
          label.bookings__form__date--label='Date'
          input.bookings__form__date(type='date' name='Date', v-model='date')
        .field
          label.bookings__form__format--label='Format'
          select.bookings__form__format(name='format', v-model='format')
            option(value="Live Set")="Live Set"
            option(value="DJ Set")="DJ Set"
        .field
          label.bookings__form__project--label='Project'
          input.bookings__form__project(name='project', v-model='project')
        .field
          label.bookings__form__link--label='Link'
          input.bookings__form__link(name='link', v-model='link')
        input(type="hidden", v-model="id")
        button(type='submit', @click='addBooking', v-if="mode === 'Add'")="Add booking"
        button(type='submit', @click='editBooking', v-if="mode === 'Edit'")="Edit booking"
        button(@click='toggleAddBooking', v-if="mode=='Edit'")="Go back to add new booking"
        input(type="reset")
      .logout(v-else='')
        span="You need to login first."
        <router-link to="/login">Login</router-link>

</template>

<script>
export default {
  data: function () {
    return {
      mode: 'Add',
      country: '',
      city: '',
      date: '',
      project: '',
      link: '',
      id: '',
      format: ''
    }
  },
  props: {
    serverURL: String
  },
  mounted () {
    this.$store.dispatch('fetchAllBookingsData')
  },
  computed: {
    isLoggedIn () {
      return !!this.$store.state.isLoggedIn
    },
    userData () {
      return this.$store.state.userData
    },
    bookingsData () {
      return this.$store.state.allBookingsData
    }
  },
  methods: {
    addBooking (e) {
      e.preventDefault()
      let year = this.date.substr(0, 4)
      let month = this.date.substr(5, 2) - 1
      let day = this.date.substr(8, 2)
      let parsedDate = new Date(Date.UTC(year, month, day, 23, 59))

      let payload = { country: this.country, city: this.city, date: parsedDate, project: this.project, link: this.link, format: this.format }
      this.$store.dispatch('addBooking', payload)
    },
    parseDate (date) {
      let year = date.substr(0, 4)
      let month = date.substr(5, 2)
      let day = date.substr(8, 2)
      let parsed = `${year}-${month}-${day}`
      return parsed
    },
    removeBooking (id) {
      this.$store.dispatch('deleteBooking', id)
    },
    toggleEditMode (booking) {
      this.mode = 'Edit'
      this.country = booking.country
      this.city = booking.city
      this.date = this.parseDate(booking.date)
      this.project = booking.project
      this.link = booking.link
      this.id = booking._id
    },
    toggleAddBooking () {
      this.mode = 'Add'
      this.country = ''
      this.city = ''
      this.date = ''
      this.project = ''
      this.link = ''
      this.id = ''
    },
    editBooking (e) {
      e.preventDefault()
      let year = this.date.substr(0, 4)
      let month = this.date.substr(5, 2) - 1
      let day = this.date.substr(8, 2)
      let parsedDate = new Date(Date.UTC(year, month, day))

      let payload = { payload: { country: this.country, city: this.city, date: parsedDate, project: this.project, link: this.link, format: this.format }, id: this.id }
      this.$store.dispatch('editBooking', payload)
      this.toggleAddBooking()
    }
  }
}
</script>

<style scoped lang="scss">
  .bookings {
    &__year {
      display: flex;
      flex-direction: column;
      margin: 5em 0;
      border: solid 1px #333333;
      padding: 2em;
    }

    &__item {
      &--edit {
        margin-left: 1em;
      }
    }

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
