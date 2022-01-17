import { Router } from "express";

import booksRouter from './books'
import categoriesRouter from './categories'
import usersRouter from './books'

const router = Router();

router.use('/books', booksRouter)
router.use('/categories', categoriesRouter)
router.use('/users', usersRouter)

export default router;