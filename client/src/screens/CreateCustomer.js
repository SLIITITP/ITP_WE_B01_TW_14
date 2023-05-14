import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

function CreateCustomer() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    cusName: '',
    companyName: '',
    address: '',
    contactNo: '',
    cusNIC: '',
    district: '',
    email: '',
    creditLimit: '',
    creditDays: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Created ${userDetails.companyName} Customer`);

      setUserDetails({
        cusName: '',
        companyName: '',
        address: '',
        contactNo: '',
        cusNIC: '',
        district: '',
        email: '',
        creditLimit: '',
        creditDays: '',
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setUserDetails({
      cusName: '',
      companyName: '',
      address: '',
      contactNo: '',
      cusNIC: '',
      district: '',
      email: '',
      creditLimit: '',
      creditDays: '',
    });
  };

  return (
    <div>
      <Helmet>
        <title>Create customer</title>
      </Helmet>
      <h2 className="text-center bg-darkgreen p-2 mt-4 mb-1">Add Customer</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cusNameInput" className="form-label mt-4">
                Name Of the Customer
              </label>
              <input
                type="text"
                className="form-control"
                id="customernameInput"
                name="cusName"
                value={userDetails.cusName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyNameInput" className="form-label mt-4">
                Name Of the Company
              </label>
              <input
                type="text"
                className="form-control"
                id="companyNameInput"
                name="companyName"
                value={userDetails.companyName}
                onChange={handleInputChange}
                placeholder="Hayleys"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="45/A, Galle"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNoInput" className="form-label mt-4">
                Contact Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="contactNoInput"
                name="contactNo"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                value={userDetails.contactNo}
                onChange={handleInputChange}
                placeholder="0XXXXXXXXX"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cusNICInput" className="form-label mt-4">
                Customer NIC
              </label>
              <input
                type="text"
                className="form-control"
                id="cusNICInput"
                name="cusNIC"
                maxLength={12}
                minLength={10}
                pattern="[0-9]{9}[V|v]"
                value={userDetails.cusNIC}
                onChange={handleInputChange}
                placeholder="000000000000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtInput" className="form-label mt-4">
                District
              </label>
              <br />
              <select
                id="districtInput"
                name="district"
                className="form-control"
                value={userDetails.district}
                onChange={handleInputChange}
                required
              >
                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Moneragala">Moneragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="abc@example.com"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="creditLimitInput" className="form-label mt-4">
                Credit Limit
              </label>
              <input
                type="text"
                className="form-control"
                id="creditLimitInput"
                name="creditLimit"
                value={userDetails.creditLimit}
                onChange={handleInputChange}
                placeholder="100000.00"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="districtInput" className="form-label mt-4">
                Credit Days
              </label>
              <select
                id="creditDaysInput"
                className="form-control"
                name="creditDays"
                value={userDetails.creditDays}
                onChange={handleInputChange}
                required
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
              <br />
              <br />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Add Customer"
                className="btn btn-info"
              />
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-danger"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
