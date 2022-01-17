import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { BooksJoined } from '../client_types';
import { APIService } from '../services/APIService';


const Books = () => {

    const [books, setBooks] = useState<BooksJoined[]>([])
    const nav = useNavigate();



    useEffect(() => {

        APIService("/api/books", 'GET')
            .then((data) => {
                data = data[0];
                setBooks(data)

            }).catch(e => {
                console.log(e);
            });



    }, [])


    if (!books) { return <> Loading...</> }




    return (
        <div>
            <h1 className="display-3 m-3 text-center">Books Listing </h1>

            <div>
                {books.map(book => (

                    <div className="row justify-content-center m-2">
                        <div className="col-md-6">
                            <h1>📕 {book.b_title}</h1>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Author: {book.b_author} </h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Category: {book.cat_name}</h6>
                                    <p className="card-text">Price: {book.b_price.toLocaleString('en-US',
                                        {
                                            style: 'currency',
                                            currency: 'USD',
                                        })} </p>
                                    <button onClick={() => nav(-1)} className="row btn btn-primary m-2">Go Back </button>
                                    <Link to={`/books/${book.book_id}`} className="row btn btn-warning m-2">Read More </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                ))}
            </div>

        </div>
    )
}

export default Books
