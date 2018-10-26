<template>
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
            <select v-model="hotel.amenities" multiple name="amenities"> 
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
</template>

<script>
export default {
    name: 'HotelForm',
    data() {
        return {
            hotel: {
                rooms: [],
                images: [],
                amenities: []
            },
        }
    },
    methods: {
        addHotel(e) {
            e.preventDefault();
            const properties = Array.from(e.target.elements).filter(elem => elem.name).reduce((obj, elem) => {
                obj[elem.name] = elem.value
                return obj
            }, {})
            // New hotels cannot have rooms added
            const hotel = {
                ...this.hotel,
                ...properties, 
            }
            this.$emit('hotel-created', hotel)
        }
    }
}
</script>

<style scoped lang="stylus">
form
  display grid
  grid-template-columns 1fr 1fr
  justify-items flex-start
  justify-content flex-start
  align-items center

button
  grid-column span 2

label 
  display grid
  align-content center
  justify-content center
  padding 10px
  width 100%
</style>