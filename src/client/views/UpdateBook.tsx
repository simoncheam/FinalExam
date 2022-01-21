import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const UpdateBook = () => {

    const nav = useNavigate();
    let params = useParams();
    const book_id = params.id



    const [book, setBook] = useState<Books>()
    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookPrice, setBookPrice] = useState<number>(null)

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>()

    const [categories, setCategories] = useState<Categories[]>([])

    const [isLoaded, setIsLoaded] = useState<boolean>(false)



    useEffect(() => {

        //API stuff

        APIService(`/api/books/${book_id}`)
            .then((data: Books) => {
                console.log({ data });
                // state stuff
                setBook(data)

                // set book placeholders
                setSelectedCategoryId(data.categoryid)

                setBookTitle(data.title)
                setBookAuthor(data.author);
                setBookPrice(data.price);


                setIsLoaded(true)



                APIService(`/api/categories`)
                    .then(data => {

                        // state stuff
                        setCategories(data);
                    })
                    .catch(e => {
                        console.log(e)
                    })

            })
            .catch(e => {
                console.log(e)
            })

    }, [])




    const handleUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        APIService(`/api/books/${book_id}`, 'PUT', {
            title: bookTitle,
            author: bookAuthor,
            price: bookPrice,
            categoryid: selectedCategoryId

        })
            .then(data => {

                alert('thanks for the update!')


                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
            })

    }



    const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        if (confirm('are you sure?')) {

            APIService(`/api/books/${book_id}`, 'DELETE')
                .then(data => {

                    alert('Deleted book!')

                    nav(`/books`)

                })
                .catch(e => {
                    console.log(e)
                })
        }


    }

    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedCategoryId(Number(e.target.value))
    }



    if (!book || !categories) { return <> Loading...</> }





    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Update Book </h1>

            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Update your book...</div>

                            <div className="card-body">
                                <h1> Complete the fields below: </h1>
                                <form className="form-group my-2">

                                    <select value={selectedCategoryId} onChange={handleCategoryIdSelectUpdate} className='form-control'>

                                        <option value={0} >Select a Category </option>


                                        {categories.map(cat => (


                                            <option key={`category-${cat.id}-${cat.name}`} value={cat.id}>
                                                {cat.name}
                                            </option>

                                        ))}
                                    </select>



                                    <label>Title:</label>
                                    <input className="form-control"
                                        value={bookTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookTitle(e.target.value)}
                                        placeholder={book.title}
                                        type='text' />

                                    <label>Author:</label>
                                    <input className="form-control"
                                        value={bookAuthor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookAuthor(e.target.value)}

                                        placeholder={book.author}
                                        type='text' />

                                    <label>Price:</label>
                                    <input className="form-control"
                                        value={bookPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookPrice(Number(e.target.value))}

                                        placeholder={book.price.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                        type='number' />

                                    <button onClick={() => nav(-1)} className='row btn btn-primary m-3' >Go Back</button>
                                    <button onClick={handleUpdateButton} className='btn btn-success m-3'> Click to update book!</button>
                                    <button onClick={handleDeleteButton} className='btn btn-danger m-3'> DELETE</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default UpdateBook
