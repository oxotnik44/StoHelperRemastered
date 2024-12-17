// src/services/registerAutoServiceApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "api/baseUrl";
interface RegistrationData {
  login: string;
  password: string; // хэшированный пароль
  nameService: string; // Название сервиса
  webAddress: string; // Веб-адрес
  startOfWork: string; // Время начала работы
  endOfWork: string; // Время окончания работы
  telephoneNumber: string; // Номер телефона
  city: string; // Город
  address: string; // Адрес
}

const registerAutoServiceApi = createApi({
  reducerPath: "registerAutoServiceApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }), // Укажите ваш базовый URL
  endpoints: (builder) => ({
    registerService: builder.mutation<void, RegistrationData>({
      query: (data) => ({
        url: "/service/registrationAutoService",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterServiceMutation } = registerAutoServiceApi;

export default registerAutoServiceApi;
