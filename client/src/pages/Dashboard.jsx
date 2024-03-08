import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSlidebar from '../components/DashSlidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashBoardCom from '../components/DashBoardCom';

function Dashboard() {
  const location =  useLocation();
  console.log(location);
  const [tab, setTab] = useState('');
  useEffect(()=>{
 const urlParams = new URLSearchParams(location.search);
 const tabFormUrl = urlParams.get('tab');
 if(tabFormUrl) {
  setTab(tabFormUrl);
 }
  },[location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className='md:w-56'>
      {/*SLideBar */}
      <DashSlidebar/>
      </div>
      
         {/*profile.... */}
     {tab === 'profile' &&  <DashProfile/>}
     {tab === 'comments' &&  <DashComment/>}
      {/*POSTS */}
      {tab === 'posts' && <DashPosts/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'dash' && <DashBoardCom/>}
      </div>
   
 )
  
}

export default Dashboard