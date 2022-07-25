import React, { useState } from 'react'
import './style.css'
import { AuthforgotPasswordService, AuthLoginService, AuthVerifyOtpService } from '../../Services/AuthService'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import PasswordInput from '../../components/GlobalComponents/PasswordInput'
import Swal from 'sweetalert2'
import { RouteStrings } from '../../routes/RouteStrings'
const ForgotPassword = () => {
    const navigate = useNavigate()

    const [isloading, setisloading] = useState(false);
    const [showOtpField, setshowOtpField] = useState(false)
    const [formData, setformData] = useState({
        email: '',
        otp: '',
        otpFor: "otpForforgotPassword"
    })
    const [error, seterror] = useState({
        email: false, newPassword: false,
    })
    const handle_submit_email = async (e) => {
        e.preventDefault()
        console.log("formData", formData);
        if (formData.email == '') {
            seterror({ ...error, email: true })
            return
        }


        setisloading(true)
        const res = await AuthforgotPasswordService({ email: formData.email })
        if (res?.statusCode == 200) {
            setshowOtpField(true)
        } else {
            setshowOtpField(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res?.msg,
            })
        }
        setisloading(false);
    }
    const handle_submit_otp = async (e) => {
        e.preventDefault()
        if (formData.otp == '') {
            seterror({ ...error, otp: true })
            return
        }

        // return
        setisloading(true)
        const res = await AuthVerifyOtpService(formData)
        if (res?.statusCode == 200) {
            localStorage.setItem('reset_token', JSON.stringify(res?.data?.reset_token));

            navigate(RouteStrings.resetpassword)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res?.msg,
            })
        }
        setisloading(false);
    }
    const handle_change = (e) => {
        const { value, name } = e.target
        if (value.trim('') !== null) {
            setformData({
                ...formData,
                [name]: value
            })
            seterror({ ...error, [name]: false })
        }
    }
    const handle_blur = (event) => {
        const { name, id, value } = event.target
        if (value.trim() === '') {
            seterror({
                ...error,
                [name]: true
            })
        }
        else {
            seterror({
                ...error,
                [name]: false
            })
        }

    }
    return (
        <>

            <div className="container pt-5 pb-2 border-10 register-container tint-border ">
                <h4 className="text-center">Forgot Password</h4>

                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-1-12 col-form-label" >
                        Email
                    </label>
                    <div className="col-sm-1-12">
                        <input
                            autoComplete='off'
                            onChange={handle_change}
                            type="email"
                            required
                            name='email'
                            value={formData.email}
                            onBlur={handle_blur}
                            className="form-control form-control-focus"
                            id="email"
                            placeholder='johndoe@gmail.com' />
                    </div>
                    {error.email && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Correct email
                    </p>}


                    {!showOtpField && <div className="form-group row text-center mt-2 ">
                        <div className="offset-4 col-sm-4">
                            <button onClick={handle_submit_email} className="btn w-100 tint-bg tint-border text-light ">Get OTP</button>
                        </div>
                    </div>}
                </div>
                {showOtpField && <div className="form-group row">
                    <label htmlFor="email" className="col-sm-1-12 col-form-label" >
                        OTP
                    </label>
                    <div className="col-sm-1-12">
                        <input autoComplete='off' type="text"
                            required
                            value={formData.otp}
                            onChange={handle_change}
                            onBlur={handle_blur}
                            maxLength='6'
                            autoFocus
                            placeholder='OTP'
                            className="form-control otp-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                    </div>
                    {error.email && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        Please Enter OTP from email
                    </p>}
                    <div className="form-group row text-center mt-2 ">
                        <div className="offset-4 col-sm-4">
                            <button onClick={handle_submit_otp} className="btn w-100 tint-bg tint-border text-light ">Verify OTP</button>
                        </div>
                    </div>
                </div>}
            </div>
            <Modal show={isloading} >
                <Loader />
            </Modal>
        </>
    )
}

export default ForgotPassword