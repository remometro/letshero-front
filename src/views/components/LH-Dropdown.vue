<template>
  <div class="lh-dropdown" v-on-clickaway="closeSelect">
    <div class="lh--input--select find-a-hero__form__what" :class="{isOpen: isOpen}">
      <div class="lh--input--select--field">
        <label for="find-a-hero__form__what__label">{{label}}</label>
        <input type="text" :disabled="disabled" required v-model="selectValue" readonly @click="!disabled && toggleSelect()" :placeholder="placeholder"/>
      </div>
    </div>
    <div class="lh-dropdown__options" :class="{isOpen: isOpen}" >
      <div class="lh-dropdown__options__option" :key="option.value" v-for="option in options" @click="setValue(option.value, option.label)">
        <span class="lh-dropdown__options__option__label">{{option.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],
  data() {
    return {
      selectValue: null,
      isOpen: false
    }
  },
  props: {
    options: Array,
    label: String,
    placeholder: String,
    disabled: Boolean
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
  width: 100%;
}
.lh-dropdown__options {
  display: none;
  position: absolute;
  background-color: $color-white;
  width: 99%;
  top: 49px;
  z-index: 1;
  color: $color-black;
  max-height: 300px;
  overflow-y: scroll;
  cursor: pointer;
  border: 2px solid $color-black;

  &__option {
    padding: 1rem .5rem;
    border: 1px solid $color-black;
  }

  &.isOpen {
    display: flex;
    flex-direction: column;
  }
}

</style>
