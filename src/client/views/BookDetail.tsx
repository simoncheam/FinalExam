import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, BooksJoined, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const BookDetail = () => {

    let params = useParams();
    const book_id = params.id;
    const [book, setBook] = useState<Books[]>()
    const [category, setCategory] = useState<Categories[]>()
    const nav = useNavigate();
    const [isLoaded, setIsLoaded] = useState<boolean>(false)


    useEffect(() => {

        APIService(`/api/books/${book_id}`, 'GET')
            .then((data: Books[]) => {
                setBook(data)
                setIsLoaded(true)

                APIService(`/api/categories/${book}`, 'GET')
                    .then((data: Categories[]) => {




                    }).catch(e => {
                        console.log(e);
                    });





            }).catch(e => {
                console.log(e);
            });



    }, [isLoaded])


    if (!isLoaded) { return <> Loading...</> }




    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Book Detail </h1>

            <div className="row justify-content-center m-2">
                <div className="col-md-6">
                    <h1>📕 {book}</h1>
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


        </div>
    )
}

export default BookDetail
