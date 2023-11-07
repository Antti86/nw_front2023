import React, { useState } from 'react';
import CustomerService from '../Services/customer'
import '../Styles/App.css';
import Button from 'react-bootstrap/Button';

const EditCustomer = ({setEditing, reload, setreload, setMessage, setIsPositive, setShowMessage, customer}) => {

  const [formState, setFormState] = useState({
    CustomerId: customer.customerId,
    CompanyName: customer.companyName,
    ContactName: customer.contactName,
    ContactTitle: customer.contactTitle,
    Address: customer.address,
    City: customer.city,
    Country: customer.country,
    Region: customer.region,
    PostalCode: customer.postalCode,
    Phone: customer.phone,
    Fax: customer.fax,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var newCustomer = {
      customerId: formState.CustomerId.toUpperCase(),
      companyName: formState.CompanyName,
      contactName: formState.ContactName,
      contactTitle: formState.ContactTitle,
      country: formState.Country,
      address: formState.Address,
      city: formState.City,
      region: formState.Region,
      postalCode: formState.PostalCode,
      phone: formState.Phone,
      fax: formState.Fax
  };

  CustomerService.Update(newCustomer)
  .then(response => {
    setMessage(response)
    setIsPositive(true)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
  }, 4000);
  })
  .catch(error => {
    setMessage(error.message)
    setIsPositive(true)
    setShowMessage(true)
        setTimeout(() => {
      setShowMessage(false)
  }, 4000);
  })
  .then(() => setreload(!reload))
  setEditing(false)

}
  return (
    <div className='CustomersForm'>
      <form id="Form" onSubmit={handleSubmit}>
        {Object.entries(formState).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        
        ))}
          <Button variant='success' type="submit">Tallenna</Button>
          <Button variant='danger' onClick={() => setEditing(false)}>Peruuta</Button>
      </form>
    </div>
  );

}
export default EditCustomer
