import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Modal, Table, Button} from 'flowbite-react'
import {HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck ,FaTimes} from 'react-icons/fa'
function DashUsers() {
  const { currentUser} = useSelector(state => state.user);
  const [users, setUsers] =useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelelte] = useState('');

  
  console.log(currentUser._id);
 
  useEffect(()=> {
     const fetchUsers = async () => {

       try {
      const res  = await fetch(`http://localhost:3000/server/user/getusers`, {
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data.users);
      if(res.ok) {
        setUsers(data.users);
        if(data.users.length < 9) {
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
     }

     if(currentUser.isAdmin) {
      fetchUsers()
     }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`http://localhost:3000/server/user/getusers?startIndex=${startIndex}`, {
        credentials: 'include'
      }
      );
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=> [...prev, ...data.users]);
        if(data.users.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelelteUser = async ()=> {
    setShowModal(false);
    try {
     const res = await fetch(`http://localhost:3000/server/user/delete/${userIdToDelete}`, {
      method: 'DELETE',
      credentials: 'include'
     });
     const data = await res.json();
     if(res.ok) {
      setUsers((prev) => prev.filter((user)=> user._id !== userIdToDelete));
         setShowModal(false)
     }
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <div className='table-auto text-center overflow-x-scroll 
     md:mx-auto p-3 scrollbar scrollbar-track-slate-100
      scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { currentUser.isAdmin && users.length > 0  ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>

            <Table.HeadCell> Date created</Table.HeadCell>

            <Table.HeadCell> User image</Table.HeadCell>
            <Table.HeadCell> Username</Table.HeadCell>
            <Table.HeadCell> Email</Table.HeadCell>

            <Table.HeadCell> Admin</Table.HeadCell>

            <Table.HeadCell> Delete </Table.HeadCell>

           
          </Table.Head>

          {users &&  users.map((user)=>(
            <Table.Body key={user._id} className='divide-y'>
             <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-900'>

              <Table.Cell>
                {new Date(user.createdAt).toLocaleString()}
                </Table.Cell>

                <Table.Cell>
                  
                 <img src={user.avatar} alt={user.username}
                    className='w-10 h-10 object-cover bg-gray-500 rounded-full'/>
                  
                </Table.Cell>

                <Table.Cell>
                  {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>

                {user.isAdmin ? 
                (<FaCheck className='text-green-500'/>) : 
                (<FaTimes className='text-red-500'/>)}

                </Table.Cell>

                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                    setUserIdToDelelte(user._id);
                  }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>

                <Table.Cell>
                 
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
        <p>You don't have any users yet</p>
      ) 
      }
       <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure  you want to delete this user</h3>
              <div className="flex justify-between">
              <Button color='failure' onClick={handleDelelteUser}>yes,I'm sure</Button>
              <Button onClick={()=>setShowModal(false)} color='gray'>Cancel</Button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      
    </div>
  )
}

export default DashUsers