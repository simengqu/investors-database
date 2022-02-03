import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from 'react-bootstrap/Modal';
import Modal from "./components/Modal";
import InvestorsList from "./components/investors-list";
import Example from "./components/Example";

function App() {
  // const [modalOpen, setModalOpen] = useState(false);
  // const investors = InvestorsList.investors;

  return (
    <div className="App">
      {/* <h1>Hey, click on the button to open the modal.</h1>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />} */}

      <InvestorsList></InvestorsList>
    </div>
    
  );
}

// function App() {
//   const [user, setUser] = React.useState(null);

//   async function login(user = null) {
//     setUser(user);
//   }

//   async function logout() {
//     setUser(null);
//   }

//   return (
//     <div>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <a href="/investors" className="navbar-brand">
//           Investors Database
//         </a>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/investors"} className="nav-link">
//               Investors
//             </Link>
//           </li>
//           <li className="nav-item" >
//             { user ? (
//               <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
//                 Logout {user.name}
//               </a>
//             ) : (            
//             <Link to={"/login"} className="nav-link">
//               Login
//             </Link>
//             )}

//           </li>
//         </div>
//       </nav>

//       <div className="container mt-3">
//         <Switch>
//           <Route exact path={["/", "/investors"]} component={InvestorsList} />
//           <Route 
//             path="/investors/:id"
//             render={(props) => (
//               <Investor {...props} user={user} />
//             )}
//           />
//           <Route 
//             path="/login"
//             render={(props) => (
//               <Login {...props} login={login} />
//             )}
//           />
//         </Switch>
//       </div>
//     </div>
//   );
// }

export default App;
