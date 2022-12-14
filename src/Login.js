import React from 'react'
import { auth, provider } from './firebase'
import "./Login.css"
import {useStateValue} from "./StateProvider"
import { actionTypes } from './reducer'



function Login() {
    const[{}, dispatch] = useStateValue()

    const signIn = () =>{
        auth.signInWithPopup(provider).then((result) =>
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }).catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://res.cloudinary.com/dv2hwm9m6/image/upload/v1639554525/LOGO-HS_copy_lgxv60.jpg' />
            <div className='login__text'>
                <h1>Sign in to the Chatroom Now..</h1>
            </div>
            <button type='submit' onClick={signIn}>
                Sign in with Google
            </button>
        </div>
    </div>
  )
}

export default Login