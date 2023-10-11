
import React, {useState} from "react"
import CustomerService from './Services/customer'

import './App.css'

const Customer = ({customer}) => 
{

    const [showdetails, setshowdetails] = useState(false);


    return(
        <div >
            <h4 onClick={() => setshowdetails(!showdetails)}>{customer.companyName}</h4>
            {showdetails && 
            <div className="customerDetails">
                <table className="tab">
                    <thead>
                        <tr>
                            <th>Contact Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <button>Edit</button>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                            <button>Delete</button>
                        </tr>
                    </tbody>

                </table>


            </div>
            }

        </div>
    )


};

export default Customer


