<template>
  <div class="admin">
    <hotel-form @:hotel-created="saveHotel"></hotel-form>
    <div class="hotels">
      <hotel-card :hotel="hotel" :key="hotel.id" v-for="hotel in hotels">
        <button @click="deleteHotel(hotel)">Remove</button>
      </hotel-card>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import HotelCard from '@/components/HotelCard.vue'
import HotelForm from '@/components/HotelForm.vue'

export default {
  name: "Admin",
  components: { 
    HotelCard,
    HotelForm,
  },
  data() {
    return {
    }
  },
  mounted() {
    if(!this.hotels.length) return this.getInitialData()
  },
  computed: {
    ...mapGetters(['hotels', 'findHotel', 'findRoom']),
  },
  methods: {
    ...mapActions(['getInitialData', 'deleteHotel', 'saveHotel']),
  }
};
</script>

<style scoped lang="stylus">

.hotels 
  display grid
  grid-template-columns repeat(auto-fill, minmax(500px, max-content))
  grid-gap 2em
</style>