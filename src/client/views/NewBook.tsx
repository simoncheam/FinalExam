import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Categories } from '../client_types';
import { APIService } from '../services/APIService';

const NewBook = () => {
    const nav = useNavigate();


    const [selectedCategoryId, setSelectedCategoryId] = useState<number>()
    const [categories, setCategories] = useState<Categories[]>([])

    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookPrice, setBookPrice] = useState('')

    useEffect(() => {

        APIService(`/api/categories/`)
            .then((data: Categories[]) => {
                setCategories(data)




            }).catch(e => {
                console.log(e);
            });


    }, [])




    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        APIService("/api/books", 'POST', {
            title: bookTitle,
            author: bookAuthor,
            price: bookPrice,
            categoryid: selectedCategoryId

        })
            .then(data => {

                alert('cool book!')


                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
            })

    }

    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedCategoryId(Number(e.target.value))
    }




    return (
        <div>
            <h1 className="display-3 m-3 text-center"> Create New Book </h1>

            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Create your book...</div>

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
                                        value={bookPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookPrice(e.target.value)}

                                        placeholder='your price'
                                        type='text' />

                                    <button onClick={handleSubmitButton} className='btn btn-success mt-3'> Click to create book!</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>





        </div>
    )
}

export default NewBook
