<template>
  <div class="home">
    <div class="filters">
      <label for="distance-to-venue">{{$t('message.distanceToVenue')}}
        <select v-model="selectedDistance" name="distance-to-venue">
          <option default>{{ $t("message.all") }}</option>
          <option v-for="distance in distances" :key="distance" :value="distance">
            {{distance | toMeters }}
          </option>
        </select>
      </label>
      <label for="price-category">{{$t('message.priceCategory')}}
        <select v-model="selectedCategory" name="price-category">
          <option default>{{ $t("message.all") }}</option>
          <option v-for="category in categories" :key="category">
            {{category}}
          </option>
        </select>
      </label>
      <label for="amenities">{{$t('message.amenities')}}
        <select v-model="selectedAmenity" name="amenities">
          <option default>{{ $t("message.all") }}</option>
          <option v-for="amenity in amenities" :key="amenity">
            {{amenity}}
          </option>
        </select>
      </label>
    </div>
    <div class="hotels">
      <hotel-card v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel">
        <router-link :to="`/hotel/${hotel.id}`">{{ $t('message.checkItOut') }}</router-link>
      </hotel-card>
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
      selectedDistance: this.$t("message.all"),
      filters: [
        this.filterByAmenity,
        this.filterByPriceCategory,
        this.filterByDistance,
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
    distances() {
      if(!this.hotels.length)  return []

      const distances = this.hotels.map(hotel => hotel.distance_to_venue)
      return [...new Set(distances)]
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
      if(this.selectedDistance === this.$t("message.all")) return true;

      return hotel.distance_to_venue === this.selectedDistance;
    },
    filterByPriceCategory(hotel) {
      if(this.selectedCategory === this.$t("message.all")) return true;

      return hotel.price_category === this.selectedCategory 
    },
  }
};
</script>

<style scoped lang="stylus">
.home 
  padding 4em

.filters
  display flex
  padding 2em 0
  label
    padding-right 1em


.hotels
  display grid
  grid-template-columns repeat(auto-fit, minmax(500px, max-content))
  grid-gap 2em
</style>