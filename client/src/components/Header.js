import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { Store } from '../Store';
import { Badge } from 'react-bootstrap';

const Header = () => {
  const { user } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ background: 'linear-gradient(to right, #214956 , #498459)' }}
    >
      {user && user.role === 'Customer' ? (
        <Link
          to="/products"
          className="navbar-brand"
          style={{ textDecoration: 'none' }}
        >
          <h1 className="m-2 text-white " style={{ paddingLeft: '25px' }}>
            Southern Agro
          </h1>
        </Link>
      ) : (
        <Link
          to="/"
          className="navbar-brand"
          style={{ textDecoration: 'none' }}
        >
          <h1 className="m-2 text-white " style={{ paddingLeft: '25px' }}>
            Southern Agro
          </h1>
        </Link>
      )}
      {user &&
        (user.role === 'Customer Manager' || user.role === 'Customer') && (
          <SearchBox />
        )}
      {user &&
        (user.role === 'Customer Manager' || user.role === 'Customer') && (
          <Link
            to="/cart"
            className="nav-link"
            style={{ marginRight: '20px', color: 'white' }}
          >
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        )}
      {user && (
        <div className="d-flex align-items-center">
          <span className="text-white" style={{ paddingRight: '25px' }}>
            {user.name}
          </span>
          {user.role === 'HR Manager' && (
            <img
              src={
                'https://media.licdn.com/dms/image/C5603AQE8grUhgHpt2g/profile-displayphoto-shrink_400_400/0/1659579550842?e=1689206400&v=beta&t=6h28vX-YyfU1OlNA0cZNyqd-Md1raXIomtDBM9ABHSM'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}

          {/* {user.role === 'Delivery Manager' && ( */}

          {user.role === 'Administrator' && (
            <img
              src={
                'https://media.licdn.com/dms/image/D5603AQEOpuARV18dBQ/profile-displayphoto-shrink_400_400/0/1674372898612?e=1689206400&v=beta&t=S_AAStf8e8WRs3NuYrT8GFDZLS4bHmHJGV2Wl2VBkWM'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === 'Delivery Manager' && (
            <img
              src={
                'https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/343738766_958774192127225_2020277138152706314_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wUq0Fnd98r4AX8M5OUd&_nc_ht=scontent.fcmb1-2.fna&oh=00_AfDsApJBH-olxzm_6wXGZutzgzxNXD6QnvGb7fxIsOFFkQ&oe=645C5B60'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}

          {/* {(user.role === 'Customer Manager' || user.role === 'Customer') && ( */}

          {user.role === 'Financial Manager' && (
            <img
              src={
                'https://media.licdn.com/dms/image/C5603AQEcfhRNz3JrHw/profile-displayphoto-shrink_100_100/0/1627656583754?e=1689206400&v=beta&t=l1IJgRlj_w-ugh7Go98kPtG0Y3v6gfF6lzGvZ9xgwv8'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === 'Customer Manager' && (
            <img
              src={
                'https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-1/325512809_720598059414679_7618836821725563303_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=tWSlVzr__XAAX_v0NbS&_nc_ht=scontent.fcmb1-2.fna&oh=00_AfDuU0nXEGkyeOpD4c1J_VmPjlNBEsjQtwNWOraT0SrWtQ&oe=645CB58C'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === 'Supplier Manager' && (
            <img
              src={
                'https://media.licdn.com/dms/image/C4E03AQHB_MIwKJx34w/profile-displayphoto-shrink_100_100/0/1625974004067?e=1689206400&v=beta&t=S-zJ17gQe6GBTK-3w4jOwfyk4tf53wPyTioY-OenTss'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === 'Inventory Control Manager' && (
            <img
              src={
                'https://media.licdn.com/dms/image/C4E03AQFRJ6istEexFg/profile-displayphoto-shrink_100_100/0/1624459091173?e=1689206400&v=beta&t=qz1g4OvzvCo1fOTGZFzfWhh7q2fvfvRpyWzaRm6L4NU'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === 'Vehicle Manager' && (
            <img
              src={
                'https://media.licdn.com/dms/image/C4E03AQFhLqtVLVz__Q/profile-displayphoto-shrink_400_400/0/1624690151211?e=1689206400&v=beta&t=QOwKAUl9IOAMZByP_SdGnmiJDgUboPJjGo0kv8dXJMQ'
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
