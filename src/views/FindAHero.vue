<template>
  <main class="find-a-hero">
    <form action="" class="find-a-hero__form">
      <div class="lh--input--select find-a-hero__form__what">
        <label for="find-a-hero__form__what__label">What do you need?</label>
        <input type="text" required />
      </div>
      <div class="lh--input--select find-a-hero__form__do-reward">
        <label for="find-a-hero__form__do-reward__label">Do you offer a reward?</label>
        <input type="text" required />
      </div>
      <div class="lh--input--text find-a-hero__form__reward">
        <label for="find-a-hero__form__reward__label">If so, how much? (in USD)</label>
        <input type="number" min="1" step="1" />
      </div>
      <div class="lh--input--text find-a-hero__form__where">
        <label for="find-a-hero__form__where__label">Where do you need help?</label>
        <input type="text" required />
      </div>
      <button class="lh--button find-a-hero__form__submit">
        Find a Hero
      </button>

    </form>

  </main>
</template>

<script>
export default {
  name: "FindAHero",
  components: {}
}
</script>

<style lang="scss">
.find-a-hero {
  padding: 2rem;

  &__form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
</style>
