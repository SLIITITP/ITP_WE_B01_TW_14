import React from "react";
// import {
//   RadioGroup,
//   RadioButton,
//   ReversedRadioButton,
// } from "react-radio-buttons";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
// import Card from "react-bootstrap/Card";

const AddInvoice = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  // const payMethod = useState();

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    issuedDate: "",
    cusName: "",
    busiName: "",
    address: "",
    mobileNo: "",
    payMethod: "",
    bankCode: "",
    bankDate: "",
    cheqNo: "",
    paidAmount: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/invoice/addInv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(invoiceDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Invoice [${invoiceDetails.invoiceNo}] Added Successfully`);

      setInvoiceDetails({
        invoiceNo: "",
        issuedDate: "",
        cusName: "",
        busiName: "",
        address: "",
        mobileNo: "",
        payMethod: "",
        bankCode: "",
        bankDate: "",
        cheqNo: "",
        paidAmount: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setInvoiceDetails({
      invoiceNo: "",
      issuedDate: "",
      cusName: "",
      busiName: "",
      address: "",
      mobileNo: "",
      payMethod: "",
      bankCode: "",
      bankDate: "",
      cheqNo: "",
      paidAmount: "",
    });
  };

  return (
    <>
      <div>
        <h2 className='text-center bg-darkgreen text-white p-2'>
          Add Customer Invoice
        </h2>
      </div>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='iNo' className='form-label mt-4'>
                Invoice No:
              </label>

              <input
                type='text'
                className='form-control'
                id='inputINo'
                name='invoiceNo'
                value={invoiceDetails.invoiceNo}
                onChange={handleInputChange}
                placeholder='INV001'
                pattern='^INV\d{3,5}$'
                title='Invoice number must start with INV and contain 3-5 digits after it.'
                minLength={6}
                maxLength={8}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='dateIssued' className='form-label mt-4'>
                Date of issued:
              </label>
              <input
                type='date'
                className='form-control'
                id='inputDate'
                name='issuedDate'
                value={invoiceDetails.issuedDate}
                onChange={handleInputChange}
                placeholder='2023-01-01'
                required
              />
            </div>
            <hr className='line' />
            <div className='form-group'>
              <label htmlFor='customerName' className='form-label mt-4'>
                Customer Name:
              </label>
              <input
                type='text'
                className='form-control'
                id='inputCusName'
                placeholder='I.M.M. Pasan Perera'
                name='cusName'
                value={invoiceDetails.cusName}
                onChange={handleInputChange}
                minLength={4}
                maxLength={50}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='mobileNo' className='form-label mt-4'>
                Mobile No:
              </label>
              <input
                type='tel'
                className='form-control'
                id='inputMobile'
                placeholder='0711234568'
                onChange={handleInputChange}
                name='mobileNo'
                value={invoiceDetails.mobileNo}
                pattern='[0-9]{10}'
                title='Mobile number must has 10 digits.'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='BusiName' className='form-label mt-4'>
                Business Name:
              </label>
              <input
                type='text'
                className='form-control'
                id='inputBusiName'
                placeholder='APL Hardware PVT Ltd.'
                onChange={handleInputChange}
                name='busiName'
                value={invoiceDetails.busiName}
                minLength={4}
                maxLength={50}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address' className='form-label mt-4'>
                Address:
              </label>
              <input
                type='text'
                className='form-control'
                id='inputAddress'
                placeholder='No. 32, 1st lane, Galle'
                onChange={handleInputChange}
                name='address'
                // defaultValue={invoiceDetails.address}
                value={invoiceDetails.address}
                minLength={0}
                maxLength={50}
              />
            </div>
            <hr className='line' />
            <div className='form-group'>
              <label htmlFor='payMethodInput' className='form-label mt-4'>
                Payement method:
              </label>
              <select
                className='form-control'
                id='payMethodInput'
                name='payMethod'
                value={invoiceDetails.payMethod}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select Payment method</option>
                <option value='cheque'>Cheque Payment</option>
                <option value='cash'>Cash Payment</option>
              </select>
            </div>
            {/* <div className='radio'>
              <fieldset className='row mb-3' style={{ marginLeft: "5px" }}>
                <legend className='col-form-label col-sm-2 pt-0'>
                  Payment method:
                </legend>
                <div
                  className='col-sm-10'
                  name='payMethod'
                  value={invoiceDetails.payMethod}
                  onChange={handleInputChange}
                >
                  <div className='form-check' name='cheque' value='cheque'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gridRadios'
                      id='Cheque'
                      value='cheque'
                      checked
                      //   onChange={handleInputChange}
                      fdprocessedid='8n20f'
                    />
                    <label className='form-check-label' htmlFor='gridRadios1'>
                      Cheque Payment
                    </label>
                  </div>
                  <div className='form-check' name='cash' value='cash'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='gridRadios'
                      id='Cash'
                      value='cash'
                      //   checked
                      //   onChange={handleInputChange}
                      fdprocessedid='8n20f'
                    />
                    <label className='form-check-label' htmlFor='gridRadios2'>
                      Cash Payment
                    </label>
                  </div>
                </div>
              </fieldset>
            </div> */}
            {/* <div>
              <legend className='col-form-label col-sm-2 pt-0'>
                Payment method:
              </legend>
              <RadioGroup
                name='payMethod'
                value={invoiceDetails.payMethod}
                onChange={handleInputChange}
                horizontal
              >
                <RadioButton name='payMethod' value='cheque' checked={true}>
                  Cheque Payement
                </RadioButton>
                <RadioButton name='payMethod' value='cash'>
                  Cash Payment
                </RadioButton>
              </RadioGroup>
            </div> */}
            <div className='form-group'>
              <label htmlFor='bankCode' className='form-label mt-4'>
                Bank Code:
              </label>
              <input
                type='text'
                className='form-control'
                id='inputbCode'
                onChange={handleInputChange}
                name='bankCode'
                value={invoiceDetails.bankCode}
                disabled={invoiceDetails.payMethod === "cash"}
                minLength={0}
                maxLength={15}
                // fdprocessedid='8n20f'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='bankingDate' className='form-label mt-4'>
                Banking Date:
              </label>
              <input
                type='date'
                className='form-control'
                id='inputbDate'
                onChange={handleInputChange}
                name='bankDate'
                value={invoiceDetails.bankDate}
                disabled={invoiceDetails.payMethod === "cash"}
                minLength={0}
                maxLength={15}
                // fdprocessedid='8n20f'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='chequeNo' className='form-label mt-4'>
                Cheque No:
              </label>
              <input
                type='text'
                className='form-control'
                id='inputCheque'
                onChange={handleInputChange}
                name='cheqNo'
                value={invoiceDetails.cheqNo}
                disabled={invoiceDetails.payMethod === "cash"}
                minLength={0}
                maxLength={15}
                // fdprocessedid='8n20f'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='amount' className='form-label mt-4'>
                Paid Amount:
              </label>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>LKR.</span>
                </div>
                <input
                  type='text'
                  className='form-control'
                  id='inputAmount'
                  placeholder='xxxxxx.xx'
                  onChange={handleInputChange}
                  name='paidAmount'
                  value={invoiceDetails.paidAmount}
                  pattern='^\d{1,10}\.\d{2}$'
                  required
                />
              </div>
            </div>
            <div className='footer'>
              {/* <div className='btnLeft'>
                <button type='button' className='btn btn-info mb-2'>
                  First
                </button>
                <button type='button' className='btn btn-info mb-2'>
                  Prevs.
                </button>
                <button type='button' className='btn btn-info mb-2'>
                  Next
                </button>
                <button type='button' className='btn btn-info mb-2'>
                  Last
                </button>
              </div> */}
              <div className='text-center'>
                <button
                  type='reset'
                  className='btn btn-danger my-2 ml-2'
                  onClick={handleClear}
                >
                  Reset
                </button>
                <button type='submit' className='btn btn-info my-2'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInvoice;
