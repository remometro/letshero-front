<template>
<main class="coming-soon">
<h2 class="coming-soon__header">Coming soon...</h2>
<h2 class="coming-soon__manifesto">Meanwhile, read <router-link class="coming-soon__manifesto__link" to="/manifesto">Our Manifesto.</router-link></h2>
</main>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: $color-black;
  &__header {
  }
}

</style>
