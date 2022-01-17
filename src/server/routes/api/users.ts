import * as express from 'express';
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import { ReqUser } from '../../types';
import booksDB from '../../database/queries/books'

const router = express.Router();



//get all
router.get('/', async (req, res) => {

    try {
        // const results = await DB.get_all();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})


//get one by id

//create one

//update one by id

// delete


export default router;