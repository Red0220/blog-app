import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import  { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import Oauth from '../components/Oauth';





function SignIn() {
  const [formData,  setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);
 // handle inputs
  const handleChange = (e)=>{
  setFormData({...formData, [e.target.id]: e.target.value.trim()});
   
  }
  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(!formData.username ||
      !formData.email ||
      !formData.password 
      ) {
        return setError('Please fill out all fields');
      }
    try {
      setLoading(true);
      setError(null)
      const res = await fetch('http://localhost:3000/server/auth/signup',{
        method: 'POST',
        credentials: 'include',
        'Authorization': 'Bearer Token',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
      });
     const data = await res.json();
     if(data.success === false) {
     return setError(data.message)
  
     }
   setLoading(false);
   if(res.ok) {
    navigate('/signin');
   }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false)
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
              <Label value='username'/>
              <TextInput  type='text' placeholder='username' id='username' onChange={handleChange}/>
            </div>
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
                  ) : 'Sign up'}
                </Button>
                <Oauth/>
             </form>
             <div className="flex gap-2 text-sm mt-5">
              <span>Have an account</span>
              <Link to='/signin' className='text-blue-500 font-semibold'>
                Sign in
              </Link>
             </div>
             {
              error && (
                <Alert className='mt-5' color='failure'>
                  {error}
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