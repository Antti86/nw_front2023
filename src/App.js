
import './App.css';
import React, {useState} from "react";
import CustomerList from './Customers/CustomerList';
import Message from './Message'
import Posts from './Posts';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


function App() {

  // const [näytäLaskuri, setnäytäLaskuri] = useState(false);

    // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  return (
    <div className="App">
      <Router> {/* Lisätty Router-ympärille */}
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="/Customers">Customers</Nav.Link>
            <Nav.Link href="/Posts">Posts</Nav.Link>
          </Nav>
        </Navbar>

        <h1>NorthWind Testi</h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Routes> {/* Käytetään Routes-komponenttia */}
          <Route path="/Customers" element={<CustomerList setShowMessage={setShowMessage} setMessage={setMessage} setIsPositive={setIsPositive} />} />
          <Route path='/Posts' element={<Posts info="Postaukset" tervehdys="Moi!" state={true}></Posts>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
