import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    case 'ACCEPT_REQUEST':
      return { ...state, loadingAccept: true };
    case 'ACCEPT_SUCCESS':
      return { ...state, loadingAccept: false, successAccept: true };
    case 'ACCEPT_FAIL':
      return { ...state, loadingAccept: false };
    case 'ACCEPT_RESET':
      return {
        ...state,
        loadingAccept: false,
        successAccept: false,
      };
    case 'REJECT_REQUEST':
      return { ...state, loadingReject: true };
    case 'REJECT_SUCCESS':
      return { ...state, loadingReject: false, successReject: true };
    case 'REJECT_FAIL':
      return { ...state, loadingReject: false };
    case 'REJECT_RESET':
      return {
        ...state,
        loadingReject: false,
        successReject: false,
      };
    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      loadingDeliver,
      successDeliver,
      loadingAccept,
      successAccept,
      loadingReject,
      successReject,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/');
    }
    if (
      !order._id ||
      successDeliver ||
      successAccept ||
      successReject ||
      (order._id && order._id !== id)
    ) {
      fetchOrder();
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
      if (successAccept) {
        dispatch({ type: 'ACCEPT_RESET' });
      }
      if (successReject) {
        dispatch({ type: 'REJECT_RESET' });
      }
    }
  }, [
    order,
    userInfo,
    id,
    successDeliver,
    successAccept,
    successReject,
    navigate,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  async function acceptOrderHandler() {
    try {
      dispatch({ type: 'ACCEPT_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/accept`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'ACCEPT_SUCCESS', payload: data });
      toast.success('Order is Accepted');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'ACCEPT_FAIL' });
    }
  }

  async function rejectOrderHandler() {
    try {
      dispatch({ type: 'REJECT_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/reject`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'REJECT_SUCCESS', payload: data });
      toast.success('Order is Rejected');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'ACCEPT_FAIL' });
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add background color to the page
    doc.setFillColor('#f4f4f4');
    doc.rect(
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight(),
      'F'
    );

    // Add custom font
    doc.addFont(
      'https://fonts.gstatic.com/s/opensans/v28/mem8YaGs126MiZpBA-UFW50e.ttf',
      'OpenSans',
      'normal'
    );

    // Set font and font size
    doc.setFont('OpenSans', 'normal');
    doc.setFontSize(14);

    // Add padding and margin to headings
    doc.text('Order Details', 20, 20);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 80, 25);
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderId}`, 20, 35);
    doc.text(`Customer Name: ${order.shippingDetails.customerName}`, 20, 45);
    doc.text(`Company Name: ${order.shippingDetails.companyName}`, 20, 55);
    doc.text(
      `Shipping Address: ${order.shippingDetails.shippingAddress}`,
      20,
      65
    );

    // Add padding and margin to table
    const tableHeaders = ['Item', 'Quantity', 'Price'];
    const tableData = order.orderItems.map((item) => [
      item.name,
      item.quantity,
      (item.sellingprice * item.quantity).toFixed(2),
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 80,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    });

    // Add total and tax information
    doc.setFontSize(12);
    doc.text(
      `Tax Amount: ${order.taxPrice.toFixed(2)}`,
      20,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `Total Amount: ${order.totalPrice.toFixed(2)}`,
      20,
      doc.autoTable.previous.finalY + 30
    );

    // Save the PDF
    doc.save(`order_${order.orderId}.pdf`);
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {order.orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {order.orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Customer Name :</strong>{' '}
                {order.shippingDetails.customerName} <br />
                <strong>Company Name :</strong>{' '}
                {order.shippingDetails.companyName} <br />
                <strong>Address: </strong>{' '}
                {order.shippingDetails.shippingAddress},
                {order.shippingDetails.city} <br />
                <strong>Contact Number :</strong>{' '}
                {order.shippingDetails.contactNo}
                <br />
                <br />
                <h5>Order Status : </h5>
              </Card.Text>
              <Card.Text>
                {order.status === 'Delivered' ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt.substring(0, 10)}
                  </MessageBox>
                ) : order.status === 'Accepted' ? (
                  <MessageBox variant="info">
                    Accepted at {order.acceptedAt.substring(0, 10)}
                  </MessageBox>
                ) : order.status === 'Rejected' ? (
                  <MessageBox variant="danger">
                    Rejected at {order.rejectedAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="warning">Pending...</MessageBox>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Credit Details</Card.Title>
              <Card.Text>
                <strong>Credit Period :</strong>{' '}
                {order.shippingDetails.creditDays} <br />
                <strong>Credit Amount :</strong> {order.totalPrice.toFixed(2)}
              </Card.Text>
              {/* {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )} */}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <Row className="align-items-center order-screen-items-head">
                <Col md={6}>
                  <strong>Product</strong>
                </Col>
                <Col md={3}>
                  <strong>Quantity</strong>
                </Col>
                <Col md={3}>
                  <strong>Price</strong>
                </Col>
              </Row>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.name}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>
                        Rs. {(item.sellingprice * item.quantity).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs.{Number(order.itemsPrice).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs.{order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>Rs. {order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>Rs. {order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <div className="d-grid">
                  <Button variant="primary" onClick={generatePDF}>
                    Download Order Bill (PDF)
                  </Button>
                </div>
                <ListGroup.Item></ListGroup.Item>
                {userInfo.isAdmin && order.status === 'Pending' && (
                  <ListGroup.Item>
                    {loadingAccept && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="success"
                        onClick={acceptOrderHandler}
                      >
                        Accept Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                {userInfo.isAdmin && order.status === 'Pending' && (
                  <ListGroup.Item>
                    {loadingReject && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="danger"
                        onClick={rejectOrderHandler}
                      >
                        Reject Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                {userInfo.isAdmin && order.status === 'Accepted' && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={deliverOrderHandler}
                      >
                        Deliver Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
