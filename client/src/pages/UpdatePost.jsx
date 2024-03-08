import React, { useEffect, useState } from 'react'
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase.js';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector} from 'react-redux'


function UpdatePost() {


  const { currentUser} = useSelector(state=> state.user)
  const [file, setFile] = useState(null);
  const [imgUploadProgress, setImguploadProgress] = useState(null)
  const [imgUploadError, setImguploadError] = useState(null)
  const [imgUploadSuccess, setImguploadSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const {postId} = useParams();

 console.log(formData._id);
 console.log(currentUser._id);
 
 
 useEffect(()=>{
 
    try {
        const fetchPost = async () => {
            const res = await fetch(`http://localhost:3000/server/post/getposts?postId=${postId}`);
            const data = await res.json();
            if(!res.ok) {
                console.log(error.message);
                setPublishError(data.message);
                return;
            }
            if(res.ok) {
                setFormData(data.posts[0]);
                setPublishError(null)
            }

            
        }
        fetchPost();
        
    } catch (error) {
        console.log(error);
    }
  
       
  },[postId])

  const handleUploadImg = async () => {
    try {
      if(!file) {
        setImguploadError('please select an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed', 
        (snapshot)=> { 
          const progress = 
           (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
           setImguploadProgress(progress.toFixed(0));

        },
        (error)=> {
          setImguploadError('Image upload fialed');
          setImguploadProgress(null);

        },
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImguploadProgress(null);
            setImguploadError(null);
            setFormData({...formData, image: downloadURL});
          });
        }
      );
    } catch (error) {
      setImguploadError('Image upload fialed');
      setImguploadProgress(null)
      console.log(error);
    }
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/server/post/updateposts/${postId}/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        setPublishError(data.message);
        return;
      } 
      
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
      
    } catch (error) {
      console.log(error);
      setPublishError('something went wrong');
    }

  }
  return (
  <div className="p-3 max-w-3xl mx-auto min-h-screen">
   <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>

    <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
       <TextInput type='text' placeholder='Title' required id='title' 
       className='flex-1' 
       onChange={(e)=> setFormData({...formData, title: e.target.value})} 
        value={formData.title}/>
       <Select onChange={(e)=> setFormData({...formData, category: e.target.value})}
         value={formData.category}>
        <option value="uncategorized">Select</option>
        <option value="javascript">javascript</option>
        <option value="reactjs">react.js</option>
        <option value="Nextjs">Nextjs</option>
       </Select>
      </div>
      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
        <FileInput type='file' accept='image/*'
         onChange={(e)=> setFile(e.target.files[0])} 
         />
        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline 
         onClick={handleUploadImg} disabled={imgUploadProgress}>
         {
          imgUploadProgress ? 
          <div className="w-16 h-16">
            <CircularProgressbar value={imgUploadProgress} 
            text={`${imgUploadProgress || 0}%`} />
          </div> :
          'upload image'
         }
        </Button>
      </div>
      {imgUploadError && (
        <Alert color='failure'>{imgUploadError} </Alert>
      )
      }
      {formData.image && (
        <img src={formData.image} alt='upload' 
         className='h-72 w-72 object-cover' />
      )}
      <ReactQuill theme='snow' placeholder='Write somethiing ...' className='h-72 mb-12' required
        onChange={(value) => {
          setFormData({...formData, content: value});
        }} value={formData.content}/>
      <Button type='submit' gradientDuoTone='purpleToPink' >
        Update
      </Button>
      {publishError && <Alert color='failure'>{publishError}</Alert>}
    </form> 


  </div>
  )
}

export default UpdatePost