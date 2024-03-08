import express from 'express';
import { createPost, getPosts, deletePosts, updatePosts} from '../controllers/post.controller.js';
import { verfyToken } from '../utilities/verify.user.js';

const router = express.Router();

router.post('/create',verfyToken ,createPost);
router.get('/getposts', getPosts);
router.delete('/deleteposts/:postId/:userId', verfyToken ,deletePosts);
router.put('/updateposts/:postId/:userId', verfyToken ,updatePosts);
export default router ;