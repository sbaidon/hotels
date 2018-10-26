<template>
  <div class="confirmation">
    <div>{{hotel}}</div>
    <div>{{room}}</div>
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
