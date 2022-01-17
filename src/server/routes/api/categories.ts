import * as express from 'express';
import { ReqUser } from '../../types';
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import categoriesDB from '../../database/queries/categories'

const router = express.Router();

// get all

router.get('/', async (req, res) => {

    try {
        const all_categories = await categoriesDB.get_all();
        res.status(200).json(all_categories);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }

})

//get one by id

router.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    try {
        const one_category = await categoriesDB.get_one_by_id();

        //does user exist check? if/else
        res.status(200).json(one_category);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "A server errors occurred", error: error.sqlMessage });
    }
})

export default router;
