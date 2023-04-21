// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <div className="sidebar">
//         <button onClick={handleSidebarToggle}>
//           {sidebarOpen ? "Close" : "Open"}
//         </button>
//         {sidebarOpen && (
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;
