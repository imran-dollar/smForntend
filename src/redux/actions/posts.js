
import * as API from '../../Services'

export const getPosts = () => async (dispacth) => {
    try {
        const resp = await API.fetchAllPosts();
        if (resp) {
            dispacth({ type: 'FETCH_ALL', payload: resp?.data })
        }
    } catch (error) {
        console.log("error", error);
    }
}
export const createPost = (POST) => async (dispacth) => {
    try {
        const { data } = await API.createPost(POST)
        dispacth({ type: "CREATE", payload: data })
    } catch (error) {
        console.log("🚀 ~ file: posts.js ~ line 19 ~ createPost ~ error", error)
    }
}