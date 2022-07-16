import React, { useEffect } from 'react'
import { Images } from '../../assets/images'
import { handleDate } from '../../utility/timeConvertion';
import { increaseLikeCount } from '../../Services/'
import './style.css'
const PostCard = (props) => {
    const { data } = props
    useEffect(() => {
        // console.log("datadata", data);
    }, [])
    const { _id, creator, likeCount, selectedFile, title, createdAt, tags } = data

    const handle_likeCount = async (_id,) => {
        let res = await increaseLikeCount(_id);
        if (!res) return
        console.log('res handle_likeCount', res);
    }

    return (
        <>
            <div className="services" key={_id}>
                <div className="content content-1">
                    <div className="d-flex flex-row p-1 mb-2 ">
                        <img className="img-fluid profile-img" src="https://cdn.pixabay.com/photo/2022/03/31/18/05/siblings-7103506_960_720.jpg" alt='profile-pic' />
                        <div className="d-flex flex-column  justify-content-start align mx-2">
                            <h5 className='createor_name'>{creator}</h5>
                            {/* <p className="createdAt">{handleDate(createdAt)}</p> */}
                            {createdAt ?
                                <p className="createdAt">{handleDate(createdAt)}</p>
                                : <p className="createdAt">{"- -"}</p>
                            }
                        </div>
                    </div>
                    <hr className="m-0 mb-2" />
                    <div className="">
                        <p>
                            {title}
                        </p>
                    </div>
                    <img
                        src={selectedFile} alt="" className="img-fluid my-2 customborder" />
                    {/* <a href="#">Read More</a> */}
                    <div className="social_media_Icons">
                        <div className='d-flex flex-row justify-content-start align-items-center'>
                            <button onClick={() => handle_likeCount(_id, likeCount)} className="btn">
                                <img className="heart" src={Images.heart} alt="heart-icon" />
                            </button>
                            <p className="my-0 ">{likeCount}</p>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default PostCard