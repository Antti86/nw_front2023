
import React, {useState} from "react"
import CustomerService from '../Services/customer'
import ListGroup from 'react-bootstrap/ListGroup';
import '../Styles/Lists&Forms.css';
import EditCustomer from "./EditCustomer";
import Button from 'react-bootstrap/Button';

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
        CustomerService.Remove(cust.customerId)
        .then (data => alert(data))
        .then(() => setreload(!reload))
        .catch (error => alert(error.message))
    }

    return(
        <div >
            <ListGroup.Item className="Item" variant="primary" onClick={() => setshowdetails(!showdetails)}>
            <strong>{customer.companyName}</strong>
                <br />
                {customer.country}
                </ListGroup.Item>
            {showdetails && 
            <div className="Details">

                {editing && <EditCustomer setEditing={setEditing} reload={reload} setreload={setreload} setMessage={setMessage}
                 setIsPositive={setIsPositive} setShowMessage={setShowMessage} customer={customer}></EditCustomer>}

                <table className="tab">
                    <thead>
                        <tr>
                            <th>Yhteyshenkilö</th>
                            <th>Osoite</th>
                            <th>Kaupunki</th>
                            <th>Maa</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                            <td>
                                <Button variant="secondary" className="hidebtn" onClick={() => 
                                    {setshowdetails(!showdetails); setEditing(false)}}>Sulje</Button>
                            </td>
                            <td><Button onClick={() => setEditing(true)}>Muokkaa</Button></td>
                            <td><Button variant="danger" onClick={() => remove(customer)}>Poista</Button></td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
};

export default Customer


