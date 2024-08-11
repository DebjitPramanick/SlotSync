import httpClient from "./client";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchAppointments = ({
  options = {},
}: {
  options?: Partial<RequestInit>;
} = {}) => httpClient.get(`${API_URL}/appointments`, options);

export const bookAppointments = ({
  payload,
  options = {},
}: {
  payload: any;
  options?: Partial<RequestInit>;
}) => httpClient.post(`${API_URL}/appointments`, payload, options);
