import httpClient from "./client";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchAppointments = ({
  options = {},
}: {
  options?: Partial<RequestInit>;
} = {}) => httpClient.get(`${API_URL}/appointments`, options);

export const bookAppointment = ({
  payload,
  options = {},
}: {
  payload: any;
  options?: Partial<RequestInit>;
}) => httpClient.post(`${API_URL}/appointments/book`, payload, options);

export const updateAppointment = ({
  appointmentId,
  payload,
  options = {},
}: {
  appointmentId: string;
  payload: any;
  options?: Partial<RequestInit>;
}) =>
  httpClient.patch(
    `${API_URL}/appointments/update/${appointmentId}`,
    payload,
    options
  );

export const fetchSlots = ({
  userId,
  date,
  options = {},
}: {
  userId: string;
  date: string;
  options?: Partial<RequestInit>;
}) => httpClient.get(`${API_URL}/users/${userId}/slots?date=${date}`, options);
