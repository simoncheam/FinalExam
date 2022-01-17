import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { APIService } from '../services/APIService';

const Login = () => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const nav = useNavigate();

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        APIService("/auth/login", 'POST', {

            email: userEmail,
            password: userPassword

        })
            .then(data => {

                alert('Welcome back to the store!')

                localStorage.setItem('token', data.token)
                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
                alert('invalid credentials, please try again')
            })

    }




    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Login </h1>


            {/* Login Form  */}
            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Welcome back to the store!</div>

                            <div className="card-body">
                                <h1> Log in to create, edit, and sell your books: </h1>
                                <form className="form-group my-2">


                                    <label>Email:</label>
                                    <input className="form-control"
                                        value={userEmail} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setUserEmail(e.target.value)}

                                        placeholder='your email'
                                        type='text' />

                                    <label>Password:</label>
                                    <input className="form-control"
                                        value={userPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setUserPassword(e.target.value)}

                                        placeholder='your password'
                                        type='password' />

                                    <button onClick={handleSubmitButton} className='btn btn-success mt-3'> Click to Login!</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>



        </div>
    )
}

export default Login
