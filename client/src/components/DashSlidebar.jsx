import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartBar, HiChartPie} from 'react-icons/hi'
import { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom'
import {signoutSuccess} from '../redux/user/user.slice.js';
import { useDispatch, useSelector } from 'react-redux';


function DashSlidebar() {
  const {currentUser} = useSelector(state => state.user);
    const location =  useLocation();
    const dispatch = useDispatch()
  
    const [tab, setTab] = useState('');
    useEffect(()=>{
   const urlParams = new URLSearchParams(location.search);
   const tabFormUrl = urlParams.get('tab');
   if(tabFormUrl) {
    setTab(tabFormUrl);
   }
    },[location.search]);
    

    const handleSignOut = async () => {
      try {
        const res =await fetch('http://localhost:3000/server/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if(!res.ok) {
          console.log(data.message);
        }
        else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
  <Sidebar className='w-full md:w-56' >
    <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
            <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie}>
               Dashboard
            </Sidebar.Item>
            </Link>
            )
          }

            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'admin' : 'user'} labelColor='dark'>
                profile
            </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (

            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
               Posts
              </Sidebar.Item>
            </Link>
            )}
            {currentUser.isAdmin && (
               <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item active={tab === 'users'} 
              icon={HiOutlineUserGroup} as='div'>
               Users
              </Sidebar.Item>
            </Link>

            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item active={tab === 'comments'} 
              icon={HiAnnotation} as='div'>
               Comments
              </Sidebar.Item>
            </Link>
               </>
            )}
            <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
               sign out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>

  </Sidebar>
  )
}

export default DashSlidebar