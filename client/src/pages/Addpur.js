import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ToastContext from "../context/ToastContext";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

export default function Addpur() {

    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useContext(ToastContext);

    const [reqdate, setReqdate] = useState("");
    
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [items, setItems] = useState([]);

    const handleAddItem = (event) => {
        event.preventDefault();
        const newItem = { itemName, quantity };
        setItems([...items, newItem]);
        setItemName('');
        setQuantity('');
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token'); // get the access token from local storage
          const response1 = await axios.post('http://localhost:8000/api/addPurchase', 
            {supid: location.state.uID, reqdate, items},
            { headers: { Authorization: `Bearer ${token}` } } // include the authorization header
          );
          toast.success("Purchase order added successfully");
          console.log(response1);
      
          try {
            const response2 = await axios.post('http://localhost:8000/api/send-report-email', {
              to: `${location.state.uemail}`,
              subject: 'Purchase Order from Southern Agro',
              body: `Order Details\n 
                ID:${location.state.uSupID}\n
                Order ID : ${response1.data.orderid}
                Requested Date : ${reqdate}
                Items: ${JSON.stringify(items)}
                Date: ${response1.data.date}
              `,
            }, { headers: { Authorization: `Bearer ${token}` } }); // include the authorization header
            toast.success("Email sent successfully");
            console.log(response2.data);
          } catch (error) {
            console.error(error);
            //setError('Error sending email');
          }
        
          navigate('/allpur');
        } catch (err) {
          alert(err.message);
        }
      };
  
    return(
      <>
      <Helmet>
        <title>Supplier</title>
      </Helmet>
      <h2 className="text-center bg-darkgreen text-white p-2">Send purchase Order</h2>
      <Card>
            <form onSubmit={handleSubmit}>
                <h3 className="mt-5" style={{fontWeight:'bold', color: 'black'}}>Fill Order Details</h3><br></br>
                <p style={{fontWeight: 'bold', color: 'Black'}}>{"Suplier ID : " + location.state.uSupID}</p>
                <p style={{fontWeight: 'bold', color: 'Black'}}>{"To : " + location.state.uemail}</p><br></br>
                <div className="form-group">
                    <label for="exampleInputEmail1">Request Date</label>
                    <input type="date" class="form-control" style={{width: '200px'}} id="exampleInputEmail1" name="reqdate" value={reqdate} onChange={(e) => setReqdate(e.target.value)} required aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <div class="col">
                        <label for="exampleInputEmail1">Item Name</label>
                        <input type="text" class="form-control" style={{width: '500px'}} name="item" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Quantity</label>
                        <input type="number" class="form-control" style={{width: '100px'}} name="qty" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                </div>
                <button className="btn btn-primary my-2" onClick={handleAddItem}>Add Item</button>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.itemName} - {item.quantity}</li>
                    ))}
                </ul>
                <button className="btn btn-info mb-2" type="submit">Send order</button>
            </form>
            </Card>
        </>
    )
}
