<template lang="pug">
  main
    .hp
      .hp__today
        h1.hp__today__title="Today I..."
        .hp__today__cta
          router-link.hp__today__cta__need(to="/find-a-hero")
            span="Need a hero"
            button.hp__today__cta__need__btn.lh--btn--plus
          router-link.hp__today__cta__want(to="/login")
            span="Want to be a hero"
            button.hp__today__cta__btn.lh--btn--plus

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
  justify-content: flex-start;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  height: 100vh;
  font-family: $font-alt;
  padding: 1rem;

  &__today {
    &__title {
      font-family: $font-alt;
    }

    &__cta {
      &__need, &__want {
        display: flex;
        align-items: center;

        &:link, &:visited {
          color: $color-black;
        }

        span {
          margin-right: 1rem;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
