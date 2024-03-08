import { Button } from 'flowbite-react'
import React from 'react' ;
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {app} from '../firebase.js';
import {signInFailure, signInSuccess,signInStart} from '../redux/user/user.slice.js'
import {useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom'


function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogle = async () => {

        const  provider = new GoogleAuthProvider();
        // provider.setCustomParameters({ prompt: 'select an account'})
        try {
            dispatch(signInStart());
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3000/server/auth/google', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name : resultFromGoogle.user.displayName,
                    email : resultFromGoogle.user.email,
                    googlePhoto : resultFromGoogle.user.photoURL ,
                }),
            
            });
            console.log( resultFromGoogle.user.photoURL);

            const data = await res.json();
                if(data.success === false){
                    dispatch(signInFailure(data.message))
                }
                if(res.ok) {
                    dispatch(signInSuccess(data));
                    navigate('/')
                }
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogle}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )
}

export default Oauth