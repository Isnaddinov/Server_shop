import {Router} from 'express'

const userRouter = require('./users')
const basketRouter = require('./basket')
// const basket_productRouter = require('./basket_product')
const categoriesRouter = require('./categories')
const typeRouter = require('./types')
const productRouter = require('./products')
const user_infoRouter = require('./user_info')


const router = Router()



router.use('/user', userRouter )
router.use('/basket', basketRouter )
// router.use('/basket_product', basket_productRouter )
router.use('/categories', categoriesRouter )
router.use('/types', typeRouter )
router.use('/products', productRouter )
router.use('/user_info', user_infoRouter )

module.exports = router


