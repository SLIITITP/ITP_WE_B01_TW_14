import { Routes as Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
// import { ToastContextProvider } from "./context/ToastContext";
import { AuthContextProvider } from "./context/AuthContext";

//ashen
import { ToastContainer, toast } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";
import AllEmployee from "./pages/AllEmployees";
import EditEmployee from "./pages/EditEmployee";
import CreateSalary from "./pages/AddSalary";
import CreateAttendance from "./pages/AddAttendance";
import Report from "./pages/CreateReport";
import Index from "./pages";
import EMDashboard from "./pages/EMDashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Bhanuka********************************************************
//import {Navbar} from './components/Navbar';
import { AllVehicle } from "./pages/AllVehicle";
import { AddVehicle } from "./pages/AddVehicle";
import { EditVehicle } from "./pages/EditVehicle";
import { VehicleDetail } from "./pages/VehicleDetail";
import { DriverVehicleAssign } from "./pages/DriverVehicleAssign";
import { AddFuel } from "./pages/AddFuel";
import { RepairAssign } from "./pages/RepairAssign";
import { VMDashboard } from "./pages/VMDashboard";
import { AllVehicleDocument } from "./pages/AllVehicleDocument";
import { Editdocument } from "./pages/Editdocument";
import { AddRunnigRecords } from "./pages/AddRunnigRecords";
import { AddRepair } from "./pages/AddRepair";
import { RegisterGarage } from "./pages/RegisterGarage";
import { ViewRunningRecords } from "./pages/ViewRunningRecords";
import { ViewFuelDetails } from "./pages/ViewFuelDetails";
// Bhanuka********************************************************

// Pasindu********************************************************
import AllSalesReps from "./pages/AllSalesReps";
import CreateSalesRep from "./pages/CreateRep";
import EditDelivery from "./pages/EditSalesRep";
import AllSchedules from "./pages/AllSchedules";
import CreateSchedule from "./pages/CreateSchedule";
import EditSchedule from "./pages/EditSchedule";
import CreateDeliveryReport from "./pages/CreateDeliveryReport";

// Pasindu********************************************************

//Wasana
import Addsup from "./pages/Addsup";
import Allsup from "./pages/Allsup";
import Editsup from "./pages/Editsup";
import Allpur from "./pages/Allpurchase";
import Addpur from "./pages/Addpur";
import Allapp from "./pages/Allappointmens";
import Addapp from "./pages/Addappointment";
import Editapp from "./pages/Editappointment";
import AllRecW from "./pages/AllReportsW"
import Dashboard from "./pages/DashboardW";
import Allexp from "./pages/AllexpiredAppointments";
//Wasana

// Yasitha********************************************************
import CreateStock from "./pages/CreateStock";
import AllStock from "./pages/AllStocks";
import CreateCategory from "./pages/CreateCategory";
import AllCategory from "./pages/AllCategories";
import EditStock from "./pages/EditStock";
import EditCategory from "./pages/EditCategory";
import AddProfit from "./pages/AddProfit";
import AllProfit from "./pages/AllProfits";
import EditProfit from "./pages/EditProfit";
import StockReport from "./pages/CreateReportStock";
import IMDashboard from "./pages/IMDashboard";

// Yasitha********************************************************

// Ashen********************************************************

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import ShippingDetailsScreen from "./screens/ShippingDetailsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import SigninScreen from "./screens/SigninScreen";
// import Header from './components/Header';
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import { getError } from "./utils";
import SearchBox from "./components/SearchBox";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DashboardScreen from "./screens/DashboardScreen";
import OrderListScreen from "./screens/OrderListSCreen";
import NavigationScreen from "./screens/NavigationScreen";
import PaymentGatewayScreen from "./screens/PaymentGatewayScreen";
// import Footer from './components/Footer';
//import CreateCategory from './pages/CreateCategory';
// import Layout from './components/Layout';
// import Login from './screens/Login';
// import { AuthContextProvider } from './context/AuthContext';
import CreateCustomer from "./screens/CreateCustomer";
import CustomerScreen from "./screens/CustomerScreen";

import { ViewRunningRecords } from "./pages/ViewRunningRecords";
import { ViewFuelDetails } from "./pages/ViewFuelDetails";

// import AllSalary from "./pages/AllSalaries";
// import AllAttendance from "./pages/AllAttendances";


// Ashen********************************************************

const App = () => {
  // Ashen********************************************************

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingDetails");
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const { data } = await axios.get(`/api/products/categories`);
        // setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  // Ashen********************************************************
  return (
    <Router>
      <ToastContextProvider>
        <AuthContextProvider>
          <Header />
          <Layout>
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/mycontacts" element={<AllContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/createemp" element={<CreateEmployee />} />
              <Route path="/myemployees" element={<AllEmployee />} />
              <Route path="/editemp/:id" element={<EditEmployee />} />
              <Route path="/addsalary" element={<CreateSalary />} />
              <Route path="/mysalaries" element={<AllSalary />} />
              <Route path="/addattendance" element={<CreateAttendance />} />
              <Route path="/myattendances" element={<AllAttendance />} />
              <Route path="/createreport" element={<Report />} />

              {/* Bhanuka******************************************************** */}

              <Route path="/vmdashboard" exact element={<VMDashboard />} />
              <Route path="/allvehicle" exact element={<AllVehicle />} />
              <Route path="/registerVehicle" element={<AddVehicle />} />
              <Route
                path="/allvehicle/editVehicle/:id"
                element={<EditVehicle />}
              />
              <Route
                path="/allvehicle/viewVehicle/:id"
                element={<VehicleDetail />}
              />
              <Route
                path="/drivervehicleAssign"
                element={<DriverVehicleAssign />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addFuel" element={<AddFuel />} />
              <Route path="/repairAssign" element={<RepairAssign />} />
              <Route path="/allDocument" element={<AllVehicleDocument />} />
              <Route
                path="/allDocument/editdoc/:id"
                element={<Editdocument />}
              />
              <Route path="/addRunningRecords" element={<AddRunnigRecords />} />
              <Route path="/addrepair" element={<AddRepair />} />
              <Route path="/registerGarage" element={<RegisterGarage />} />
              <Route path="/viewRunningRecords" element={<ViewRunningRecords/>} />
              <Route path="/viewFuelRecords" element={<ViewFuelDetails/>} />
              {/* Bhanuka******************************************************** */}

              {/* Pasindu******************************************************** */}
              <Route path="/allsalesreps" element={<AllSalesReps />} />
              <Route path="/createsalesrep" element={<CreateSalesRep />} />
              <Route path="/editsalerep/:id" element={<EditDelivery />} />
              <Route path="/myschedules" element={<AllSchedules />} />
              <Route path="/createschedule" element={<CreateSchedule />} />
              <Route path="/editschedule/:id" element={<EditSchedule />} />
              <Route
                path="/createdeliveryreport"
                element={<CreateDeliveryReport />}
              />

              {/* Pasindu******************************************************** */}

              {/* Wasana*/}
              <Route path='/addsup' element={<Addsup />} />
              <Route path='/allsup' element={<Allsup/>} />
              <Route path='/editsup' element={<Editsup/>} />
              <Route path='/allpur' element={<Allpur/>} />
              <Route path='/addpur' element={<Addpur/>} />
              <Route path='/allapp' element={<Allapp/>} />
              <Route path='/addapp' element={<Addapp/>} />
              <Route path='/editapp' element={<Editapp/>} />
              <Route path='/allrepw' element={<AllRecW/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/allexp' element={<Allexp/>} />
              {/* Wasana*/}

              {/* Yasitha******************************************************** */}
              <Route path="/createcategory" element={<CreateCategory />} />
              <Route path="/mycategories" element={<AllCategory />} />
              <Route path="/createstock" element={<CreateStock />} />
              <Route path="/mystocks" element={<AllStock />} />
              <Route path="/editstock/:id" element={<EditStock />} />
              <Route path="/editcategory/:id" element={<EditCategory />} />
              <Route path="/addprofit" element={<AddProfit />} />
              <Route path="/myprofits" element={<AllProfit />} />
              <Route path="/editprofit/:id" element={<EditProfit />} />
              <Route path="/stockreport" element={<StockReport />} />
              <Route path="/imdashboard" element={<IMDashboard />} />

              {/* Yasitha******************************************************** */}

              {/* Ashen******************************************************** */}
              {/* <ToastContainer position="bottom-center" limit={1} /> */}
              {/* <main>
                <Container> */}
              {/* <Route path="/" element={<SigninScreen />} /> */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <HomeScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/product/:name" element={<ProductScreen />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/navscreen" element={<NavigationScreen />} />
              <Route path="/shipping" element={<ShippingDetailsScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />

              <Route
                path="/paymentgateway"
                element={<PaymentGatewayScreen />}
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>

              {/* <Route
                    path="/login"
                    element={
                      <AuthContextProvider>
                        <Login />
                      </AuthContextProvider>
                    }
                  /> */}
              <Route
                path="/customerinfo"
                element={
                  <AuthContextProvider>
                    <CustomerScreen />
                  </AuthContextProvider>
                }
              />
              <Route
                path="/createcustomer"
                element={
                  <AuthContextProvider>
                    <CreateCustomer />
                  </AuthContextProvider>
                }
              />
              {/* </Container>
              </main> */}

              {/* Ashen******************************************************** */}
            </Switch>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
      <Footer />
    </Router>
  );
};

export default App;
