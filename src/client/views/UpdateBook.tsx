import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const UpdateBook = () => {

    const nav = useNavigate();
    let params = useParams();
    const book_id = params.id



    const [selectedCategoryId, setSelectedCategoryId] = useState<number>()


    const [categories, setCategories] = useState<Categories[]>([])

    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookPrice, setBookPrice] = useState<number>(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [book, setBook] = useState<Books>()
    const [categoryId, setCategoryId] = useState<number>()



    useEffect(() => {

        APIService(`/api/books/${book_id}`)
            .then((data: Books) => {
                setBook(data)
                console.log({ book });
                setSelectedCategoryId(book.categoryid)
                setBookAuthor(data.author)
                setBookPrice(Number(data.price))

                setCategoryId(data.categoryid)
                console.log({ categoryId });

                setIsLoaded(true)




            }).catch(e => {
                console.log(e);
            });



    }, [])

    useEffect(() => {

        APIService(`/api/categories/`)
            .then((data: Categories[]) => {
                setCategories(data)




            }).catch(e => {
                console.log(e);
            });


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



    //if (!book) { return <> Loading...</> }





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
                                        placeholder='your title'
                                        type='text' />

                                    <label>Author:</label>
                                    <input className="form-control"
                                        value={bookAuthor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookAuthor(e.target.value)}

                                        placeholder='your author'
                                        type='text' />

                                    <label>Price:</label>
                                    <input className="form-control"
                                        value={bookPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookPrice(Number(e.target.value))}

                                        placeholder='your price'
                                        type='number' />

                                    <button onClick={handleUpdateButton} className='btn btn-success mt-3'> Click to update book!</button>
                                    <button onClick={handleDeleteButton} className='btn btn-danger mt-3'> DELETE</button>
                                    <button onClick={() => nav(-1)} className='row btn btn-primary m-2' >Go Back</button>

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
