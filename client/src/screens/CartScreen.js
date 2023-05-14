import { useContext, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    if (quantity <= 0) {
      quantity = 1;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              <div style={{ fontWeight: '400', color: 'black' }}>
                Cart is empty. <Link to="/products">Go Shopping</Link>
              </div>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link
                        to={`/product/${item.name}`}
                        style={{ letterSpacing: '0px', color: '#0d6efd' }}
                      >
                        <strong> {item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={3}>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value);
                          if (newQuantity > item.countInStock) {
                            window.alert(
                              `Sorry. Only ${item.countInStock} units available in stock`
                            );
                            return;
                          }
                          updateCartHandler(item, newQuantity);
                        }}
                        style={{
                          width: '6rem',
                          textAlign: 'center',
                          borderRadius: '10px',
                          backgroundColor: '#BFC9CA',
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <strong>
                        Rs.{(item.sellingprice * item.quantity).toFixed(2)}
                      </strong>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 style={{ letterSpacing: '0px', fontWeight: '500' }}>
                    <b>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : Rs.
                      {cartItems
                        .reduce((a, c) => a + c.sellingprice * c.quantity, 0)
                        .toFixed(2)}
                    </b>{' '}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandler}
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      style={{
                        backgroundColor: '#f0c040',
                        color: 'black',
                        borderRadius: '10px',
                        border: '1px black solid',
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
