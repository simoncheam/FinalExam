import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { APIService } from '../services/APIService'

const PrivateWrapper = ({ children }: PrivateRouteProps) => {

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
        <>
            {/* <h1 className="display-3 m-3 text-center"> Private Wrapper </h1> */}
            {children}
            <Outlet />

        </>
    )
}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode
}

export default PrivateWrapper
