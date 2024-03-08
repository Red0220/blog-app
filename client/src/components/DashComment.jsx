import React from 'react'
import  { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Modal, Table, Button} from 'flowbite-react'
import {HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck ,FaTimes} from 'react-icons/fa'


function DashComment() {
  const { currentUser} = useSelector(state => state.user);
  const [comments, setComments] =useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  console.log(comments);
  console.log(currentUser._id);
 
  useEffect(()=> {
     const fetchComments = async () => {

       try {
     const res = await fetch('http://localhost:3000/server/comment/getcomments', {
      credentials: 'include'
     });
      const data = await res.json();
      console.log(data.allComments);
      if(res.ok) {
        setComments(data.allComments);
        if(data.allComments.length < 9) {
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
     }

     if(currentUser.isAdmin) {
      fetchComments()
     }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`http://localhost:3000/server/comment/getcomments?startIndex=${startIndex}`, {
        credentials: 'include'
      }
      );
      const data = await res.json();
      if(res.ok){
        setComments((prev)=> [...prev, ...data.allComments]);
        if(data.allComments.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelelteComment = async ()=> {
    setShowModal(false);
    try {
     const res = await fetch(`http://localhost:3000/server/comment/deletecomment/${commentIdToDelete}`, {
      method: 'DELETE',
      credentials: 'include'
     });
     const data = await res.json();
     if(res.ok) {
      setComments((prev) => prev.filter((comment)=> comment._id !== commentIdToDelete));
         setShowModal(false)
     }
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <div className='table-auto text-center overflow-x-scroll 
     md:mx-auto p-3 scrollbar scrollbar-track-slate-100
      scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark: scrollbar-thumb-slate-500'>
      { currentUser.isAdmin && comments.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>

            <Table.HeadCell> Date Updated</Table.HeadCell>

            <Table.HeadCell> Comment Conetent </Table.HeadCell>
            <Table.HeadCell> Numberr Of Likes</Table.HeadCell>
            <Table.HeadCell> POst Id</Table.HeadCell>

            <Table.HeadCell> userId</Table.HeadCell>

            <Table.HeadCell> Delete </Table.HeadCell>

           
          </Table.Head>

          { comments.map((comment)=> (
            <Table.Body key={comment._id} className='divide-y'>
             <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-900'>

              <Table.Cell>
                {new Date(comment.updatedAt).toLocaleString()}
                </Table.Cell>

                <Table.Cell>{comment.content}</Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>

                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                     setCommentIdToDelete(comment._id);
                  }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>

                <Table.Cell>
                 
                </Table.Cell>

             </Table.Row>
            </Table.Body>
 ) )}
            
           
           
        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )
        }
        </>

      ) 
     : (
      <p>you do not have any comments yet</p>
     )

      }
       <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure  you want to delete this comment</h3>
              <div className="flex justify-between">
              <Button color='failure' onClick={handleDelelteComment}>yes,I'm sure</Button>
              <Button onClick={()=>setShowModal(false)} color='gray'>Cancel</Button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      
    </div>
  )
}

export default DashComment