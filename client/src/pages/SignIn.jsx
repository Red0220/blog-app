import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import  { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import  {signInStart, signInSuccess, signInFailure} from '../redux/user/user.slice.js'
import Oauth from '../components/Oauth.jsx';





function SignIn() {
  const [formData,  setFormData] = useState({});
  const { loading, error: errorMsg} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
 // handle inputs
  const handleChange = (e)=>{
  setFormData({...formData, [e.target.id]: e.target.value.trim()});
   
  }
  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(
      !formData.email ||
      !formData.password 
      ) {
        return dispatch(signInFailure('Please fill  all the fields'))
      }
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/server/auth/signin',{
        method: 'POST',
        credentials:'include',
        'Authorization': 'Bearer Token',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
      });
     const data = await res.json();
     if(data.success === false) {
     dispatch(signInFailure(data.message));
  
     }
 
   if(res.ok) {
    dispatch(signInSuccess(data));
    navigate('/');
   }
    } catch (error) {
      dispatch(signInFailure(error.message))
    } 
    


  }


  return (
    <div className='min-h-screen mt-20'>
    <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
      {/* left*/ }
      <div className="flex-1">
        <h1>
        <Link to='/' 
    className='font-bold dark:text-white text-4xl'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Karim</span>
      Blog
    </Link>
        </h1>

        <p className='text-sm mt-5'>
          This is a demo project, you can sign up with your email and password,
          or with google
        </p>
      </div>
       {/* right*/ }
       <div className="flex-1">
        <div className=''>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div>
              <Label value='Email'/>
              <TextInput  type='text' placeholder='Email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Password'/>
              <TextInput  type='password' placeholder='password' id='password' onChange={handleChange} />
            </div>     
                <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} >
                  { loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className='pl-5'>Loading...</span>
                    </>
                  ) : 'Sign in'}
                </Button>
                <Oauth/>
             </form>
             <div className="flex gap-2 text-sm mt-5">
              <span>Don't have an account</span>
              <Link to='/signup' className='text-blue-500 font-semibold'>
                Sign up
              </Link>
             </div>
             {
              errorMsg && (
                <Alert className='mt-5' color='failure'>
                  {errorMsg}
                </Alert>
              )
             }
        </div>
       </div>
    </div>
    </div>
  )
}

export default SignIn