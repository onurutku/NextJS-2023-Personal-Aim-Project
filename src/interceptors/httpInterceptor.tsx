import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "@/models/constants.model";

const httpInterceptor = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
});

//Error Interceptor
httpInterceptor.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    toast(`Error! - ${error.message} , ${error.code}`, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
    });
    return Promise.reject(error);
  }
);

//!!Bu kısım JWT token eklemek için kullanılacak request interceptor.
// // Request interceptor
// axiosInterceptorInstance.interceptors.request.use(
//   (config) => {
//     // Modify the request config here (add headers, authentication tokens)
//         const accessToken = JSON.parse(localStorage.getItem("token"));

//     // If token is present add it to request's Authorization Header
//     if (accessToken) {
//       if (config.headers) config.headers.token = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors here

//     return Promise.reject(error);
//   }
// );
// // End of Request interceptor
export default httpInterceptor;
