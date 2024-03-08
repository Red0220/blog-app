import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app} from '../firebase.js';
import { updateFailure, updateStart, updateSuccess,
        deleteUserFailure, deleteUserStart,deleteUserSuccess , signoutSuccess  
        } from '../redux/user/user.slice.js';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Link} from 'react-router-dom'

function DashProfile() {
  const {currentUser , error, loading}= useSelector(state => state.user) ;
  const [imgFile, setImgFile] = useState(null) ;
  const [imgFileUrl, setImgFileUrl] = useState(null) ;
  const [uploadProgress, setUploadprogress] = useState(null)
  const [uploadError, setUploaderror] = useState(null);
  const [formData, setFormdata] = useState(null);
  const [uploadSuccess,setUploadsuccess] = useState(null);
  const  [showModel, setShowmodel] = useState(false)
  const [updateUsersuccess,setupdateUsersuccess] = useState(null);
  const [updateUsererror,setupdateUsererror] = useState(null);
  const dispatch = useDispatch();
  const fileRef = useRef();
  
console.log(currentUser._id);
  
  
  
  const handleFileimg = (e) => {
    const file = e.target.files[0];
    if(file){
      setImgFile(e.target.files[0]);
      setImgFileUrl(URL.createObjectURL(file))

    }
  } ;

  useEffect(()=>{
    if(imgFile){
      uploadImg();
    }

  },[imgFile])
  const uploadImg = async () => {
   setUploadsuccess(true)
  setUploadprogress(null)
  const storage = getStorage(app);
  const fileName =new Date().getTime() + imgFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imgFile);
  uploadTask.on(
    'state_changed',
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
      setUploadprogress(progress.toFixed(0));
    }, (error) => {
      setUploaderror('Could not upload')
      setUploadprogress(null);
      setImgFile(null);
      setImgFileUrl(null);
      setUploadsuccess(false)
    }, ()=> {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL)=> {
        setImgFileUrl(downloadURL);
        setFormdata({...formData, avatar:downloadURL });
        setUploadsuccess(false);
      });
    }
  );

}
const handleUpdateUser = (e) => {
  setFormdata({...formData, [e.target.id] :e.target.value})
}
const handleSubmit = async (e) => {
   e.preventDefault();
   setUploadsuccess(null)
   setupdateUsererror(null);
  console.log(Object.keys(formData));
  if(Object.keys(formData).length === 0) {
    setupdateUsererror('no changes made');
    return;
  }
  if(uploadSuccess) {
    setupdateUsererror('please wait for image to upload')
    return;
  }
   try {
    dispatch(updateStart());
    const res = await fetch(`http://localhost:3000/server/user/update/${currentUser._id}`,{
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
       credentials: 'include',
     
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(!res.ok) {
      dispatch(updateFailure(data.message));
    console.log(setupdateUsererror(data.message))

    } else {
      dispatch(updateSuccess(data));
      setupdateUsersuccess('User profile update successfully');
     
    }
    
   } catch (error) {
    dispatch(updateFailure(error));
   console.log(setupdateUsererror(error.message));
   }
   
}

const handleDelelteUser = async() => {
  setShowmodel(false);
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`http://localhost:3000/server/user/delete/${currentUser._id}`,{
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if(!res.ok){
      dispatch(deleteUserFailure(data.message));
    }else {
      dispatch(deleteUserSuccess(data));
    }
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }

}

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
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 w-[400px] sm:w-[500px]' 
       onSubmit={handleSubmit} >
       <input type="file" accept='image/.*' 
       onChange={handleFileimg} ref={fileRef} hidden/>

        <div className=" relative  h-32 w-32 self-center cursor-pointer shadow-md 
        overflow-hidden rounded-full"
        onClick={()=> fileRef.current.click()}>
      { uploadProgress && (
        <CircularProgressbar value={uploadProgress || 0} 
        text={`${uploadProgress}`}
        strokeWidth={5}
        styles={ {
          root:{
            width:'100%',
            height:'100%',
            position:'absolute',
            top:0,
            left:0,
          },
          path:{
          stroke: `rgba(626,152,199), ${uploadProgress / 100}`,
          }
        }}/>
      )}
      <img src={ imgFileUrl ||currentUser.avatar} alt='user'
       className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
        ${uploadProgress && uploadProgress < 100 && 'opacity-50'} `}/>
       
        </div>
          {uploadError && 
        <Alert color='failure'>
          {uploadError}
          </Alert>

}
        <TextInput type='text ' id='username' 
        defaultValue={currentUser.username} onChange={handleUpdateUser}/>
        <TextInput type='email' id='email'
         defaultValue={currentUser.email} onChange={handleUpdateUser}/>
        <TextInput type='password' id='password' onChange={handleUpdateUser}/>
        <Button type='submite' gradientDuoTone='purpleToBlue' outline disabled={loading || uploadSuccess}>
          { loading ? 'Loading ...' : 'Update'}
        </Button>

        {
          currentUser.isAdmin && (
            <Link to={'/create-post'}>
            <Button type='button' gradientDuoTone='purpleToPink' className='w-full' disabled={loading || uploadSuccess}>
              Create a post
            </Button>
            </Link>
          )
        }
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span className='cursor-pointer' onClick={() =>setShowmodel(true)}>Delete account</span>
          <span className='cursor-pointer' onClick={handleSignOut}>Sign out</span>
        </div>
        {updateUsersuccess && (
          <Alert color='success' className='mt-5'>
           {updateUsersuccess}
          </Alert>
        )}
        {updateUsererror && (
          <Alert color='failure' className='mt-5'>
           {updateUsererror}
          </Alert>
        )}
        {error&& (
          <Alert color='failure' className='mt-5'>
           {error}
          </Alert>
        )}
        <Modal show={showModel} onClose={()=>setShowmodel(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure  you want to delete this account</h3>
              <div className="flex justify-between">
              <Button color='failure' onClick={handleDelelteUser}>yes,I'm sure</Button>
              <Button onClick={()=>setShowmodel(false)} color='gray'>Cancel</Button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
    </div>
  )
}

export default DashProfile