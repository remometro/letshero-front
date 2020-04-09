<template>
  <div class="lh-socialshare">
    <p class="lh-socialshare__title">Share with</p>
    <div class="lh-container lh-socialshare__item--container">
      <!-- <a :href="" class="lh-socialshare__item">
        <img src="@/assets/imgs/linkedin.svg" alt="" class="lh-socialshare__item__img">
      </a> -->
      <a rel="noreferrer noopener" target="_blank" :href="`http://www.facebook.com/sharer.php?u=${encodeURIComponent(link)}%[title]=${encodeURIComponent(title)}`" class="lh-socialshare__item">
        <img src="@/assets/imgs/facebook.svg" alt="" class="lh-socialshare__item__img">
      </a>
      <!-- <a href="#" class="lh-socialshare__item">
        <img src="@/assets/imgs/instagram.svg" alt="" class="lh-socialshare__item__img">
      </a> -->
       <a rel="noreferrer noopener" target="_blank" :href="`https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(link)}`" class="lh-socialshare__item">
        <img src="@/assets/imgs/whatsapp.svg" alt="" class="lh-socialshare__item__img">
      </a>
       <a rel="noreferrer noopener" target="_blank" :href="`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}`" class="lh-socialshare__item">
        <img src="@/assets/imgs/twitter.svg" alt="" class="lh-socialshare__item__img">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectValue: null,
      isOpen: false
    }
  },
  props: {
    options: Array,
    label: String,
    link: String,
    title: String
  },
  methods: {
    setValue(value, label) {
      this.toggleSelect()
      this.selectValue = label
      this.$emit("selected", value)
    },
    toggleSelect() {
      this.isOpen = !this.isOpen
    },
    closeSelect() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
.lh-dropdown {
  position: relative;
}
.lh-socialshare {
  &__item {
    padding: 0 .5rem;
    &--container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>
