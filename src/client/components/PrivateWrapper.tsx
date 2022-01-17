import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { APIService } from '../services/APIService'

const PrivateWrapper = ({ children }: PrivateRouteProps) => {

    const [isAuthed, setIsAuthed] = useState(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)



    useEffect(() => {

        APIService('/auth/validate')
            .then(res => {

                const tokenStatus = res.message === 'valid';
                console.log({ tokenStatus });
                setIsAuthed(tokenStatus)
                setIsLoaded(true)

            })
            .catch(e => {
                console.log(e)

            })

    }, [])

    if (!isLoaded) { return <> Loading...</> }
    if (!isAuthed) {
        return <Navigate to='/login' />
    } else {



        return (
            <>
                {/* <h1 className="display-3 m-3 text-center"> Private Wrapper </h1> */}
                {children}
                <Outlet />

            </>
        )
    }
}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode
}

export default PrivateWrapper
