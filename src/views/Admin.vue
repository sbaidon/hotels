<template>
  <div class="admin">
    <form @submit="addHotel">
        <label for="name">name
            <input name="name" type="text"/> 
        </label>
        <label for="description">Description
            <textarea name="description"></textarea>
        </label>
        <label for="distance_to_venue">Distance to venue 
            <input name="distance_to_venue" type="number"/> 
        </label>
        <label for="rating">Rating
          <input name="rating" type="number"> 
        </label>
        <label for="price_category">Price Category
            <select name="price_category"> 
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
        </label>
        <label for="amenities">Price Category
            <select v-model="amenities" multiple name="amenities"> 
              <option>free_parking</option>
              <option>free_wifi</option>
              <option>pets</option>
              <option>restaurant</option>
              <option>gym</option>
              <option>pool</option>
              <option>spa</option>
            </select>
        </label>
        <button type="submit">Save</button>
      </form>
    <div class="hotels">
        <div class="hotel" v-for="hotel in hotels" :key="hotel.id">
          {{hotel}}
          <button @click="deleteHotel(hotel)">Remove</button>
        </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Admin",
  data() {
    return {
      amenities: []
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
    addHotel(e) {
        e.preventDefault();
        const hotel = Array.from(e.target.elements).filter(elem => elem.name).reduce((obj, elem) => {
            obj[elem.name] = elem.value
            return obj
        }, {})
        hotel.amenities = this.amenities;
        // New hotels cannot have rooms added
        hotel.rooms = [];
        hotel.images = [];
        this.saveHotel(hotel)
    }
  }
};
</script>

<style scoped lang="stylus">
form
  display grid
</style>