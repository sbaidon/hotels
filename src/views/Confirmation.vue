<template>
  <div class="confirmation">
    <h1>Booking for Sergio Baidon</h1>
    <h2>Hotel: {{hotel.name}}</h2>
    <h2>Room: {{room.name}}</h2>
    <h2>Price: {{$n(room.price_in_usd, 'currency')}}</h2>
    <h2>Date: {{(new Date).toLocaleString()}}</h2>
    <button>Confirm</button>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Confirmation",
  props: {
    hotelId: {
      type: String
    },
    roomId: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    if(!this.hotel) return this.getHotel(this.hotelId)
    localStorage.setItem('room', JSON.stringify(this.room))
    localStorage.setItem('hotel', JSON.stringify(this.hotel))
  },
  computed: {
    ...mapGetters(['findHotel', 'findRoom']),
    hotel() {
      const hotel = JSON.parse(localStorage.getItem('hotel'))
      if(hotel) return hotel

      return this.findHotel(this.hotelId)
    },
    room() {
      const room = JSON.parse(localStorage.getItem('room'))
      if(room) return room 

      return this.findRoom(this.roomId)
    },
  },
  methods: {
    ...mapActions(['getHotel']),
  }
};
</script>

<style scoped lang="stylus">
button
  height 30px 
  width 200px

.confirmation
  height 80vh
  display grid
  align-content center
  justify-content center
  align-items center
  justify-items center
  padding 4em
</style>