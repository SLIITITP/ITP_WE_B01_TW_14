import Navbar from "./Navbar";

// this is a layout component which will be used in every part of our website
const Layout = ({ navbar = true, children }) => {
  return (
    <>
      {/* integrating navbar component */}
      {/* if navbar is true then only Navbar will be rendered */}
      {navbar && <Navbar />}

      {/* this is will extra space for every part of our website */}
      <div className="container mt-3">{children}</div>
    </>
  );
};

export default Layout;

// // NOTES:
// //containers will be used to wrap our components. It will give us extra space for our components.
