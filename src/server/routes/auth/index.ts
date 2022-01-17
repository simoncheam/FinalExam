//✅ OK
import { Router } from 'express'


import registerRouter from './register'
import loginRouter from './login'
import validateRouter from './validate'

const router = Router();

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/validate', validateRouter)

export default router;