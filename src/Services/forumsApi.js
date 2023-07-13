import axios from "../api/axiosInstance";
import { getUserId } from "./usersApi";

export async function getUserForums() {
	return axios.get(`/users/${getUserId()}/forums`);
}

export async function getUserForumsPost(cityId, forumsId) {
	return axios.get(`/cities/${cityId}/forums/${forumsId}/post`);
}

export async function getUserForumsMembers(cityId, forumsId) {
	return axios.get(`/cities/${cityId}/forums/${forumsId}/members`);
}

export async function uploadImage(formData) {
	return axios.post(`/users/${getUserId()}/imageUpload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

export async function updateForumsData(cityId, newForumDataObj, forumsId) {
	return axios.patch(`/cities/${cityId}/forums/${forumsId}`, newForumDataObj);
}

export async function postForumsData(cityId, newForumDataObj) {
	return axios.post(`/cities/${cityId}/forums`, newForumDataObj);
}

export async function deleteForums(cityId, forumsId) {
	return axios.delete(`/cities/${cityId}/forums/${forumsId}`);
}

export async function imageUpload(cityId, forumsId) {
	return axios.post(`/cities/${cityId}/forums/${forumsId}/imageUpload`);
}

export async function imageUpdate(cityId, forumsId) {
	return axios.patch(`/cities/${cityId}/forums/${forumsId}/imageUpload`);
}