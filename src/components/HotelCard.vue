<template>
  <div class="hotel-card">
    <img alt="hotel-image" :src="mainImage">
    <div class="about">
      <h1 class="rating">{{hotel.rating}}</h1>
      <h2>{{hotel.name}}</h2>
      <p class="description">{{hotel.description}}</p>
      <div class="details" v-if="showMore">
          <div class="detail">
            <p>{{$t('message.amenities')}}</p>
            <span v-for="amenity in hotel.amenities" :key="amenity">{{amenity}}</span>
          </div>
          <div class="detail">
            <p>{{$t('message.room', 2)}}</p>
            <span v-for="room in hotel.rooms" :key="room.id">{{room.name}}</span>
          </div>
          <div class="detail">
            <p>{{$t('message.priceCategory')}}</p>
            <span class="badge">{{hotel.price_category}}</span>
          </div>
          <div class="detail">
            <p>{{$t('message.distanceToVenue')}}</p>
            <span class="badge">{{hotel.distance_to_venue | toMeters }}</span>
          </div>
      </div>
      <button v-if="!showMore" @click="showMore = true">{{$t('message.viewMore')}}&darr;</button>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
button
  height 25px

.about
  border-left 2px solid salmon
  border-right 2px solid salmon
  border-bottom 2px solid salmon
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
