<template>
    <form @submit="addHotel">
      <fieldset>
        <label for="name">{{$t('message.name')}}
            <input required name="name" type="text"/> 
        </label>
        <label for="description">{{$t('message.description')}}
            <textarea required name="description"></textarea>
        </label>
        <label for="distance_to_venue">{{$t('message.distanceToVenue')}}
            <input required name="distance_to_venue" type="number"/> 
        </label>
      </fieldset>
      <fieldset>
        <label for="rating">{{$t('message.rating')}}
          <input required name="rating" type="number"> 
        </label>
        <label for="price_category">{{$t('message.priceCategory')}}
            <select required name="price_category"> 
              <option>{{$t('message.low')}}</option>
              <option>{{$t('message.medium')}}</option>
              <option>{{$t('message.high')}}</option>
            </select>
        </label>
        <label for="amenities">{{$t('message.amenities')}}
            <select required v-model="hotel.amenities" multiple name="amenities"> 
              <option>{{$t('message.freeParking')}}</option>
              <option>{{$t('message.freeWifi')}}</option>
              <option>{{$t('message.pets')}}</option>
              <option>{{$t('message.restaurant')}}</option>
              <option>{{$t('message.gym')}}</option>
              <option>{{$t('message.pool')}}</option>
              <option>{{$t('message.spa')}}</option>
            </select>
        </label>
      </fieldset>
        <button type="submit">{{$t('message.save')}}</button>
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
            const properties = Array.from(e.target.elements)
            .filter(elem => elem.name)
            .reduce((obj, elem) => {
                obj[elem.name] = elem.value
                return obj
            }, {})
            // New hotels cannot have rooms added
            const hotel = {
                ...this.hotel,
                ...properties, 
            }
            this.$emit('hotel-created', hotel)
        },
    }
}
</script>

<style scoped lang="stylus">
form
  display grid 
  grid-template-columns 1fr 1fr
  max-width 550px
  margin auto

button
  grid-column span 2

fieldset
  border none

input, textarea, select
  width 100%
</style>