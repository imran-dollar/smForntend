import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Images } from '../../assets/images'
import { RouteStrings } from '../../routes/RouteStrings'
import { AuthResendOtpService, AuthVerifyOtpService } from '../../Services/AuthService'
import './style.css'
const Otp = () => {
    const Params = useParams()
    const Navigate = useNavigate();

    useEffect(() => {
        const { email } = Params
        setotpData({ ...otpData, email: email.split(':')[1] })
    }, [])

    const [otpData, setotpData] = useState({
        email: '', otp: '',
    })
    const [error, seterror] = useState({
        otp: false,
    })
    const handleFormData_change = (event) => {
        event.preventDefault();
        const { name, id, value } = event.target
        setotpData({
            ...otpData,
            [name]: value
        })

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
    const handle_submit = async () => {
        const res = await AuthVerifyOtpService(otpData);
        if (res?.statusCode === 200) {
            Navigate(RouteStrings.login)
        }

    }
    const handle_resend_otp = () => {
        const res = AuthResendOtpService(otpData.email)
        if (res) {
            console.log("res", res);
            Swal.fire({
                title: 'Success!',
                text: res.msg,
            })
        }
    }
    return (
        <>
            <div className="container py-3 px-2  border-10 register-container tint-border ">
                <h4 className="text-center">Verify OTP</h4>
                <p className="text-center text-muted">
                    {`An otp is Sent to ${otpData.email}`}
                </p>
                <div className=" d-flex justify-content-center ">
                </div>
                <div className="form-group row mt-4">
                    <div className="d-flex flex-row justify-content-around gap-3 ">
                        <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='6'
                            autoFocus
                            className="form-control otp-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                        {/* <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='1'
                            autoFocus
                            className="form-control form-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                        <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='1'
                            autoFocus
                            className="form-control form-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                        <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='1'
                            autoFocus
                            className="form-control form-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                        <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='1'
                            autoFocus
                            className="form-control form-control-focus text-center"
                            name="otp"
                            id="otp"
                        />
                        <input autoComplete='off' type="text"
                            required
                            value={otpData.otp}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            maxLength='1'
                            autoFocus
                            className="form-control form-control-focus text-center"
                            name="otp"
                            id="otp"
                        /> */}


                    </div>
                    {error.fullName && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Enter a Valid otp
                    </p>}
                </div>


                <hr />
                <div className="form-group row d-flex justify-content-center text-center  ">
                    <div className="col-sm-1-12   ">
                        <button onClick={handle_submit} className="btn w-100 tint-bg tint-border text-light ">Verify</button>
                    </div>
                    <button onClick={handle_resend_otp} className="btn-transparent w-fit-content mt-2 tint-color">Resend OTP</button>
                </div>

            </div>

        </>
    )
}

export default Otp