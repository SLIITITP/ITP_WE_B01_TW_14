import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Allpur = () => {
  const { toast } = useContext(ToastContext);
  const [purchases, setPurchases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [received, setReceived] = useState(false);

  const handleReceived = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/purchaseOrders/${modalData._id}`, {
        method: 'PUT',
        headers: {  
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark order as received');
      }
      setReceived(true);
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchPurchases = async () => {
    try {
      const response = await axios.get("/allPurchase", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPurchases(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/allPurchase", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPurchases(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/deletePurchase/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPurchases((prevPurchases) =>
          prevPurchases.filter((purchase) => purchase._id !== id)
        );
        toast.success("purchase deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

 
  const filteredPurchases = purchases.filter((purchase) => {
    const searchRegex = new RegExp(searchQuery, "i");
    return (
      searchRegex.test(purchase.supid) || searchRegex.test(purchase.orderid)
    );
  });

const handleCountClick = async () => {
  try {
    const supplierCounts = filteredPurchases.reduce((counts, purchase) => {
      const supid = purchase.supid && purchase.supid._id ? purchase.supid._id.toString() : "";
      if (supid) {
        counts[supid] = counts[supid] ? counts[supid] + 1 : 1;
      }
      return counts;
    }, {});

    Object.entries(supplierCounts).forEach(async ([supid, count]) => {
      try {
        let rating;
        const supplier = await fetch(`http://localhost:8000/api/supplier/${supid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => res.json());
        
        if (count > 10) {
          rating = "Excellent";
        } else if (count > 5 && count <= 10) {
          rating = "Good";
        } else if (count > 2 && count <= 5) {
          rating = "Satisfactory";
        } else {
          rating = "Needs Improvement";
        }
        

        console.log(`Supplier ${supid} has a count of ${count} and is rated ${rating}`);
        const response = await fetch(`http://localhost:8000/api/updateSupplierRate/${supid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ rate: rating }),
        });
        const updatedSupplier = await response.json();
        toast.success("rated successfully!");
        console.log(`Updated supplier ${updatedSupplier.name} with new rating: ${updatedSupplier.rate}`);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};


  //new
  const handlePrint = (orderid) => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Purchase Order ${orderid}\n\n`, marginLeft, 40);
  
    const order = purchases.find((p) => p.orderid === orderid);
    if (!order) {
      console.error(`Could not find order with orderid ${orderid}`);
      return;
    }
  
    // Add supplier details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Supplier ID: ${order.supid && order.supid.supid ? order.supid.supid.toString() : ""}`, marginLeft, 70);
    doc.text(`Requested Date: ${order.requestedDate ? order.requestedDate.toString() : ""}\n\n`, marginLeft, 90);
  
    // Add order items
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Order Items", marginLeft, 120);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    order.items.forEach((item, index) => {
      const startY = 140 + index * 20;
      doc.text(`${item.itemName}: ${item.quantity}`, marginLeft, startY);
    });
  
    // Add some extra text
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    const startY = 520;
    doc.text("Thank you for your order!", marginLeft, startY);
    doc.setFont("helvetica", "normal");
    doc.text("Please contact us if you have any questions or concerns.", marginLeft, startY + 20);
  
    doc.save(`purchase-order-${orderid}.pdf`);
  };

  return (
    <>
      <div>
        <h1>Your Purchase Orders</h1>

        <div className="d-flex justify-content-between">
          <a href="/allsup" className="btn btn-danger my-2">
            Reload Purchase Order List
          </a>
          <div>
          <button className="btn btn-info mb-2" onClick={() => (handleCountClick())}>Rate Suppliers</button>
          </div>
        </div>
        
        <hr className="my-4" />

        <form className="d-flex">
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            className="form-control my-2"
            placeholder="Search Supplier"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-info mx-2 my-2">
            {" "}
            Search
          </button>
        </form>
        <p>
          Your Total Purchase Orders: <strong>{purchases.length}</strong>{" "}
        </p>
        <hr className="my-4" />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Order ID</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Sup ID</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Req Date</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Status</th>
              <th scope="col" style={{ width: "20%", whiteSpace: "nowrap" }}>items</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Recieved</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((purchase) => (
              <tr
                key={purchase._id}
                onClick={() => {
                  setModalData({}); //we need to clear the modal data before setting it again
                  setModalData(purchase);
                  setShowModal(true);
                }}
              >
                <td>{purchase.orderid}</td>
                <td>{purchase.supid && purchase.supid.supid? purchase.supid.supid.toString(): ""}</td>
                <td>{new Date(purchase.reqdate).toLocaleDateString()}</td>
                <td>{purchase.completed ? "Done" : (moment(purchase.reqdate).diff(moment(), "days") >= 0 ? `Pending (${moment(purchase.reqdate).diff(moment(), "days")} days)` : `Due (${Math.abs(moment(purchase.reqdate).diff(moment(), "days"))} days)`)}</td>
                <td>
                  {purchase.items && purchase.items.length > 0 ? (
                    <ul>
                      {purchase.items.map((item) => (
                        <li key={item._id}>
                          {item.itemName} - {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items found</p>
                  )}
                </td>
                <td>{purchase.completed ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Southern Agro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.orderid}</h3>
          <p><strong>Supplier ID: {modalData.supid && modalData.supid.supid}</strong></p>
          <p><strong>Requested Date: {new Date(modalData.reqdate).toLocaleDateString()}</strong></p>
          <p><strong>Remaining Days: {moment(modalData.reqdate).diff(moment(), 'days')}</strong></p>
          <p><strong>
            Items: {modalData.items && modalData.items.length > 0 ? (
                  <ul>{modalData.items.map(item => (
                      <li key={item._id}>{item.itemName} - {item.quantity}</li>
                      ))}
                  </ul>) : 
                  (<p>No items found</p>)}
          </strong></p>
        </Modal.Body>

        <Modal.Footer>
        <button className="btn btn-info mx-2" onClick={()=> handlePrint(modalData.orderid)}>Print</button>
        <button className="btn btn-danger" onClick={() => modalData && handleDelete(modalData._id)}>Delete</button>
          <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
          {!received && <button className="btn btn-success" onClick={() => handleReceived()}>Received</button>}
        {received && <p>Order received</p>}

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Allpur;
