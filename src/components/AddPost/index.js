import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/posts';
import './style.css'

const AddPost = () => {
    const [newPost, setnewPost] = useState({
        creator: '',
        message: '',
        title: '',
        tags: [],
        selectedFile: '',
        createdAt: new Date().toJSON()
    });
    const dispacth = useDispatch()
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tags') {
            console.log("tages");
            genrateStrArr(value)
        }
        else if (name === 'selectedFile') {
            setImagePath(event.target.files[0]);
        }
        else {
            setnewPost({
                ...newPost,
                [name]: value
            })
        }
    }
    const genrateStrArr = (arg) => {
        let arr = arg?.split(',')
        setnewPost({
            ...newPost,
            tags: [...arr]
        })
    }
    const setImagePath = (e) => {
        console.log("setImagePath ==>", e);
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = () => {
            setnewPost({ ...newPost, selectedFile: reader.result });
        };
    };

    const handle_submit = (e) => {
        e.preventDefault()
        console.log("newPost Data", newPost);
        dispacth(createPost(newPost))
    }

    return (
        <>
            <div>
                <div className="form-group my-2">
                    <label htmlFor={"creator"} >Cretator</label>
                    <input type="text" onChange={handleChange} className="form-control" value={newPost.creator} name={"creator"} aria-describedby="helpId" placeholder='Jhon doe' />
                    <small id="helpId" className="form-text text-muted">Help text</small>
                </div>

                <div className="form-group my-2">
                    <label htmlFor={"title"} >Title</label>
                    <input type="text" onChange={handleChange} className="form-control" value={newPost.title} name={"title"} aria-describedby="helpId" placeholder='new memories' />
                    <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor={'messages'} >Message</label>
                    <textarea type="text" onChange={handleChange} className="form-control" value={newPost.message} name={"message"} aria-describedby="helpId" placeholder='.....' />
                    <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor={'tags'} >Tags</label>
                    <input type="text" onChange={handleChange} className="form-control" value={newPost.tags} name={"tags"} aria-describedby="helpId" placeholder='#newMemories' />
                    <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
                <div className="form-group my-2">
                    <input
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v,video/*"
                        name='selectedFile'
                        placeholder='file'
                        onChange={handleChange}
                        className="custom-file-input"

                    />
                    <small className="form-text text-muted">Help text</small>
                </div>
                <button onClick={handle_submit} type="button" className="btn btn-primary"> Upload</button>

            </div>
        </>
    )


}

export default AddPost