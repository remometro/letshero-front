<template lang="pug">
  main
    .hp
      .hp__today
        h1.hp__today__title="{{ strings.title }}"
        .hp__today__cta
          router-link.hp__today__cta__need(to="/find-a-hero")
            span="{{ strings.need }}"
          router-link.hp__today__cta__want(to="/list")
            span="{{ strings.want }}"
          .hp__sponsors
            span="{{ strings.trusted }}"
            img.mongo(src="../assets/imgs/logo_for-startups_fc.png")

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
    strings() {
      return this.$store.state.localeStrings.home
    }
  },
  mounted() {
    this.$store.dispatch("fetchAllHelpData")
  },
  methods: {
  }
}
</script>

<style lang="scss">
.mongo {
  max-width: 250px;
}
.hp {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 auto;
  font-family: $font-main;
  padding: 2rem;

  &__sponsors {
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
  }

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
