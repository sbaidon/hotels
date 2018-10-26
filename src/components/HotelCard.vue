<template>
  <div class="hotel-card">
      <p>{{hotel.name}}</p>
      <img alt="hotel-image" :src="mainImage">
      <router-link :to="detailPage">Check it out!</router-link>
  </div>
</template>

<script>
export default {
  name: "HotelCard",
  props: {
    hotel: {
      type: Object
    }
  },
  computed: {
    mainImage() {
      return this.hotel.images.length ? this.hotel.images[0] : ''
    },
    detailPage() {
      return `/hotel/${this.hotel.id}`
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.hotel-card
  border 1px solid salmon
  display grid
  justify-content center
  img
    object-fit contain
    height 200px 
    width 200px
</style>
