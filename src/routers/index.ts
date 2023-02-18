import {Router} from 'express'
import userRouter from './users'
import basketRouter from './basket'
import categoriesRouter from './categories'
import typeRouter from './types'
import productRouter from './products'
import user_infoRouter from './user_info'


const router = Router()


router.use('/user', userRouter )
router.use('/basket', basketRouter )
router.use('/categories', categoriesRouter )
router.use('/types', typeRouter )
router.use('/products', productRouter )
router.use('/user_info', user_infoRouter )

export default router


