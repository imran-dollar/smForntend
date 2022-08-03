import React, { useState } from 'react'
import { Images } from '../../assets/images'
import { AuthRegisterService } from '../../Services/AuthService';
import { useNavigate, Link } from "react-router-dom";
import './style.css'
import { RouteStrings } from '../../routes/RouteStrings';
import PasswordInput from '../../components/GlobalComponents/PasswordInput';
import Swal from 'sweetalert2';
const Register = () => {
    const Navigate = useNavigate();
    const [registerData, setregisterData] = useState({
        fullName: '', email: '', role: 'user', profile: '', newPassword: '', confirmPassword: '',
    })
    const [error, seterror] = useState({
        fullName: false, email: false, profile: false, newPassword: false, confirmPassword: false,
    })
    const handleFormData_change = (event) => {
        event.preventDefault();
        const { name, id, value } = event.target
        setregisterData({
            ...registerData,
            [name]: value
        })
        if (name === 'selectedFile') {
            setImagePath(event.target.files[0]);
        }
    }
    const setImagePath = (e) => {
        console.log("setImagePath ==>", e);
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = () => {
            setregisterData({
                ...registerData,
                profile: reader.result
            })
        };
    };
    const handle_blur = (event) => {
        const { name, id, value } = event.target
        if (name === 'confirmPassword') {
            if (registerData.confirmPassword === value) {
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
        const { newPassword, confirmPassword, ...rest } = registerData
        const res = await AuthRegisterService({ ...rest, 'password': confirmPassword });
        if (res?.statusCode === 200) {
            Navigate(`${RouteStrings.otp}/:${registerData.email}`)
        } else if (res?.statusCode == 401) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res?.msg,
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong !..",
            })
        }

    }
    return (
        <>
            <div className="container pt-3 pb-2 border-10 register-container tint-border ">
                <h4 className="text-center">Register</h4>
                <div className=" d-flex justify-content-center ">
                    <div className="form-group row d-flex flex-column align-items-center">
                        {registerData.profile != '' ?
                            <img src={registerData.profile}
                                className="img-fluid-profile  border-radius-50 tint-border padding-unset "
                                alt="profile images" />
                            : <img
                                src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                                className="img-fluid-profile border-radius-50 tint-border padding-unset "
                                alt="profile images" />
                        }
                        <label for="selectedFile" className=' text-center mt-2'>
                            <img src={Images.editPen} alt="pen iamge" />
                        </label>
                        <input
                            style={{ opacity: 0 }}
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v,video/*"
                            name='selectedFile'
                            id='selectedFile'
                            placeholder='file'
                            onChange={handleFormData_change}
                            className="custom-file-input "
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="fullName" className="col-sm-1-12 col-form-label" >
                        Full Name
                    </label>
                    <div className="col-sm-1-12">
                        <input autoComplete='off' type="text"
                            required
                            value={registerData.fullName}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            className="form-control form-control-focus"
                            name="fullName"
                            id="fullName"
                            placeholder='eg.johndoe' />
                    </div>
                    {error.fullName && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Enter full name
                    </p>}
                </div>

                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-1-12 col-form-label" >
                        Email
                    </label>
                    <div className="col-sm-1-12">
                        <input autoComplete='off' type="email"
                            required
                            value={registerData.email}
                            onChange={handleFormData_change}
                            onBlur={handle_blur}
                            className="form-control form-control-focus"
                            name="email"
                            id="email"
                            placeholder='johndoe@gmail.com' />
                    </div>
                    {error.email && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Correct email
                    </p>}
                </div>
                <PasswordInput
                    errMsg='Please Enter  password'
                    OnChange={handleFormData_change}
                    OnBlur={handle_blur}
                    Val={registerData.newPassword}
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
                    Val={registerData.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder='confirm password'
                />

                <hr />
                <div className="form-group row text-center  ">
                    <div className="col-sm-1-12   ">
                        <button onClick={handle_submit} className="btn w-100 tint-bg tint-border text-light ">Register</button>
                    </div>
                    <div className="info-text mt-2 text-center">
                        <p className="text-center"> Already Have Account ? <Link to={RouteStrings.login} className=" mx-1 text-center tint-color">
                            Login
                        </Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register