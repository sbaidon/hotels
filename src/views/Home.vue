<template>
  <div class="home">
    <div class="filters">
      <label for="distance-to-venue">Name
        <input name="distance-to-venue" type="text"/>
      </label>
      <label for="price-category">Price Category
        <select v-model="selectedCategory" name="price-category">
          <option default>{{ $t("message.all") }}</option>
          <option v-for="category in categories" :key="category">
            {{category}}
          </option>
        </select>
      </label>
      <label for="amenities">Amenities
        <select v-model="selectedAmenity" name="amenities">
          <option default>{{ $t("message.all") }}</option>
          <option v-for="amenity in amenities" :key="amenity">
            {{amenity}}
          </option>
        </select>
      </label>
    </div>
    <div class="hotels">
      <HotelCard v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HotelCard from '../components/HotelCard.vue'

export default {
  name: "home",
  components: {
    HotelCard
  },
  data() {
    return {
      selectedAmenity: this.$t("message.all"),
      selectedCategory: this.$t("message.all"),
      filters: [
        this.filterByAmenity,
        this.filterByPriceCategory,
      ],
    }
  },
  mounted() {
    if(!this.hotels.length) this.getInitialData()
  },
  computed: {
    ...mapGetters(['hotels']),
    amenities() {
      if(!this.hotels.length)  return []

      const amenities = this.hotels.map(hotel => hotel.amenities).reduce((a, b) => [...a, ...b])
      return [...new Set(amenities)]
    },
    categories() {
      if(!this.hotels.length)  return []

      const categories = this.hotels.map(hotel => hotel.price_category)
      return [...new Set(categories)]
    },
    filteredHotels() {
      return this.hotels
      .filter(hotel => this.filters.reduce((prev, fn) => fn(hotel) && prev, true))
    }
  },
  methods: {
    ...mapActions(['getInitialData']),
    filterByAmenity(hotel) {
      if(this.selectedAmenity === this.$t("message.all")) return true;

      return hotel.amenities.includes(this.selectedAmenity);
    },
    filterByDistance(hotel) {
      if(this.selectedAmenity === this.$t("message.all")) return true;

      return hotel.distance_to_venue === this.selectedDistance;
    },
    filterByPriceCategory(hotel) {
      if(this.selectedCategory === this.$t("message.all")) return true;

      return hotel.price_category === this.selectedCategory 
    }
  }
};
</script>

<style scoped lang="stylus">
.home 
  padding 4em

.filters
  padding 2em 0


.hotels
  display grid
  grid-template-columns 1fr 1fr 1fr
  grid-gap 2em
</style>