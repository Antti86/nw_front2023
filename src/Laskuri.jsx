
import React, {useState} from "react";
import './App.css'

const Laskuri = () => 
{

    const [luku, setluku] = useState(0);



    return (
        <div className="laskuri">
            <h3>{luku}</h3>
            <button onClick={() => setluku(luku + 1)}>+</button>
            <button onClick={() => setluku(luku - 1)}>-</button>
            <button onClick={() => setluku(0)}>Reset</button>
        </div>
    )

};

export default Laskuri