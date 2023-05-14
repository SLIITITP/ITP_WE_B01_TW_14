import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: 'Rs. 0 to Rs. 1000',
    value: '0-1000',
  },
  {
    name: 'Rs. 1001 to Rs. 10000',
    value: '1001-10000',
  },
  {
    name: 'Rs. 10001 to Rs. 100000',
    value: '10001-100000',
  },
  {
    name: 'Above Rs. 100000',
    value: '100000-10000000',
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <div>
            <form>
              <h3>Department</h3>
              <div
                className="search-product-radioBtn"
                style={{ fontWeight: '400', color: 'black' }}
              >
                <label className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={category === 'all'}
                    onChange={() => navigate(getFilterUrl({ category: 'all' }))}
                  />
                  Any
                </label>
                {categories.map((c) => (
                  <label key={c._id} className="radio-label">
                    <input
                      type="radio"
                      name="category"
                      value={c._id}
                      checked={category === c._id}
                      onChange={() =>
                        navigate(getFilterUrl({ category: c._id }))
                      }
                    />
                    {c.name}
                    <br />
                  </label>
                ))}
              </div>
            </form>
          </div>
          <div>
            <br />
            <form>
              <h3>Price</h3>
              <div
                className="search-product-radioBtn"
                style={{ fontWeight: '400', color: 'black' }}
              >
                <span>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={price === 'all'}
                      onChange={() => navigate(getFilterUrl({ price: 'all' }))}
                    />
                    Any
                  </label>
                </span>
                {prices.map((p) => (
                  <span>
                    <label key={p.value} className="radio-label">
                      <input
                        type="radio"
                        name="price"
                        value={p.value}
                        checked={price === p.value}
                        onChange={() =>
                          navigate(getFilterUrl({ price: p.value }))
                        }
                      />
                      {p.name}
                    </label>
                  </span>
                ))}
              </div>
            </form>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div style={{ fontWeight: '400', color: 'black' }}>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ''}
                    {price !== 'all' && ''}
                    {query !== 'all' ||
                    category !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                        style={{
                          background: 'transparent',
                        }}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col
                  className="text-end"
                  style={{ fontWeight: '400', color: 'black' }}
                >
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={7} md={5} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterUrl({ page: x + 1 }).substring(7),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
