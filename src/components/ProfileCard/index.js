import React from 'react'
import './style.css'
const ProfileCard = () => {
    return (
        <>
            <div className="profile_card">
                <div className="profileCardWrapper">
                    <div className="bannerImg">
                        <img src='https://images.pexels.com/photos/7134988/pexels-photo-7134988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="banner" />
                    </div>
                    <div className="profile_image_wrapper   ">
                        <img src="https://i.pravatar.cc/300" alt="" className="profile_img" />
                        <h5 className="profilename">jhon doe</h5>
                    </div>
                </div>
                <hr className="horizontal_line" />
                <div className="profile_card_body ">
                    <div className="number_details ">
                        <div className="numbers">
                            <h4 className="Number">12.5k</h4>
                            <p className="subtext">followers</p>
                        </div>
                        <div className="numbers">
                            <h4 className="Number">198</h4>
                            <p className="subtext">Following</p>
                        </div>
                        <div className="numbers">
                            <h4 className="Number">3</h4>
                            <p className="subtext">Groups</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard