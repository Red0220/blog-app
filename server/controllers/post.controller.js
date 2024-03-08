import Post from "../models/post.model.js";
import { errorHandler } from "../utilities/error.js"

export const createPost = async (req, res, next) => {
    console.log(req.user);
if(!req.user.isAdmin){
  return  next(errorHandler(403, 'you are not allowed to create apost'));

}
if(!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'))
}
const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g , ' ');
const newPost = new Post({
    ...req.body , 
    slug, 
     userId: req.user.id,
});
try {
    const savesPost = await newPost.save();
    res.status(201).json(savesPost);
} catch (error) {
    next(error)
}
}

export const getPosts = async (req, res, next) => {
    try {
       const startIndex = parseInt(req.query.startIndex) || 0 ;
       const limit = parseInt(req.query.limit) || 9 ;
       const setDirection = req.query.order === 'asc' ? 1 : -1 ;
       const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId}),
        ...(req.query.category && {category: req.query.category}),
        ...(req.query.slug && { slug: req.query.slug}),
        ...(req.query.postId && { _id: req.query.postId}),
        ...(req.query.searchTerm && {
           $or: [
            {title: { $regex: req.query.searchTerm, $options: 'i'}},
            {content: { $regex: req.query.searchTerm, $options: 'i'}},
           ] ,
        }),
     } ).sort({ updatedAt: setDirection}).skip(startIndex).limit(limit);
    
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1 ,
    now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
        createdAt : { $gte: oneMonthAgo}
    });
    res.status(200).json({
        posts ,
        totalPosts,
        lastMonthPosts
    });
    } catch (error) {
        next(error)
    }

}


export const deletePosts = async (req, res, next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(401, 'you are not allowed to delete this post'));
    }
    
    try {
        console.log(req.params.postId);
       await Post.findByIdAndDelete(req.params.postId);
       res.status(200).json('The post has been deleted ')
    } catch (error) {
        next(error);
    }
}

export const updatePosts = async (req, res, next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId ) {
       return next(errorHandler(403, 'You are not allowed to update this post'));

    }

    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.postId , {
        $set: {
            title: req.body.title ,
            content: req.body.content ,
            category: req.body.category ,
            image: req.body.image ,
        },
        } , {new: true});
        res.status(200).json(updatePost)
        
    } catch (error) {
        next(error)
    }
}