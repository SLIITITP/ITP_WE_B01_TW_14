import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from './ToastContext';
import { Store } from '../Store';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //ashen
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //ashen

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === '/login' ||
          location.pathname === '/register'
        ) {
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : '/');
        }

        setUser(result);
      } else {
        navigate('/login', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //login request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        toast.success(`Welcome ${result.user.name}`);

        ctxDispatch({ type: 'USER_SIGNIN', payload: result });
        localStorage.setItem('userInfo', JSON.stringify(result));

        result.user.role === 'Administrator'
          ? navigate('/dashboardAdmin', { replace: true })
          : navigate('/', { replace: true });

        ctxDispatch({ type: 'USER_SIGNIN', payload: result });
        localStorage.setItem('userInfo', JSON.stringify(result));

        if (result.user.role === 'Customer') {
          navigate('/navscreen', { replace: true });
        } else if (result.user.role === 'Administrator') {
          navigate('/dashboardAdmin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //register request
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success('User Registered Successfully! Login to continue');
        navigate('/login', { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {/* <ToastContainer autoClose={2000}/> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
