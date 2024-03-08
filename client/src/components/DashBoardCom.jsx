
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {HiAnnotation,
      HiArrowNarrowUp,
      HiOutlineUserGroup,
      HiDocumentText
    } from 'react-icons/hi'

const DashBoardCom = () => {
    const [users, getUsers] = useState([0]);
    const [comments, getComments] = useState([0]);
    const [posts, getPosts] = useState([0]);
    const [totalUsers, getTotalUsers] = useState([0]);
    const [totalPosts, getTotalPosts] = useState([0]);
    const [totalComments, getTotalComments] = useState([0]);
    const [lastMonthUsers, getLastMonthUsers] = useState([0]);
    const [lastMonthPosts, getLastMonthPosts] = useState([0]);
    const [lastMonthComments, getLastMonthComments] = useState([0]);

    const {currentUser} = useSelector(state=> state.user);
console.log(comments);
    
    useEffect(()=>{
        const fetchUsers = async ()=> {
            try {
                const res = await fetch('http://localhost:3000/server/user/getusers?limit=5', {
                    credentials: 'include',
                });
                const data = await res.json();
                if(res.ok) {
                    getUsers(data.users);
                    getTotalUsers(data.totalUsers);
                    getLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        const fetchPosts = async ()=> {
            try {
                const res = await fetch('http://localhost:3000/server/post/getposts?limit=5', {
                    credentials: 'include',
                });
                const data = await res.json();
                if(res.ok) {
                    getPosts(data.posts);
                    getLastMonthPosts(data.lastMonthPosts);
                    getTotalPosts(data.totalPosts)
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        const fetchComments = async ()=> {
            try {
                const res = await fetch('http://localhost:3000/server/comment/getcomments?limit=5', {
                    credentials: 'include',
                });
                const data = await res.json();
               
                if(res.ok) {
                    getComments(data.allComments);
                    getLastMonthComments(data.lastMonthComment);
                    getTotalComments(data.totalComment)
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        if(currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    },[currentUser])
    
  return (
  <div className='p-3 md:mx-auto'>
    <div className="flex-wrap flex gap-4 justify-center">
    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
            <div className="">
                <h3 className='text-gray-500 text-md uppercase'>Total User</h3>
                <p className='text-2xl'>{totalUsers}</p>
            </div>
                <HiOutlineUserGroup className='bg-teal-500 text-white rounded-full 
                text-5xl p-3 shadow-lg'/>
            </div>
            <div className="flex gap-2 text-sm">
                <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp/>
                    {lastMonthUsers}
                </span>
                <div className="text-gray-500">Last Month</div>
        </div>
    </div>
    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
            <div className="">
                <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                <p className='text-2xl'>{totalComments}</p>
            </div>
                <HiAnnotation className='bg-indigo-500 text-white rounded-full 
                text-5xl p-3 shadow-lg'/>
            </div>
            <div className="flex gap-2 text-sm">
                <span className='text-green-600 flex items-center'>
                    <HiArrowNarrowUp/>
                    {lastMonthComments}
                </span>
                <div className="text-gray-500">Last Month</div>
        </div>
    </div>
    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
            <div className="">
                <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                <p className='text-2xl'>{totalPosts}</p>
            </div>
                <HiDocumentText className='bg-lime-500 text-white rounded-full 
                text-5xl p-3 shadow-lg'/>
            </div>
            <div className="flex gap-2 text-sm">
                <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp/>
                    {lastMonthPosts}
                </span>
                <div className="text-gray-500">Last Month</div>
        </div>
    </div>
    </div>
    <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className='text-center p-2'>Recent Users</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                   <Link to={'/dashboard?tab=users'}>
                   See All
                   </Link>
                    </Button>
            </div>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell>User Image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                { users && users.map((user)=>(
                    <Table.Body key={user._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>
                                <img src={user.avatar}
                                alt='user' 
                                className='w-10 h-10 rounded-full bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>


        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className='text-center p-2'>Recent Comments</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                   <Link to={'/dashboard?tab=comments'}>
                   See All
                   </Link>
                    </Button>
            </div>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell>Comment Content</Table.HeadCell>
                    <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                { comments && comments.map((comment)=>(
                    <Table.Body key={comment._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='w-96'>
                           <p  className='line-clamp-2'> {comment.content}</p>
                            </Table.Cell>
                            <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>


        <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className='text-center p-2'>Recent Posts</h1>
                <Button outline gradientDuoTone='purpleToPink'>
                   <Link to={'/dashboard?tab=posts'}>
                   See All
                   </Link>
                    </Button>
            </div>
            <Table hoverable >
                <Table.Head>
                    <Table.HeadCell>Post Image</Table.HeadCell>
                    <Table.HeadCell>Post Tittle</Table.HeadCell>
                    <Table.HeadCell>Post Category</Table.HeadCell>
                </Table.Head>
                { posts && posts.map((post)=>(
                    <Table.Body key={post._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>
                                <img src={post.image}
                                alt='user' 
                                className='w-10 h-10 rounded-md bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell className='w-96'>{post.title}</Table.Cell>
                            <Table.Cell className='w-5ss'>{post.category}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
    </div>
   
  </div>
  )
}

export default DashBoardCom