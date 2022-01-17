//✅ OK
import { tokenCheck } from '../../middleware/tokenCheck.mw';
import { Router } from 'express';
import { ReqUser } from '../../types'

const router = Router();

router.get('/', tokenCheck, async (req: ReqUser, res) => {

    res.status(200).json({ message: 'valid' });

})

export default router;


