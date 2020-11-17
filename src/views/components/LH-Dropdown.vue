<template>
  <div class="lh-dropdown" v-on-clickaway="closeSelect" @keydown.esc="closeSelect">
    <div class="lh--input--select find-a-hero__form__what" :class="{isOpen: isOpen}" @click.stop="!disabled && toggleSelect($event)">
      <validation-provider :name="fieldName" class="lh--input--select--field" :rules="rules" v-slot="{ errors }">
        <label for="find-a-hero__form__what__label">{{label}}</label>
        <button class="lh-dropdown__select-button" :disabled="disabled" @click.stop="!disabled && toggleSelect($event)">
          <input type="text" readonly tabindex="-1" :disabled="disabled" v-model="selectValue" @click="!disabled && toggleSelect" @keypress.enter="!disabled && toggleSelect" :placeholder="placeholder"/>
          <span class="lh--error--message">{{ errors[0] }}</span>
          <div class="lh-dropdown__options" :class="{isOpen: isOpen}" >
            <button tabindex="0" class="lh-dropdown__options__option" :key="option.value.value" v-for="option in options" @click.stop="setValue($event, option.value, option.label)" >
              <span class="lh-dropdown__options__option__label">{{option.label}}</span>
            </button>
          </div>
        </button>
      </validation-provider>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  },
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
    disabled: Boolean,
    rules: String,
    fieldName: String
  },
  methods: {
    setValue($event, value, label) {
      event.preventDefault()
      this.toggleSelect($event)
      this.selectValue = label
      this.$emit("selected", value)
    },
    toggleSelect(e) {
      e.preventDefault()
      console.log("here")
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
  max-width: 300px;
  margin: 0 auto;

  input {
    border: none;
    border-bottom: 2px solid $color-white;
    font-family: $font-main;
    color: $color-white;
    width: 100%;
    cursor: pointer;
    background: none;
    &:focus {
      outline: none;
    }
  }

  &__select-button {
    border: none;
    background: none;
    padding: 0;
    text-align: left;
    font-family: $font-main;
  }
}
.lh-dropdown__options {
  display: none;
  position: absolute;
  background-color: $color-white;
  width: 99%;
  top: 33px;
  z-index: 1;
  color: $color-black;
  max-height: 300px;
  overflow-y: scroll;
  cursor: pointer;
  border: 2px solid $color-black;

  &__option {
    padding: 1rem .5rem;
    border: 1px solid $color-black;
    font-family: $font-main;
    color: $color-black;
  }

  &.isOpen {
    display: flex;
    flex-direction: column;
  }
}

</style>
