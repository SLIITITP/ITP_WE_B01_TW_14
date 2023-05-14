import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.sellingprice, 0)
  );

  cart.shippingPrice = 0;
  cart.taxPrice = round2(0.05 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingDetails: cart.shippingDetails,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
      toast.success('Order created successfully');
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3" style={{ color: 'black', fontWeight: '400' }}>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Customer Name : </strong>{' '}
                {cart.shippingDetails.customerName} <br />
                <strong>Company Name : </strong>{' '}
                {cart.shippingDetails.companyName} <br />
                <strong>Address : </strong>{' '}
                {cart.shippingDetails.shippingAddress},
                {cart.shippingDetails.city} <br />
                <strong>Contact No : </strong>
                {cart.shippingDetails.contactNo} <br />
              </Card.Text>
              <Link
                to="/shipping"
                style={{ letterSpacing: '0px', color: '#0d6efd' }}
              >
                Edit
              </Link>
            </Card.Body>
          </Card>

          <Card className="mb-3" style={{ color: 'black', fontWeight: '400' }}>
            <Card.Body>
              <Card.Title>Credit Details</Card.Title>
              <Card.Text>
                <strong>Credit Period : </strong>
                {cart.shippingDetails.creditDays} <br />
                <strong>Credit Amount : </strong>
                {cart.totalPrice.toFixed(2)}
              </Card.Text>
              <Link
                to="/shipping"
                style={{ letterSpacing: '0px', color: '#0d6efd' }}
              >
                Edit
              </Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body style={{ color: 'black', fontWeight: '400' }}>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                          style={{ maxWidth: '100px' }}
                        ></img>{' '}
                        <Link
                          to={`/product/${item.name}`}
                          style={{ letterSpacing: '0px', color: '#0d6efd' }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>
                          <b>{item.quantity}</b>
                        </span>
                      </Col>
                      <Col md={3}>
                        <b>
                          Rs. {(item.sellingprice * item.quantity).toFixed(2)}
                        </b>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link
                to="/cart"
                style={{ letterSpacing: '0px', color: '#0d6efd' }}
              >
                Edit
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={{ color: 'black', fontWeight: '400' }}>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>Rs. {cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs. {cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>Rs. {cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>Rs. {cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      style={{
                        backgroundColor: '#f0c040',
                        color: 'black',
                        borderRadius: '10px',
                        border: '1px black solid',
                      }}
                    >
                      <b>Place Order</b>
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
