import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { APIService } from '../services/APIService'

const Navbar = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [isAuthed, setIsAuthed] = useState(false)

    useEffect(() => {

        APIService('/auth/validate')
            .then(res => {

                const tokenStatus = res.message === 'valid';
                console.log({ tokenStatus });
                setIsAuthed(tokenStatus)

            })
            .catch(e => {
                console.log(e)
            })

    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-primary m-2' >Home</Link>
            <Link to='/register' className='btn btn-primary m-2' >Register</Link>
            <Link to='/login' className='btn btn-primary m-2' >Login</Link>
            <Link to='/books/new' className='btn btn-primary m-2' >Create Book</Link>

        </div>
    )
}

export default Navbar


