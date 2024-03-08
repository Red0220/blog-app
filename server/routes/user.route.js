import express from 'express'
import { test,updateUser,deleteUser ,signOut,getUsers,getUser} from '../controllers/user.controler.js';
import { verfyToken } from '../utilities/verify.user.js';


const router = express.Router();


router.get('/test', test);
router.put('/update/:userId',verfyToken, updateUser);
router.delete('/delete/:userId',verfyToken, deleteUser);
router.post('/signout', signOut);
router.get('/getusers', verfyToken, getUsers)
router.get('/:userId', getUser)

export default router