<template lang="pug">
  main
    .hp
      section.hp__logo
        img(src='../assets/dhruid.svg')

      section.hp__socials
        a(href='https://instagram.com/dhruidmusic', target='_blank', rel='noreferrer noopener')
          img(src='../assets/instagram.svg')
        a(href='https://soundcloud.com/dhruid', target='_blank', rel='noreferrer noopener')
          img(src='../assets/soundcloud.svg')

      section.hp__sounds.hp__box
        h1.hp__sounds__title.hp__box__title="Latest Sounds"
        <iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/79985529&color=%23333333&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false"></iframe>

      section.hp__bookings.hp__box(v-if="bookingsData.length > 0")
        h1.hp__bookings__title.hp__box__title="Next Dates"
        .hp__bookings__year(v-for="year in bookingsData")="{{Object.keys(year)[0]}}"
          a.hp__bookings__item(v-for="booking in year[Object.keys(year)[0]]", target="_blank", rel="noreferrer noopener", :href="booking.link", :is="booking.link?'a':'span'")
            span.hp__bookings__item__date="{{parsedDate(booking.date)}}"
            span.hp__bookings__item__details
              span.hp__bookings__item__details__country="({{booking.country}} -"
              span.hp__bookings__item__details__city="  {{booking.city}})"
              span.hp__bookings__item__details__project=" - {{booking.project}}"

      section.hp__contact.hp__box
        h1.hp__contact__title.hp__box__title="Bookings"
        img.hp__contact__details(src="../assets/contact.svg" alt="Contact details")
    .hp__bg
    .hp__footer
      small.hp__footer__copy="© Copyright {{new Date().getUTCFullYear()}} - Irmãos Reale Desenvolvimento de Softwares Ltda."
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data: function () {
    return {
      sessionToken: String
    }
  },
  computed: {
    bookingsData () {
      return this.$store.state.bookingsData
    }
  },
  mounted () {
    this.$store.dispatch('fetchBookingsData')
    console.log(this.bookingsData)
  },
  methods: {
    parsedDate (date) {
      let month = date.substr(5, 2)
      let day = date.substr(8, 2)
      let parsed = `${day}/${month}`
      return parsed
    }
  }
}
</script>

<style lang="scss">
.hp {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;

  &__bg {
    background-image: url('../assets/hp.jpg');
    background-size: cover;
    background-position: center center;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    z-index: -1;
    position: fixed;
  }

  &__logo {
    margin-top: 10em;
    max-height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img  {
      max-width: 100%;
    }

    @include sm {
      margin-top: 3em;
    }

  }

  &__socials {
    display: flex;
    justify-content: center;
    a {
      margin: 0 1em;
      width: 50px;
      height: 50px;
      background-color: #f9f9f9;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  a {
    text-decoration: none !important;
  }

  &__box {
    background-color: #f9f9f9;
    width: 100%;
    box-sizing: border-box;
    margin: 5em auto;
    font-family: $font-main;
    padding: 3em;
    letter-spacing: 4px;

    @include sm {
      font-size: 12px;
    }

    &__title {
      margin-bottom: 2em;
    }
  }

  &__bookings {
    &__year {
      margin: 2em 0;
      display: block;
    }

    &__item {
      padding: 1.5em 0;
      display: flex;
      &__date {
        background-color: #333333;
        padding: 1em;
        color: #f9f9f9;
        font-weight: 900;
        letter-spacing: 4px;
        margin-right: 1em;
        min-width: 8em;
        display: flex;
        align-items: center;
        justify-content: center;

        @include sm {
          min-width: 4em;
        }
      }

      &__details {
        color: #333333;
        padding: 1em;
        font-weight: 900;
        letter-spacing: 2px;
        transition: all .8s;
        text-align: left;
        line-height: 2em;

        &:hover {
          color: #f3f3f3;
          background-color: #333333;
          transition: all .8s;
        }
      }
    }
  }

  &__contact {
    &__details {
      max-width: 350px;
      width: 100%;
    }
  }

  &__footer {
    height: 5px;
    background-color: #f9f9f9;
    color: #333333;
    font-family: $font-main;
    height: 30px;
    background-color: #f9f9f9;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>
