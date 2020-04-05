<template>
  <main class="list">
    <div class="lh-container">
      <div class="list__table">
        <div class="list__table__item" :key="item.id" v-for="(item, i) in entries">
          <div class="list__table__item" :class="{itemUrgent: item.help.category.urgency == 3, itemMediumUrgent: item.help.category.urgency == 2, itemNonUrgent: item.help.category.urgency == 1 }" @click="openTab(i)">
            <div class="list__table__item__top">
              <div class="list__table__item__top__left">
                <span class="list__table__item__img"></span>
                <span class="list__table__item__title">{{item.user.name}} needs {{item.help.category.mainCategory}}</span>
              </div>
              <button class="list__table__item__expand" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}"></button>
            </div>
            <div class="list__table__item__bottom" :class="{itemOpened: (i === 0 && !tabOpened) || i === tabOpened}">
              <div class="list__table__item__location">In {{item.help.location.placeName}}</div>
              <div class="list__table__item__distance">(2km away)</div>
              <div class="list__table__item__reward">{{item.help.reward.active ? `${treatment(item.user.gender)} offers up to ${item.help.reward.value + item.help.reward.currency} in reward.` : `${treatment(item.user.gender)} can't afford a reward`}}
              </div>
              <button class="list__table__item__cta lh--button lh--button--white" @click.stop="">Be {{treatmentOf(item.user.gender)}} hero</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import data from "../../data/help-data.json"
export default {
  data() {
    return {
      tabOpened: null
    }
  },
  computed: {
    entries() {
      return data
    }
  },
  methods: {
    treatment(gender) {
      let treatment = "It"
      switch (gender) {
      case "1":
        treatment = "He"
        break
      case "2":
        treatment = "She"
        break
      case "3":
        treatment = "It"
        break
      }
      return treatment
    },
    treatmentOf(gender) {
      let treatment = "Its"
      switch (gender) {
      case "1":
        treatment = "His"
        break
      case "2":
        treatment = "Her"
        break
      case "3":
        treatment = "Its"
        break
      }
      return treatment
    },
    openTab(i) {
      if (i === this.tabOpened) {
        this.tabOpened = -1
      } else {
        this.tabOpened = i
      }
    }
  }
}
</script>

<style lang="scss">
.list {
  &__table {
    padding-top: 2rem;
    max-width: 80%;
    margin: 0 auto;
    &__item {
      background-color: $color-black;
      color: $color-white;
      margin: 1rem 0;
      padding: .5rem;
      border-radius: 8px;

      &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        &__left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }

      &__bottom {
        display: none;
        margin-top: 2rem;
        text-align: left;

        &.itemOpened {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: flex-start;
        }
      }

      &__expand {
        display: block;
        width: 35px;
        height: 35px;
        border: none;
        background: url(../assets/imgs/plus-white.svg) center center no-repeat;
        margin-left: 1rem;

        &.itemOpened {
          background: url(../assets/imgs/minus-white.svg) center center no-repeat;
        }
      }

      &__cta {
        align-self: center;
        margin-bottom: 0;
        margin-top: 3rem;
      }

      &__reward {
        margin-top: 1rem;
      }

      &__img {
        margin-right: .5rem;
      }
    }
  }
}

.item {
  &Urgent {
    .list__table__item__img {
      display: block;
      width: 30px;
      height: 30px;
      background: url(../assets/imgs/heart-red.svg) center center no-repeat;
    }

  }
  &MediumUrgent {
    .list__table__item__img {
      display: block;
      width: 30px;
      height: 30px;
      background: url(../assets/imgs/heart-yellow.svg) center center no-repeat;
    }
  }

  &NonUrgent {
    .list__table__item__img {
      display: block;
      width: 30px;
      height: 30px;
      background: url(../assets/imgs/heart-green.svg) center center no-repeat;
    }
  }
}
</style>
