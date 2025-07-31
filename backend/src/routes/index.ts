import { Router } from 'express'
import userRoutes from '../modules/user/user.route'
import bookRoutes from '../book/book.route'

const router = Router()

router.use('/users', userRoutes)
router.use('/books', bookRoutes)

export default router
