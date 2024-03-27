import { appointmentInstance } from "../api/axiosInstance";

export async function getOwnerAppointment(userId, params) {
  return appointmentInstance.get(`/v1/users/${userId}/appointments`, {
    params,
  });
}

export async function deleteOwnerAppointment(cityId, listingID, id) {
  return appointmentInstance.get(
    `/v1/cities/${cityId}/listings/${listingID}/appointments/${id}`
  );
}
