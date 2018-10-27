<template>
  <div class="hotel-detail" v-if="hotel">
    <img alt="hotel-image" :src="mainImage">
    <div class="aside">
      <h1 class="rating">{{hotel.rating}}</h1>
      <h2>{{hotel.name}}</h2>
      <p class="description">{{hotel.description}}</p>
      <div class="details">
          <div class="detail">
            <h2>{{$t('message.amenities')}}</h2>
            <span v-for="amenity in hotel.amenities" :key="amenity">{{amenity}}</span>
          </div>
          <div class="detail">
            <h2>{{$t('message.priceCategory')}}</h2>
            <span class="badge">{{hotel.price_category}}</span>
          </div>
          <div class="detail">
            <h2>{{$t('message.distanceToVenue')}}</h2>
            <span class="badge">{{hotel.distance_to_venue | toMeters }}</span>
          </div>
      </div>
      <h2>Rooms</h2>
      <div class="rooms">
        <div class="room" v-for="room in filteredRooms" :key="room.id">
          <p>{{room.name}}</p>
          <p>{{$n(room.price_in_usd, 'currency')}}</p>
          <router-link :to="`/hotel/${hotel.id}/room/${room.id}`">{{$t('message.book')}}</router-link>
        </div>
      </div>
      <button v-if="visibleRooms !== rooms.length" @click="visibleRooms = rooms.length">Show all</button>
      <button v-else @click="visibleRooms = initialVisibleRooms">Show less</button>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Hotel",
  props: {
    id: {
      type: String
    }
  },
  data() {
    const initialVisibleRooms = 2
    return {
      initialVisibleRooms,
      visibleRooms: initialVisibleRooms,
    }
  },
  mounted() {
    if(!this.hotel) this.getHotel(this.id)
  },
  computed: {
    ...mapGetters(['findHotel']),
    ...mapGetters(['findRoom']),
    hotel() {
      return this.findHotel(this.id)
    },
    filteredRooms() {
      return this.rooms.slice(0, this.visibleRooms)
    },
    rooms() {
      if(!this.hotel) return []

      return this.hotel.rooms.map(room => this.findRoom(room)).sort((a, b) => a.price_in_usd - b.price_in_usd)
    },
    mainImage() {
      if(!this.hotel) return ''

      return this.hotel.images.length ? this.hotel.images[0] : ''
    },
  },
  methods: {
    ...mapActions(['getHotel']),
  }
};
</script>

<style scoped lang="stylus">
img
  min-height 300px

button
  width 150px
  height 30px 

.hotel-detail
  display grid
  align-items stretch
  grid-template-columns repeat(auto-fit, minmax(500px, max-content))
  padding 4em

.aside
  padding 0 4em

.rooms
  display grid
  grid-auto-flow column

.room
  padding 1em

.details
  display flex

.detail
  flex 1
  span
    padding 0 10px
</style>
