import axios from "axios"
const URL = process.env.REACT_APP_API_BASE_URL
export const AuthLoginService = async (data) => {
    if (!navigator.onLine) {
        console.log("no conncection Found");
    }
    let resp;
    await axios.post(URL + 'login', data).then(res => {
        localStorage.setItem("userdata", JSON.stringify(res.data?.userdata));
        localStorage.setItem("authToken", JSON.stringify(res.data?.token));
        resp = res.data
    }).catch(err => {
        console.log("err", err);
        return err
    })
    return resp
}
export const AuthRegisterService = async (data) => {
    let resp;
    await axios.post(URL + 'auth/register', data).then(res => {
        resp = res.data
    }).catch(err => {
        console.log("err", err);
    })
    return resp
}
export const AuthVerifyOtpService = async (data) => {
    let resp;
    await axios.post(URL + 'auth/verifyOtp', data).then(res => {
        resp = res.data
    }).catch(err => {
        console.log("err", err);
    })
    return resp
}
export const AuthResendOtpService = async (data) => {
    let resp;
    await axios.post(URL + 'auth/resend_otp', data).then(res => {
        resp = res.data
    }).catch(err => {
        console.log("err", err);
    })
    return resp
}