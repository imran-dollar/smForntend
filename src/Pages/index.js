import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Posts from './Posts/Posts';
const Pages = () => {
    return (
        <>
            <h3>new Page</h3>
            <Routes>
                <Route path='/posts' element={<Posts />} />
            </Routes>
        </>
    )
}

export default Pages