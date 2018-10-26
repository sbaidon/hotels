import Vue from "vue";
import Vuex from "vuex";
import api from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hotels: {},
    rooms: {}
  },
  mutations: {
    setHotel(state, { hotel }) {
      Vue.set(state.hotels, hotel.id, {
        ...hotel
      });
    },
    setRoom(state, { room }) {
      Vue.set(state.rooms, room.id, {
        ...room
      });
    },
    removeHotel(state, { id }) {
      Vue.delete(state.hotels, id);
    },
    removeRoom(state, { id }) {
      Vue.delete(state.rooms, id);
    }
  },
  actions: {
    async getInitialData({ commit }) {
      const hotels = await api.getHotels();
      hotels.forEach(hotel => {
        hotel.rooms.forEach(room => commit("setRoom", { room }));
        hotel.rooms = hotel.rooms.map(room => room.id);
        commit("setHotel", { hotel });
      });
    },
    async getHotel({ commit }, id) {
      const hotel = await api.getHotel(id);
      hotel.rooms.forEach(room => {
        commit("setRoom", { room });
      });
      hotel.rooms = hotel.rooms.map(room => room.id);
      commit("setHotel", { hotel });
    },
    async deleteHotel({ commit }, hotel) {
      try {
        await api.deleteHotel(hotel.id);
        hotel.rooms.forEach(room => commit("removeRoom", { id: room.id }));
        commit("removeHotel", { id: hotel.id });
      } catch (error) {
        throw new Error(error);
      }
    },
    async saveHotel({ commit }, hotel) {
      try {
        const newHotel = await api.saveHotel(hotel);
        commit("setHotel", { hotel: newHotel });
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  getters: {
    hotels: state => {
      return Object.values(state.hotels).map(hotel => ({
        ...hotel,
        rooms: hotel.rooms.map(room => state.rooms[room])
      }));
    },
    findHotel: state => id => state.hotels[id],
    findRoom: state => id => state.rooms[id]
  }
});
