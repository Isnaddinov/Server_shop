import {Router} from 'express'
import { getCategories, postCategories, updateCategories, deleteCategories} from '../controllers/categoires/catigories'
import { uploadFile } from '../middlewares/uploads'
import { categoriesCheck } from '../validators/categories'
import { userMiddleWhere } from '../middlewares/userMiddlewere'

const router = Router()


router.post('/post', categoriesCheck(), userMiddleWhere, postCategories)
router.get('/get', getCategories)
router.delete('/delete/:id', userMiddleWhere, deleteCategories)
router.put('/put/:id', categoriesCheck(), userMiddleWhere, updateCategories)

module.exports = router