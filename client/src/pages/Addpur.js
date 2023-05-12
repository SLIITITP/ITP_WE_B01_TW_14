import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ToastContext from "../context/ToastContext";
import Card from "react-bootstrap/Card";

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
        <div className="container mt-5">
          <Card clasName="shadow card">
            <form className="mx-auto w-50 shadow p-5" onSubmit={handleSubmit}>
                <Link className="btn btn-primary" to="/allsup">Suppliers</Link>
                <h3 className="mt-5" >Fill Order Details</h3>
                <p>{location.state.uSupID}</p>
                <p>{location.state.uemail}</p>
                <div class="mb-3">
                    <label for="exampleInputEmail1">Supplier Address</label>
                    <input type="date" class="form-control" id="exampleInputEmail1" name="reqdate" value={reqdate} onChange={(e) => setReqdate(e.target.value)} required aria-describedby="emailHelp"/>
                </div>
                <div class="form-row">
                    <div class="col">
                        <label for="exampleInputEmail1">Item Name</label>
                        <input type="text" class="form-control" name="item" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1">Quantity</label>
                        <input type="number" class="form-control" name="qty" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                </div>
                <button onClick={handleAddItem}>Add Item</button>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.itemName} - {item.quantity}</li>
                    ))}
                </ul>
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
            </Card>
        </div>
    )
}
