import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Modal, Table, Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {HiOutlineExclamationCircle } from 'react-icons/hi'
function DashPosts() {
  const { currentUser} = useSelector(state => state.user);
  const [userPosts, setuserPosts] =useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelelte] = useState('');

  
 
  useEffect(()=> {
     const fetchPosts = async () => {

       try {
      const res  = await fetch(`http://localhost:3000/server/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();

      if(res.ok) {
        setuserPosts(data.posts);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
     }

     if(currentUser.isAdmin) {
      fetchPosts()
     }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`http://localhost:3000/server/post/getposts?userId=
      ${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setuserPosts((prev)=> [...prev, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleltePost = async ()=> {
    setShowModal(false);
    try {
     const res = await fetch(`http://localhost:3000/server/post/deleteposts/${postIdToDelete}/${currentUser._id}`,{
        method: 'DELETE',
        credentials: 'include',
       });
       const data = await res.json();
       if(!res.ok) {
        console.log(data.message);
       } else {
        setuserPosts((prev) => prev.filter((post)=> post._id !== postIdToDelete));
        
       }
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <div className='table-auto overflow-x-scroll 
     md:mx-auto p-3 scrollbar scrollbar-track-slate-100
      scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { currentUser.isAdmin && userPosts.length > 0  ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>

            <Table.HeadCell> Date updated</Table.HeadCell>

            <Table.HeadCell> Post image</Table.HeadCell>
            <Table.HeadCell> title</Table.HeadCell>

            <Table.HeadCell> Category</Table.HeadCell>

            <Table.HeadCell> Delete </Table.HeadCell>

            <Table.HeadCell> 
              <span className='hidden md:block'> Edit</span>
              </Table.HeadCell>
          </Table.Head>

          {userPosts &&  userPosts.map((post)=>(
            <Table.Body key={post._id} className='divide-y'>
             <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-900'>

              <Table.Cell>
                {new Date(post.updatedAt).toLocaleString()}
                </Table.Cell>

                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title}
                    className='w-20 h-10 object-cover bg-gray-500'/>
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>

                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                    setPostIdToDelelte(post._id);
                  }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>

                <Table.Cell>
                  <Link to={`/updatepost/${post._id}`} className='text-teal-500 hover:underline cursor-pointer'>
                  <span>Edit</span>
                  </Link>
                </Table.Cell>

             </Table.Row>
            </Table.Body>
          ))}
            
           
           
        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )
        }
        </>

      ) :(
        <p>You don't have any posts yet</p>
      ) 
      }
       <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure  you want to delete this post</h3>
              <div className="flex justify-between">
              <Button color='failure' onClick={handleDeleltePost}>yes,I'm sure</Button>
              <Button onClick={()=>setShowModal(false)} color='gray'>Cancel</Button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      
    </div>
  )
}

export default DashPosts