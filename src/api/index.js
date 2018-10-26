import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

const api = axios.create({
  baseURL
});

export default {
  async getHotels() {
    const { data: hotels } = await api.get("/hotels");
    return hotels;
  },
  async getHotel(id) {
    const { data: hotel } = await api.get(`/hotels/${id}`);
    return hotel;
  },
  async saveHotel(hotel) {
    const { data: newHotel } = await api.post(`/hotels`, hotel);
    return newHotel;
  },
  async deleteHotel(id) {
    const { data: oldHotel } = await api.delete(`/hotels/${id}`);
    return oldHotel;
  },
  async getRooms(hotelId) {
    const hotel = await this.getHotel(hotelId);
    return hotel.rooms;
  }
};
