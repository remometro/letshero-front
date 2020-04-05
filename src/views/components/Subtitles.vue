<template>
  <div class="lh__subtitle">
      <div class="lh-container">
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-green.svg" alt="" class="lh__subtitle__item__img">
          <span class="lh__subtitle__item__caption text-green">Non <br/> urgent</span>
        </div>
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-yellow.svg" alt="" class="lh__subtitle__item__img">
          <span class="lh__subtitle__item__caption text-yellow">Medium <br/> urgent</span>
        </div>
        <div class="lh__subtitle__item">
          <img src="@/assets/imgs/heart-red.svg" alt="" class="lh__subtitle__item__img">
          <span class="map__subtitle__item__caption text-red">Very <br/> urgent</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {

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
