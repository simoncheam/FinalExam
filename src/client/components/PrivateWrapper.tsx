import React from 'react'
import { Outlet } from 'react-router'

const PrivateWrapper = ({ children }: PrivateRouteProps) => {
    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Private Wrapper </h1>
            <Outlet />
            {children}

        </div>
    )
}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode
}

export default PrivateWrapper
