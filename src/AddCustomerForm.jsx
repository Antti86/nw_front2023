import React, { useState } from 'react';
import CustomerService from './Services/customer'

function CustomerForm({setAdding, reload, setreload}) {
  const [formState, setFormState] = useState({
    CustomerId: '',
    CompanyName: '',
    ContactName: '',
    ContactTitle: '',
    Address: '',
    City: '',
    Country: '',
    Region: '',
    PostalCode: '',
    Phone: '',
    Fax: '',
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

  CustomerService.addNew(newCustomer)
  .then(data => alert(data))
  .then(() => setreload(!reload))
  setAdding(false)

}
  return (
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
      <button type="submit">Lähetä</button>
    </form>
  );

}
export default CustomerForm
