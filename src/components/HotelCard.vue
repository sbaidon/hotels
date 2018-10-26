<template>
  <div class="hotel-card">
    <img alt="hotel-image" :src="mainImage">
    <div class="about">
      <h1 class="rating">{{hotel.rating}}</h1>
      <h2>{{hotel.name}}</h2>
      <p class="description">{{hotel.description}}</p>
      <div class="details" v-if="showMore">
          <div class="detail">
            <p>Amenities</p>
            <span v-for="amenity in hotel.amenities" :key="amenity">{{amenity}}</span>
          </div>
          <div class="detail">
            <p>Rooms</p>
            <span v-for="room in hotel.rooms" :key="room.id">{{room.name}}</span>
          </div>
          <div class="detail">
            <p>Price Category</p>
            <span class="badge">{{hotel.price_category}}</span>
          </div>
          <div class="detail">
            <p>Distance to venue</p>
            <span class="badge">{{toMeters(hotel.distance_to_venue)}}</span>
          </div>
      </div>
      <button v-if="!showMore" @click="showMore = true">View more &darr;</button>
      <slot></slot>
    </div>
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
  data() {
    return {
      showMore: false,
    }
  },
  computed: {
    mainImage() {
      return this.hotel.images.length ? this.hotel.images[0] : ''
    },
  },
  methods: {
    toMeters(distance) {
      return `${distance.toLocaleString()} meters`
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
button
  height 25px

.about
  padding 0 1em
  display grid
  grid-template-rows repeat(auto-fill, minmax(auto, max-content))
  
.badge
  background-color salmon
  color white
  text-align center

.description
  text-align justify

.detail
  display flex
  align-items center
  text-align left
  p
    color salmon
    flex 0 1 20%
  span
    flex 1
    margin-left 1em

.details
  grid-auto-flow column

.hotel-card
  border 1px solid salmon
  display grid
  grid-template-rows 200px 1fr 30px
  img
    object-fit cover 
    height 100% 
    width 100% 

.rating
  color salmon 
  font-weight bold
</style>
