import React, { useState } from 'react'
import { Images } from '../../../assets/images';
import './style.css';
const PasswordInput = (props) => {
    const { OnChange, OnBlur, Val, label, errMsg, ...rest } = props
    const [InputVal, setInputVal] = useState(Val);
    const { name } = props
    const [err, seterr] = useState(false);
    const [showPassword, setshowPassword] = useState(false)
    const handle_blur = (e) => {
        !e.target.value.length > 0 ? seterr(true) : seterr(false)
        OnBlur(e)
    }
    const handle_change = (e) => {
        setInputVal(e.target.value)
        OnChange(e)
    }
    return (
        <>
            <div className="form-group row">
                <label htmlFor="newPassword" className="col-sm-1-12 col-form-label" >
                    {label || 'Password-'}
                </label>
                <div className="col-sm-1-12 d-flex flex-row justify-content-between position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={InputVal}
                        onChange={handle_change}
                        onBlur={handle_blur}
                        className="form-control form-control-focus"
                        {...rest}
                    />
                    {
                        !showPassword ?
                            <button onClick={() => setshowPassword(!showPassword)} className="btn-img">
                                <img className='eye-img' src={Images.eyeOpen} alt="eye open" />
                            </button>
                            :
                            <button onClick={() => setshowPassword(!showPassword)} className="btn-img">
                                <img className='eye-img' src={Images.eyeClosed} alt="eye open" />
                            </button>
                    }


                </div>
                {/* <img src={Images.eyeClosed} alt="eye closed" /> */}
                {err && <p class="mx-2 w-auto  form-text text-capitalize text-danger">
                    {errMsg}
                </p>}
            </div>
        </>
    )
}

export default PasswordInput