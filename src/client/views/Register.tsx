// ✅ OK
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
            <h1 className="display-3 m-3 text-center">Register Your Account </h1>

            {/* registration form */}
            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Create your account to get started...</div>

                            <div className="card-body">
                                <h1> Complete the fields below: </h1>
                                <form className="form-group my-2">
                                    <label>Username:</label>
                                    <input className="form-control"
                                        value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                                        placeholder='your username'
                                        type='text' />

                                    <label>Email:</label>
                                    <input className="form-control"
                                        value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}

                                        placeholder='your email'
                                        type='text' />

                                    <label>Password:</label>
                                    <input className="form-control"
                                        value={userPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)}

                                        placeholder='your password'
                                        type='password' />

                                    <button onClick={handleSubmitButton} className='btn btn-success mt-3'> Click to Register!</button>

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
