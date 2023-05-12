import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditCustomerScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
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
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ id, ...customerDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${customerDetails.companyName}] Successfully`);

      setCustomerDetails({
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
      navigate('/customerinfo');
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchCustomer() {
      try {
        const res = await fetch(`http://localhost:8000/api/customers/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setCustomerDetails({
            cusName: result.cusName,
            companyName: result.companyName,
            address: result.address,
            contactNo: result.contactNo,
            cusNIC: result.cusNIC,
            district: result.district,
            email: result.email,
            creditLimit: result.creditLimit,
            creditDays: result.creditDays,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error('Failed to fetch Customer. Please try again later.');
        setLoading(false);
      }
    }
    fetchCustomer();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Edit customer</title>
      </Helmet>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit Customer</h2>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="cusNameInput" className="form-label mt-4">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cusNameInput"
                    name="customerName"
                    value={customerDetails.cusName}
                    onChange={handleInputChange}
                    placeholder="Ashen"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="companyNameInput" className="form-label mt-4">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyNameInput"
                    name="companyName"
                    value={customerDetails.companyName}
                    onChange={handleInputChange}
                    placeholder="Hayleys"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="addressInput" className="form-label mt-4">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressInput"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    placeholder="No-1, piliyandala"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactNoInput" className="form-label mt-4">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contactNoInput"
                    name="contactNo"
                    value={customerDetails.contactNo}
                    onChange={handleInputChange}
                    placeholder="+94 77 123 4567"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerNICInput" className="form-label mt-4">
                    Customer NIC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNICInput"
                    name="customerNIC"
                    value={customerDetails.cusNIC}
                    onChange={handleInputChange}
                    placeholder="198956934125"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="districtInput" className="form-label mt-4">
                    District
                  </label>
                  <select
                    className="form-control"
                    id="districtInput"
                    name="district"
                    value={customerDetails.district}
                    onChange={handleInputChange}
                    required
                    fdprocessedid="8n2of"
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
                    type="text"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    placeholder="abc@gmail.com"
                    required
                    fdprocessedid="8n2of"
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
                    value={customerDetails.creditLimit}
                    onChange={handleInputChange}
                    placeholder="1000000.00"
                    required
                    fdprocessedid="8n2of"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="creditDaysInput" className="form-label mt-4">
                    Credit Days
                  </label>
                  <select
                    className="form-control"
                    id="creditDaysInput"
                    name="creditDays"
                    value={customerDetails.creditDays}
                    onChange={handleInputChange}
                    required
                    fdprocessedid="8n2of"
                  >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    value="Save Changes"
                    className="btn btn-info my-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditCustomerScreen;
