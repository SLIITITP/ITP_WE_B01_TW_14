import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import { Box ,useTheme} from "@mui/material";
import Header from "components/Header";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

import { useUpdateDataMutation } from  '../../state/api';
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from 'react'


import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'



const Updateuser = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    role: '',
    occupation: '',
    phoneNumber: '',
  });
  const userRef = useRef()
  const errRef = useRef()
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])


  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        
          const { accessToken,role } = await login({ email, password }).unwrap()
          console.log("🚀 ~ file: Login.js:62 ~ handleSubmit ~ foundUser:", role)
          if(role=="admin"){
          }else if(role=="manager"){
            
          }else{
            
          }
          navigate('/dashboard')
          dispatch(setCredentials({ accessToken }))
          setemail('')
          setPassword('')
          
      } catch (err) {
    
          if (!err.status) {
              setErrMsg('No Server Response');
          } else if (err.status === 400) {
              setErrMsg('Missing email or Password');
          } else if (err.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg(err.data?.message);
          }
          errRef.current.focus();
      }
  }

  const handleUserInput = (e) => setemail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>
  return (
    <Box m="1.5rem 2.5rem">
       <Header title="Users" subtitle="Create user accounts" />
       <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
     <Box
        mt="40px"
        height="75vh"
      
        >
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'  >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
         
    
          <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='name' type='email' name='email' value={email} ref={userRef}   onChange={handleUserInput}
                        // autoComplete="off"
                        required />
          {/* {formErrors.name && <div className='text-danger mb-2'>{formErrors.name}</div>} */}
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='email' type='password' name='password' value={password}  onChange={handlePwdInput} required/>
          {formErrors.email && <div className='text-danger mb-2'>{formErrors.email}</div>}
          
         
         
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' disabled={isLoading} onClick={handleSubmit}>
            {'Sign in' }
          </MDBBtn>
          {/* {error && <div className='text-center text-danger'>{error.message}</div>} */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </Box>
    </Box>
  )
};

export default Updateuser;