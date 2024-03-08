import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import {Button, Textarea} from 'flowbite-react'



function Comment({comment, onLike, onEdit, onDelete}) {
    const {currentUser} = useSelector(state=> state.user);

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content)
    
 
    useEffect(() => {
        setEditContent(comment.content);
    }, [comment]);

    useEffect(()=>{
        const getUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/server/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok) {
                    setUser(data)
                }
                
            } catch (error) {
                console.log(error.message);
            }

        }
        getUser();
    },[comment]);

    const handleEdit = async () => {
        setIsEditing(true);
        setEditContent(comment.content)

    }
    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:3000/server/comment/editcomment/${comment._id}`,{
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    content: editContent
                }),
            });
            if(res.ok) {
                setIsEditing(false);
                onEdit(comment, editContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
   
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className="flex-shrink-0 mt-3">
        <img src={user.avatar} alt={user.username}
       className='h-10 w-10 rounded-full bg-gray-200'/>
        </div>

    <div className="flex-1">
        <div className="flex items-center mb-1 gap-5">
            <span className='font-bold mr-1 text-xs truncate'>
                {user ? `@${user.username}` : 'anonymous user'}
                </span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        {
            isEditing ? (
                <>
                <Textarea 
                className='mb-2'
                rows='3'
                value={editContent}
                onChange={(e)=>setEditContent(e.target.value)}/>
                <div className="flex justify-end gap-2 text-xs">
                    <Button type='button' gradientDuoTone='purpleToBlue'
                    onClick={handleSave}
                    >Save</Button>
                    <Button type='button' gradientDuoTone='purpleToBlue' outline
                    onClick={()=>setIsEditing(false)}>
                        Cancel</Button>
                </div>
                </>
            ) :(
                <>
        <p className='text-gray-500 ml-4'>{comment.content}</p>
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 maw-w-fit gap-2' >
            <button type='button' onClick={()=>onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 
            ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' }`} >
                <FaThumbsUp/>
                </button>
                <p className='text-gray-400 text-xs'>
                 {comment.numberOfLikes > 0 && comment.numberOfLikes + " " +
                 (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                 </p>

                 { 
                 currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                    <button className='text-xs text-gray-400 hover:text-blue-500'
                    onClick={handleEdit}>
                        Edit
                        </button>
                    <button className='text-xs text-red-700 hover:text-red-500'
                    onClick={()=> onDelete(comment._id)}>
                        Delete
                        </button>
                    </>
                 )
                 }
                
        </div>
        </>
          )
        }
    </div>
    </div>
  )
}

export default Comment