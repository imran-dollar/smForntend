import axios from 'axios';

const authToken = localStorage.getItem('authToken');
console.log("authToken", authToken);
const headers = {
    Authorization: `Bearer ${JSON.parse(authToken)}`,
    accept: "application/json",
    "accept-language": "en_US",
    "content-type": "application/json",
};
const axiosInstence = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: headers,
});

axiosInstence.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 401 || error.response.status === 403) {
            console.log(`${error.response.status} status clear Local Stroage`);
            localStorage.clear()
            // coffeewebClearLocal();
            // SuiteLocalStorage.deleteAll();
            // window.location.replace( RouteStrings.login)
        }
        else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);
axiosInstence.interceptors.request.use(
    (request) =>
        new Promise((resolve, reject) => {
            resolve(request);
        }),
    (error) => {
        if (!error.request) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.request.status === 401 || error.response.status === 403) {
            console.log(`${error.response.status} status clear Local Stroage`);
            localStorage.clear()
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);

export default axiosInstence;
