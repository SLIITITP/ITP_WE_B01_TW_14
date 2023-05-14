import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card
      className="product"
      style={{
        border: '1px #2d2c2c solid',
        margin: '12px 12px',
        padding: '0px',
        borderRadius: '20px',
        width: '320px',
        fontFamily: 'sans-serif',
        letterSpacing: '0px',
      }}
    >
      <Link to={`/product/${product.name}`}>
        <img
          className="product-card-image card-img-top"
          src={product.imageUrl}
          alt={product.name}
          style={{ height: '320px', width: '100%', borderRadius: '20px' }}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.name}`}
          style={{ letterSpacing: '0px', color: '#0d6efd' }}
        >
          <Card.Title style={{ letterSpacing: '0px' }}>
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text>Rs. {product.sellingprice.toFixed(2)}</Card.Text>
        <Stack gap={2} className="col-md-7 mx-auto">
          {product.countInStock === 0 ? (
            <Button
              variant="danger"
              disabled
              style={{
                borderRadius: '10px',
              }}
            >
              Out of stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              style={{
                backgroundColor: '#f0c040',
                color: 'black',
                borderRadius: '10px',
                border: '1px solid',
              }}
            >
              Add to cart
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Product;
