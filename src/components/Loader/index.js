import { Modal } from 'bootstrap'
import React from 'react'

const Loader = (props) => {
    // const { isLoading } = props
    return (

        <div className="text-center">
            <img className='w-25 h-25' src='https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif' alt="loader" />
            <h5>Loading</h5>
        </div>

    )
}

export default Loader