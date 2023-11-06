
import React, {useState} from "react"
import CustomerService from '../Services/customer'

import '../Styles/App.css';
import EditCustomer from "./EditCustomer";

const Customer = ({customer, reload, setreload, setMessage, setIsPositive, setShowMessage}) => 
{

    const [showdetails, setshowdetails] = useState(false);
    const [editing, setEditing] = useState(false);

    const remove = (cust) => {
        let answer = window.confirm("Poistetaan asiakas: " + cust.companyName)
        if (!answer)
        {
            return
        }
        CustomerService.RemoveCustomer(cust.customerId)
        .then (data => alert(data))
        .then(() => setreload(!reload))
        .catch (error => alert(error.message))
    }


    return(
        <div >
            <h4 onClick={() => setshowdetails(!showdetails)}>{customer.companyName}</h4>
            {showdetails && 
            <div className="customerDetails">
                <button className="hidebtn" onClick={() => setshowdetails(!showdetails)}></button>

                {editing && <EditCustomer setEditing={setEditing} reload={reload} setreload={setreload} setMessage={setMessage}
                 setIsPositive={setIsPositive} setShowMessage={setShowMessage} customer={customer}></EditCustomer>}

                <table className="tab">
                    <thead>
                        <tr>
                            <th>Contact Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <button onClick={() => setEditing(true)}>Edit</button>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                            <button onClick={() => remove(customer)}>Delete</button>
                        </tr>
                    </tbody>

                </table>


            </div>
            }

        </div>
    )


};

export default Customer


