<template lang="pug">
  main
    .hp
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      sessionToken: String
    }
  },
  computed: {
    bookingsData() {
      return this.$store.state.bookingsData
    },
    liveStreaming() {
      return this.$store.state.liveStreaming
    },
    instagramData() {
      return this.$store.state.instagram
    }
  },
  mounted() {
    this.$store.dispatch("fetchBookingsData")
    this.$store.dispatch("fetchLiveStreamingData")
    this.$store.dispatch("fetchInstagramData")
    console.log("insta", this.instagramData)
    setInterval(() => {
      this.$store.dispatch("fetchLiveStreamingData")
    }, 5000)
  },
  methods: {
    parsedDate(date) {
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
  height: 100vh;

  &__logo {
    margin-top: 10em;
    max-height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
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
        width: 60%;
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

    &__text {
      font-size: 16px;
      line-height: 32px;
      font-weight: normal;
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
        transition: all 0.8s;
        text-align: left;
        line-height: 2em;

        &:hover {
          color: #f3f3f3;
          background-color: #333333;
          transition: all 0.8s;
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

  &__insta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__grid {
      display: grid;
      grid-template-columns: minmax(50px, 33%) minmax(50px, 33%) minmax(
          50px,
          33%
        );
      grid-gap: 0px;
      grid-auto-rows: 1fr;
      &__image {
        width: 100%;
        height: auto;
        &--container {
          position: relative;
          padding-bottom: 100%;
          height: 0;
        }
        &--overlay {
          opacity: 0;
          transition: all 0.8s;
          z-index: 1;
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          &--text {
            padding: 2em;

            @include sm {
              display: none;
            }
          }

          &:hover {
            opacity: 0.6;
            background-color: #333333;
            color: #f9f9f9;
            transition: all 0.8s;
          }
        }
      }
    }
  }
}
</style>
