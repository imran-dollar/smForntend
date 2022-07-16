import React, { useEffect, useState } from "react";
import AddPost from "../../components/AddPost";
import PostCard from "../../components/PostCard";
import { fetchAllPosts } from "../../Services";
import "./style.css";
const Posts = () => {
    useEffect(() => {
        getAllPosts()
    }, []);
    const getAllPosts = async () => {
        let resp = await fetchAllPosts()
        if (!resp) return
        console.log("resp", resp);
        setAllPosts(resp.data)
    }
    const [AllPosts, setAllPosts] = useState([])
    return (
        <>
            <div className=" row mx-2">
                <div className="col-md-5"></div>
                <div className="col-md-4 border border-danger d-flex flex-row flex-wrap">
                    {
                        AllPosts.map((item, index) => {
                            return (
                                <PostCard key={index} data={item} />
                            )
                        })
                    }

                </div>
                <div className=" addForm  col-md-3 ">
                    <AddPost />
                </div>
            </div>

        </>
    );
};

export default Posts;
