import axiosInstence from "./axiousInstence";

const URL = "http://localhost:4000/posts/"
export const fetchAllPosts = async () => {
    let response;
    await axiosInstence.get(URL).then(res => {
        response = res
    }).catch(err => {
        console.log("err", err);
    })
    return response
}
export const increaseLikeCount = async (_id) => {
    let response;
    await axiosInstence.put(URL + 'likePost/' + _id).then(res => {
        response = res
    }).catch(err => {
        console.log("err", err);
        response = err
    })
    return response
}
export const createPost = (newPost) => axiosInstence.post(URL, newPost)