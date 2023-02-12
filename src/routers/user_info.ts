import {Router} from 'express'
import { getUser_info, postUser_info, deleteUser_info } from '../controllers/user_info/user_info'
import { user_InfoCheck } from '../validators/user_info'

const router = Router()


router.post('/post', user_InfoCheck(), postUser_info)
router.get('/get', getUser_info)
router.delete('/delete/:id', deleteUser_info)

module.exports = router