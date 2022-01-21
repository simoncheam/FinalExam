//✅ OK
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import { Router } from 'express';
import { ReqUser } from '../../types'

const router = Router();

router.get('/', tokenCheck, async (req: ReqUser, res) => {


    try {
        res.status(200).json({ message: 'valid' });

    } catch (error) {

        res.status(500).json({ message: "Not valid", error });
    }


})

export default router;


