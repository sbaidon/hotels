<template>
  <div class="detail">
    <h1>{{hotel}}</h1>
    <p>Rooms</p>
    <div class="rooms">
      <div v-for="room in filteredRooms" :key="room.id">
        <p>{{room.name}}</p>
        <p>{{room.price_in_usd}}</p>
        <router-link :to="`/hotel/${hotel.id}/room/${room.id}`">Book it!</router-link>
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
    }
  },
  methods: {
    ...mapActions(['getHotel']),
  }
};
</script>

<style scoped lang="stylus">
</style>
