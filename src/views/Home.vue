<template lang="pug">
  main
    .hp
      .hp__today
        h1.hp__today__title="Today I..."
        .hp__today__cta
          router-link.hp__today__cta__need(to="/find-a-hero")
            span="Need a hero"
          router-link.hp__today__cta__want(to="/list")
            span="Want to be a hero"

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
  margin: 0 auto;
  font-family: $font-main;
  padding: 2rem;

  &__today {
    &__title {
      font-family: $font-main;
      color: $color-black;
    }

    &__cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__need, &__want {
        display: flex;
        align-items: center;

        &:link, &:visited {
          color: $color-black;
        }

        span {
          margin-top: 2rem;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
