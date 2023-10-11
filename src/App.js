import logo from './logo.svg';
import './App.css';
import Laskuri from './Laskuri';
import React, {useState} from "react";
import Posts from './Posts';
import CustomerList from './CustomerList';



function App() {

  const [näytäLaskuri, setnäytäLaskuri] = useState(false);

  

  return (
    <div className="App">

      <h1>NorthWind Testi</h1>
      
      <CustomerList></CustomerList>

      {/* {!näytäLaskuri && <button onClick={() => setnäytäLaskuri(true)}>Näytä laskuri!</button>}
      {näytäLaskuri && <button onClick={() => setnäytäLaskuri(false)}>Piilota laskuri!</button>}
      {näytäLaskuri && <Laskuri></Laskuri>}

      <Posts state={näytäLaskuri} tervehdys="sdsdf" info="dsfsdf"></Posts> */}


    </div>
  );
}

export default App;
