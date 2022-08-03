import React, { useState } from 'react'
import './style.css'
import { AuthLoginService } from '../../Services/AuthService'
import { Modal } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import PasswordInput from '../../components/GlobalComponents/PasswordInput'
import { RouteStrings } from '../../routes/RouteStrings'
const Login = () => {
    const navigate = useNavigate()
    const [isloading, setisloading] = useState(false);
    const [formData, setformData] = useState({
        email: '',
        password: '',
    })
    const [error, seterror] = useState({
        email: false, newPassword: false,
    })
    const handle_submit = async (e) => {
        setisloading(true)
        e.preventDefault()
        // return
        const res = await AuthLoginService(formData);
        if (res?.statusCode == 200) {
            localStorage.setItem("authToken", JSON.stringify(res?.token));
            localStorage.setItem("userdata", JSON.stringify(res?.userdata));
            window.location.replace(RouteStrings.posts)
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
        }
    }
    const handle_blur = (event) => {
        const { name, value } = event.target
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
                <h4 className="text-center">Login</h4>
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
                    {error.fullName && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Correct email
                    </p>}
                </div>
                <PasswordInput
                    label='Password'
                    errMsg='Please Enter Correct password'
                    OnChange={handle_change}
                    OnBlur={handle_blur}
                    Val={formData.password}
                    name="password"
                    id="password"
                    placeholder='Password' />
                <div className="info-text mt-2 text-center">
                    <Link to={RouteStrings.forgotpassword} className="text-center tint-color">
                        Forgot Password
                    </Link>
                </div>
                <hr />
                <div className="form-group row text-center  ">
                    <div className="col-sm-1-12   ">
                        <button onClick={handle_submit}
                            className="btn w-100 tint-bg tint-border text-light">
                            Login
                        </button>
                    </div>
                    <div className="info-text mt-2 text-center">
                        <p className="text-center"> Dont Have Account<Link to={RouteStrings.register} className=" mx-1 text-center tint-color">
                            Register
                        </Link></p>
                    </div>
                </div>
            </div>
            <Modal show={isloading} >
                <Loader />
            </Modal>
        </>
    )
}

export default Login