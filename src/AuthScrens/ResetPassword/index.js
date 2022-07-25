import React, { useEffect, useState } from 'react'
import { Images } from '../../assets/images'
import { AuthRegisterService, AuthResetPasswordService } from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";
import './style.css'
import { RouteStrings } from '../../routes/RouteStrings';
import PasswordInput from '../../components/GlobalComponents/PasswordInput';
import Swal from 'sweetalert2';
const ResetPassword = () => {
    useEffect(() => {
        const re_set_token = JSON.parse(localStorage.getItem("reset_token"));
        console.log("re_set_token", re_set_token);
        setResetPassword({
            ...ResetPassword,
            reset_token: re_set_token
        })
    }, [])

    const Navigate = useNavigate();
    const [ResetPassword, setResetPassword] = useState({
        newPassword: '', confirmPassword: '', reset_token: null
    })
    const [error, seterror] = useState({
        newPassword: false, confirmPassword: false,
    })
    const handleFormData_change = (event) => {
        event.preventDefault();
        const { name, id, value } = event.target
        setResetPassword({
            ...ResetPassword,
            [name]: value
        })

    }

    const handle_blur = (event) => {
        const { name, id, value } = event.target
        if (name === 'confirmPassword') {
            if (ResetPassword.confirmPassword === value) {
                seterror({
                    ...error,
                    confirmPassword: true
                })
            } else {
                seterror({
                    ...error,
                    confirmPassword: false
                })
            }
        }
        else if (value.trim() === '') {
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
        const { newPassword, confirmPassword, ...rest } = ResetPassword
        const res = await AuthResetPasswordService({ ...rest, 'password': confirmPassword });

        res?.statusCode === 200 ? Navigate(RouteStrings.login) : Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Something went wrong !..",
        })
    }
    return (
        <>
            <div className="container pt-5 pb-2 border-10 register-container tint-border ">
                <h4 className="text-center">Reset Password</h4>

                <PasswordInput
                    errMsg='Please Enter  password'
                    OnChange={handleFormData_change}
                    OnBlur={handle_blur}
                    Val={ResetPassword.newPassword}
                    name="newPassword"
                    id="newPassword"
                    placeholder='Password'
                    label='New Password'
                />
                <PasswordInput
                    label='Confirm Password'
                    errMsg='Password might be Empty or worng'
                    OnChange={handleFormData_change}
                    OnBlur={handle_blur}
                    Val={ResetPassword.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder='confirm password'
                />

                <hr />
                <div className="form-group row text-center  ">
                    <div className="col-sm-1-12   ">
                        <button onClick={handle_submit} className="btn w-100 tint-bg tint-border text-light ">Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword