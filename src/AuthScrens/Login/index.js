import React, { useState } from 'react'
import './style.css'
import { AuthLoginService } from '../../Services/AuthService'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
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
        console.log("formData", formData);
        // return
        const res = await AuthLoginService(formData)
        if (res?.statusCode == 200) {
            console.log("replace to posts");
            window.location.replace('/pages/posts')
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
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-1-12 col-form-label" >
                        Password
                    </label>
                    <div className="col-sm-1-12">
                        <input autoComplete='off' type="password"
                            required
                            value={formData.password}
                            onChange={handle_change}
                            onBlur={handle_blur}
                            className="form-control form-control-focus"
                            name="password"
                            id="password"
                            placeholder='Password' />
                    </div>
                    {error.password && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                        please Enter Password
                    </p>}
                </div>

                <hr />
                <div className="form-group row text-center  ">
                    <div className="col-sm-1-12   ">
                        <button onClick={handle_submit} className="btn w-100 tint-bg tint-border text-light ">Register</button>
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