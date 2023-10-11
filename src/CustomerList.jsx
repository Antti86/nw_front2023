
import React, {useState, useEffect} from "react"
import CustomerService from './Services/customer'
import CustomerAdd from "./AddCustomer";
import CustomerForm from "./AddCustomerForm";
import './App.css'
import Customer from "./Customer";

const CustomerList = () => 
{

    const [customers, setcustomers] = useState("");
    const [showcustomers, setshowcustomers] = useState(true);

    const [search, setsearch] = useState([])

    const [adding, setAdding] = useState(false)
    const [reload, setreload] = useState(false)

    useEffect(() => 
    {
        CustomerService.GetCustomers(search)
        .then(data => setcustomers(data));

    }, [search, reload])


    return(
        <div className="Customers">
            <h2>Customers</h2>


            {!adding && <button onClick={() => setAdding(true)}>Add new customer</button>}
            {adding && <CustomerForm setAdding={setAdding} reload={reload} setreload={setreload} />}


            <form id="customerForm" onSubmit={(e) => {e.preventDefault(); setsearch(document.getElementById("searchinput").value)}}>
                <label htmlFor="searchinput">Etsi </label>
                <input type="text" id="searchinput" name="search" />
                <button type="submit">Hae asiakkaat</button>
            </form>



            {showcustomers && customers && customers.map(c =>
                <Customer key={c.customerId} customer={c}></Customer>
                )}

        </div>
    )


};

export default CustomerList


