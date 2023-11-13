
import './Styles/App.css';
import React, {useState, useEffect} from "react";
import CustomerList from './Customers/CustomerList';
import Message from './Message';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './Users/UserList';
import LoginForm from './Users/LoginFrom';
import ProductList from './Products/ProductList';
import Employees from './Employees/EmployeesPage';

function App() {

    // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isPositive, setIsPositive] = useState(false);
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() =>{
    let storedUser = localStorage.getItem("username");
    if (storedUser != null)
    {
      setLoggedIn(storedUser);
    }
  }, [])

  const Logout = () => {
    localStorage.clear();
    setLoggedIn("");
  }


  return (
    <Router>
      <div className="App">
        <h1>NorthWind Traders</h1>

        {loggedIn === "" && <LoginForm setLoggedIn={setLoggedIn} />}

        {loggedIn !== "" &&
          <>
            <Navbar className='NavBar' bg="dark" variant="dark">
              <Nav className='me-auto'>
                <Nav.Link as={Link} to="/Customers">Asiakkaat</Nav.Link>
                <Nav.Link as={Link} to="/Products">Tuotteet</Nav.Link>
                <Nav.Link as={Link} to="/Employees">Työntekijät</Nav.Link>
                {localStorage.getItem("accesslevelId") > 0 &&
                  <Nav.Link as={Link} to="/Users">Käyttäjät</Nav.Link>}
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/" onClick={() => Logout()} >Kirjaudu ulos ({localStorage.getItem("username")})</Nav.Link>
              </Nav>
            </Navbar>

            {showMessage && <Message message={message} isPositive={isPositive} />}

            <Routes>
              <Route path="/Customers" element={<CustomerList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />
              <Route path="/Products" element={<ProductList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />
              <Route path="/Employees" element={<Employees />} />
              {localStorage.getItem("accesslevelId") > 0 &&
                <Route path="/Users" element={<UserList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />}
                <Route path="/" element={<Navigate to="/Customers" />} />
            </Routes>
          </>
        }
      </div>
    </Router>
  );
}

export default App;
