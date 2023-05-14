import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function SearchBox() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  if (!userInfo) {
    return null; // don't render the search box if the user is not signed in
  }
  return (
    <Form
      className="d-flex me-auto"
      onSubmit={submitHandler}
      style={{ height: '60px', paddingTop: '10px' }}
    >
      <InputGroup>
        <FormControl
          style={{
            borderRadius: '10px 0px 0px 10px',
            height: '45px',
            border: '#0d6efd solid 0.5px',
          }}
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button
          variant="outline-primary"
          type="submit"
          id="button-search"
          style={{
            borderRadius: '0px 10px 10px 0px',
            height: '45px',
            border: '#0d6efd solid 0.5px',
          }}
        >
          <i className="fas fa-search" style={{ color: '#0d6efd' }}></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
