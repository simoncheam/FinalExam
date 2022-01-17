import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { APIService } from '../services/APIService';

const Register = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')


    const nav = useNavigate();

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        APIService("/auth/register", 'POST', {
            name: userName,
            email: userEmail,
            password: userPassword

        })
            .then(data => {

                alert('Welcome!')

                localStorage.setItem('token', data.token)
                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
            })

    }




    return (
        <div>
            <h1 className="display-3 m-3 text-center">Register </h1>


            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Header Title</div>

                            <div className="card-body">
                                <h1>Customer: Header 1 </h1>
                                <form className="form-group my-2">
                                    <label>Label 1:</label>
                                    <input className="form-control" value={"placeholder 1"} />

                                    <label>Label 2:</label>
                                    <input className="form-control" value={"placeholder 2"} />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default Register
