import axios from "axios";
import { toast } from "react-toastify";

const httpInterceptor = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your API base URL
});
httpInterceptor.interceptors.response.use(
  (response: any) => {
    toast(`Success! - ${response.statusText} , ${response.status}`, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });
    return response;
  },
  (error: any) => {
    console.log(error);
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
