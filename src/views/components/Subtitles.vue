<template>
  <div class="lh__subtitle" :class="{positionFixed: isFixed}">
      <div class="lh-container">
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-green.svg" alt="" class="lh__subtitle__item__img">
          <span class="lh__subtitle__item__caption text-green">{{str.non}}</span>
        </div>
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-yellow.svg" alt="" class="lh__subtitle__item__img">
          <span class="lh__subtitle__item__caption text-yellow">{{str.medium}}</span>
        </div>
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-red.svg" alt="" class="lh__subtitle__item__img">
          <span class="lh__subtitle__item__caption text-red">{{str.very}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    isFixed: null
  },
  computed: {
    str() {
      return this.$store.state.localeStrings.subtitle
    }
  }
}
</script>

<style lang="scss">
.lh {
&__subtitle {
    background-color: $color-black;
    height: 100px;
    margin-top: -5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;

    &.positionFixed {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 10;
    }

    .lh-container {
      display: flex;
      justify-content: space-between;
    }

    &__item {
      display: flex;
      align-items: center;
      text-align: left;

      &__img {
        margin-right: .3rem;
      }

      &__caption {
        @include fluid-type(320px, 960px, 10px, 24px);
      }
    }
  }
}

</style>
