import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Images } from '../../assets/images'
import { RouteStrings } from '../../routes/RouteStrings';
import './style.css';
const AccessDenied = () => {

    const Navigate = useNavigate();
    const handle_click = (e) => {
        e.preventDefault();
        Navigate(RouteStrings.login)
    }
    return (
        <>
            <div className="accessDenied d-flex flex-column justify-content-start align-items-center">
                <img className="accessDenied-img-top" src={Images.AccessDenied} alt={'img'} />
                <div className="accessDenied-body d-flex flex-column justify-content-center align-items-center ">
                    <h4 className="accessDenied-title">Access Denied</h4>
                    <button onClick={handle_click} className="btn text-light tint-bg px-5"> Login</button>
                </div>
            </div>
        </>
    )
}

export default AccessDenied