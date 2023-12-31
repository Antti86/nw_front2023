
import './App.css';
import React, {useState, useEffect} from "react";
import CustomerList from './Customers/CustomerList';
import Message from './Message'
import Posts from './Posts';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserList from './Users/UserList';
import LoginForm from './Users/LoginFrom';


function App() {

  // const [näytäLaskuri, setnäytäLaskuri] = useState(false);

    // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedIn, setLoggedIn] = useState("")


  useEffect(() =>{
    let storedUser = localStorage.getItem("username")
    if (storedUser != null)
    {
      setLoggedIn(storedUser)
    }
  }, [])

  return (
    <div className="App">
      <h1>NorthWind Testi</h1>

      {loggedIn == "" && <LoginForm setIsPositive={setIsPositive} setMessage={setMessage} setLoggedIn={setLoggedIn}
                          setShowMessage={setShowMessage} />}

      {loggedIn != "" &&
      <Router>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="/Customers">Customers</Nav.Link>
            <Nav.Link href="/Users">Users</Nav.Link>
            <Nav.Link href="/Posts">Posts</Nav.Link>
          </Nav>
        </Navbar>



        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Routes> 
          <Route path="/Customers" element={<CustomerList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />
          <Route path="/Users" element={<UserList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />
          <Route path='/Posts' element={<Posts info="Postaukset" tervehdys="Moi!" state={true}></Posts>}></Route>
        </Routes>
      </Router>
      }
    </div>
  );
}

export default App;
