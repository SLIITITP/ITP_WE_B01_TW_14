
import React, { useState, useContext } from 'react';
import './index.css'
import { Box ,useTheme} from "@mui/material";
import Header from "components/Header.jsx";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useCreateUserMutation } from  '../../state/api';
import { useNavigate } from 'react-router-dom';
import ToastContext from "../../context/ToastContext";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


const Createuser = () => {

  const { toast } = useContext(ToastContext);

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role:'',
  });

  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role:'',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, role: value });
    setFormErrors({ ...formErrors, role: '' });
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
    if (formData.password.trim() === '') {
      errors.password = 'Password is required';
    }
    if (formData.phoneNumber.trim() === '') {
      errors.phoneNumber = 'Phone number is required';
   
    }
    if (formData.role === 'Select Role' || formData.role === '' ) {
          errors.role = 'Enter a role';
    } 
    else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
    
      createUser(formData);
      navigate("/users")
      toast.success('User Created successfully');

    }
  };
  return (
    <Box m="1.5rem 2.5rem">
       <Header title="Users" subtitle="Create user accounts" />
     <Box
        // mt="40px"
        // height="75vh"
      
        >
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'  >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '500px'}}>
        <MDBCardBody className='px-5'>
         
    
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='name' type='text' name='name' value={formData.name} onChange={handleInputChange} />
          {formErrors.name && <div className='text-danger mb-2'>{formErrors.name}</div>}
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='email' type='email' name='email' value={formData.email} onChange={handleInputChange} />
          {formErrors.email && <div className='text-danger mb-2'>{formErrors.email}</div>}
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' type='password' name='password' value={formData.password} onChange={handleInputChange} />
          {formErrors.password && <div className='text-danger mb-2'>{formErrors.password}</div>}
          
          <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='phoneNumber' type='number' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} />
          {formErrors.phoneNumber && <div className='text-danger mb-2 '>{formErrors.phoneNumber}</div>}
          {/* <MDBInput wrapperClass='mb-4' label='Role' size='lg' id='role' type='text' name='role' value={formData.role} onChange={handleInputChange} /> */}
        
          <MDBDropdown style={{ marginBottom: '40px' }}>
            <MDBDropdownToggle wrapperClass='mb-4' size='lg' style={{backgroundColor:'#d2d4d2' ,color:'black', width:'100%'}}>
              {formData.role || 'Select Role'}
            </MDBDropdownToggle>
              <MDBDropdownMenu style={{cursor: 'pointer'}}>
                <MDBDropdownItem   onClick={() => handleDropdownChange("Administator")}>
                  Administrator
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("HR Manager")}>
                  HR Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Inventory Control Manager")}>
                  Inventory Control Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Customer Manager")}>
                   Customer Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Delivery Manager")}>
                Delivery Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Vehicle Manager")}>
                Vehicle Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Driver")}>
                Driver
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Supplier Manager")}>
                   Supplier Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Financial Manager")}>
                  Financial Manager
                </MDBDropdownItem>
                <MDBDropdownItem  onClick={() => handleDropdownChange("Customer")}>
                  Customer
                </MDBDropdownItem>
              </MDBDropdownMenu>
          </MDBDropdown>
          {formErrors.role && <div className='text-danger mb-2 '>{formErrors.role}</div>}
          <div className='button'>
          <MDBBtn className='btn btn-info mb-2' size='lg' type='submit' disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Submitting...' : 'Submit' }
          </MDBBtn>
          </div>
          {error && <div className='text-center text-danger'>{error.message}</div>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </Box>
    </Box>
  )
};

export default Createuser;