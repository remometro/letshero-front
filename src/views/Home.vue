<template lang="pug">
  main
    .hp
      .hp__logo
        img(src='../assets/dhruid.svg')

      .hp__socials
        a(href='https://instagram.com/dhruidmusic', target='_blank', rel='noreferrer noopener')
          img(src='../assets/instagram.svg')
        a(href='https://soundcloud.com/dhruid', target='_blank', rel='noreferrer noopener')
          img(src='../assets/soundcloud.svg')

      .hp__bookings
    .hp__bg
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data: function () {
    return {
      sessionToken: String
    }
  },
  methods: {
    login () {
      fetch(window.serverURL + '/api-v1/login', { method: 'POST' })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss">
.hp {
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__bg {
    background-image: url('../assets/hp.jpg');
    background-size: cover;
    background-position: center center;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    z-index: -1;
  }

  &__logo {
    margin-top: 10em;
    max-height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  &__socials {
    display: flex;
    justify-content: center;
    a {
      margin: 0 1em;
      width: 50px;
      height: 50px;
      background-color: #f9f9f9;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
