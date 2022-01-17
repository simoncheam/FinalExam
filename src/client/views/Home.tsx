import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="row m-5 justify-content-center">
            <div className=' col-md-6'>

                <h1 className="display-3 m-3 text-center">Home Page </h1>
                <Link to={'/books'} className="row btn btn-primary m-2">Books </Link>
                <Link to={'/register'} className="row btn btn-warning m-2">register </Link>
                <Link to={'/login'} className="row btn btn-warning m-2">login </Link>

            </div>

        </div>
    )
}

export default Home
