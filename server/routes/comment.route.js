import express from 'express';
import {verfyToken} from '../utilities/verify.user.js'

import {createComment, getComment, likeComment,
    editComment, deleteComment , getComments} from '../controllers/comment.controller.js'

const router = express.Router();;

router.post('/create',verfyToken, createComment);
router.get('/getcomment/:postId', getComment);
router.put('/likecomment/:commentId', verfyToken, likeComment);
router.put('/editcomment/:commentId', verfyToken, editComment);
router.delete('/deletecomment/:commentId', verfyToken, deleteComment);
router.get('/getcomments', verfyToken, getComments);

export default router