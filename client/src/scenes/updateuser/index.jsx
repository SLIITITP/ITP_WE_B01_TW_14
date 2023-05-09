import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import { Box ,useTheme} from "@mui/material";
import Header from "components/Header.jsx";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateDataMutation } from  '../../state/api';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


const Updateuser = () => {
    const navigate = useNavigate()
    const data = useSelector(state => state.data.data)

    const [formData, setFormData] = useState({
    id:useSelector(state => data.id),
    name: useSelector(state => data.name),
    email: useSelector(state => data.email),
    occupation: useSelector(state => data.occupation),
    phoneNumber: useSelector(state => data.phoneNumber),
    role: useSelector(state => data.role),
  });

  const [updateUser, { isLoading, error }] = useUpdateDataMutation();

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    role: '',
    occupation: '',
    phoneNumber: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = {};
    if (formData.name.trim() === '') {
      errors.name = 'Name is required';
    }
    if (formData.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (formData.role.trim() === '') {
      errors.role = 'Role is required';
    }
    if (formData.occupation.trim() === '') {
      errors.occupation = 'Occupation is required';
    }
    if (formData.phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
   
    updateUser(formData);
      alert("User updated successfully!")
      navigate('/users')
    //   toast.success('User updated successfully!');
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
       <Header title="Users" subtitle="update user accounts" />
     <Box
        mt="40px"
        height="75vh"
      
        >
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'  >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
         
    
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='name' type='text' name='name' value={formData.name} onChange={handleInputChange} />
          {formErrors.name && <div className='text-danger mb-2'>{formErrors.name}</div>}
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='email' type='email' name='email' value={formData.email} onChange={handleInputChange} />
          {formErrors.email && <div className='text-danger mb-2'>{formErrors.email}</div>}
          <MDBInput wrapperClass='mb-4' label='Role' size='lg' id='role' type='role' name='role' value={formData.role} onChange={handleInputChange} />
          {formErrors.role && <div className='text-danger mb-2'>{formErrors.role}</div>}
          <MDBInput wrapperClass='mb-4' label='Occupation' size='lg' id='occupation' type='text' name='occupation' value={formData.occupation} onChange={handleInputChange} />
          {formErrors.occupation && <div className='text-danger mb-2 '>{formErrors.occupation}</div>}
          <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='phoneNumber' type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} />
          {formErrors.phoneNumber && <div className='text-danger mb-2 '>{formErrors.phoneNumber}</div>}
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Submitting...' : 'Submit' }
          </MDBBtn>
          {error && <div className='text-center text-danger'>{error.message}</div>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </Box>
    </Box>
  )
};

export default Updateuser;