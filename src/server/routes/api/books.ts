import * as express from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import { Books, ReqUser } from '../../types';
import booksDB from '../../database/queries/books'

const router = express.Router();



//get all
router.get('/', async (req, res) => {

    try {
        const all_books = await booksDB.get_all_joined();

        res.status(200).json(all_books);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})


//get one by id
router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const one_book = await booksDB.get_one_by_id(id);

        if (!one_book) {
            res.status(404).json({ message: "Book not found " })

        }
        res.status(200).json(one_book);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//create one

router.post('/', async (req: ReqUser, res) => {

    const { title, author, price, categoryid }: Books = req.body;

    //input validation

    if (!title || !author || !price || !categoryid) {
        return res.status(400).json({ message: "Fill out everything!" })
    }


    try {

        const newBookresults = await booksDB.create({ title, author, price, categoryid });
        res.status(200).json({ message: 'Book Created!' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

//update one by id
router.put('/:id', async (req: ReqUser, res) => {
    try {

        const id = Number(req.params.id);
        const { title, author, price, categoryid }: Books = req.body;

        if (!title || !author || !price || !categoryid) {
            return res.status(400).json({ message: "Fill out everything!" })
        }


        const bookUpdateResults = await booksDB.update({ title, author, price, categoryid }, id);


        if (bookUpdateResults.affectedRows) {

            res.status(201).json({ message: "Updated Book!" });

        } else {
            res.status(401).json({ message: "Not authorized!" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})






// delete

router.delete('/:id', async (req, res) => {

    const id = Number(req.params.id);


    try {
        await booksDB.destroy(id);
        res.status(200).json({ message: 'book deleted!' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})


export default router;