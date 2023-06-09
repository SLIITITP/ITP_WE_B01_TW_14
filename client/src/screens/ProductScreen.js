import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Stack from 'react-bootstrap/esm/Stack';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { name } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/name/${name}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [name]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product-scr">
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.imageUrl}
            alt={product.name}
          ></img>
        </Col>
        <Col md={6}>
          <ListGroup
            variant="flush"
            className="product-detail-info"
            style={{
              borderRadius: '20px',
              border: '#100901 1px solid',
              fontWeight: '400',
            }}
          >
            <ListGroup.Item
              variant="success"
              style={{ borderRadius: '20px 20px 0px 0px', border: '#100901 ' }}
            >
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <center>
                <h1>{product.name}</h1>
              </center>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Brand :</strong>{' '}
                </Col>
                <Col>{product.supplier}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Description : </strong>
                <br />
                {product.description}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Price : </strong>
                </Col>
                <Col>Rs. {product.sellingprice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Status : </strong>
                </Col>
                <Col>
                  {product.countInStock > 0 ? (
                    <h5>
                      <Badge
                        bg="success"
                        style={{
                          borderRadius: '8px',
                        }}
                      >
                        {product.countInStock} units available
                      </Badge>
                    </h5>
                  ) : (
                    <h5>
                      <Badge bg="danger" style={{ borderRadius: '8px' }}>
                        Out of Stock
                      </Badge>
                    </h5>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item
                style={{
                  borderRadius: '0px 0px 20px 20px',
                  border: '#100901 ',
                }}
              >
                <Stack className="col-md-6 mx-auto">
                  <div className="d-grid">
                    <Button
                      style={{
                        backgroundColor: '#f0c040',
                        borderRadius: '10px',
                        color: 'black',
                        border: '1px solid',
                        height: '50px',
                      }}
                      onClick={addToCartHandler}
                      variant="primary"
                    >
                      <b>Add to Cart</b>
                    </Button>
                  </div>
                </Stack>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
