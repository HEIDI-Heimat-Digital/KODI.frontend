import axios from "../api/axiosInstance";
import { getUserId } from "./usersApi";

export async function getFavorites() {
    return axios.get(`/users/${getUserId()}/favorites`);
}
export async function getFavoriteListings(params) {
    return axios.get(`/users/${getUserId()}/favorites/listings`, { params });
}
export async function deleteListingsById(favoriteId) {
    // eslint-disable-next-line no-undef
    return axios.delete(`/users/${getUserId()}/favorites/${favoriteId}`);
}

export async function postFavoriteListingsData(favoriteListing) {
    return axios.post(`/users/${getUserId()}/favorites`, favoriteListing);
}
