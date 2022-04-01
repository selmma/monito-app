import axios from "axios";
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-type": "application/json",
  },
});
export const apiKey = "526b61d5f32b0cf490aa300e7c22c36d";
export const img_baseUrl = "https://image.tmdb.org/t/p/original";
