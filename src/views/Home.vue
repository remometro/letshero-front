<template lang="pug">
  .wrapper
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
              .partners
                img.mongo(src="../assets/imgs/logo_for_startups_white.png")
                img.aws(src="../assets/imgs/aws_activate-white.png")
    img.hp__bg(src="../assets/imgs/map.png")
    .bg
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
<style lang="scss" scoped>
.wrapper {
  max-width: 100vw;
  position: relative;
  overflow: hidden;
  padding: 0;
  background: rgba($color-black, .8);
}
.bg {
  z-index: 0;
}
</style>
<style lang="scss" scoped>
.mongo {
  max-width: 200px;
  margin-top: 1rem;
}
.aws {
  max-width: 200px;
  margin-top: 2rem;
  margin-left: 2rem;
  height: 100%;

  @include sm {
    margin-left: 0 !important;
  }
}
.partners {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.hp {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 auto;
  font-family: $font-main;
  padding: 2rem;
  z-index: 1;

  &__bg {
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: auto;
    left: 0;
    top: 100px;
    image-rendering: crisp-edges;
    opacity: .5;
    background-color: $color-black;
  }

  &__sponsors {
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    color: $color-white;
    z-index: 1;
  }

  &__today {
    z-index: 1;
    &__title {
      font-family: $font-main;
      color: $color-white;
    }

    &__cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__need, &__want {
        display: flex;
        align-items: center;

        &:link, &:visited {
          color: $color-white;
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
