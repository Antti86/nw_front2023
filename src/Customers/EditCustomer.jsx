import React, { useState } from 'react';
import CustomerService from '../Services/customer'
import '../Styles/App.css';
import Button from 'react-bootstrap/Button';

const EditCustomer = ({setEditing, reload, setreload, setMessage, setIsPositive, setShowMessage, customer}) => {

  const [formState, setFormState] = useState({
    Asiakastunnus: customer.customerId,
    YrityksenNimi: customer.companyName,
    Yhteyshenkilö: customer.contactName,
    Titteli: customer.contactTitle,
    Osoite: customer.address,
    Kaupunki: customer.city,
    Maa: customer.country,
    Alue: customer.region,
    Postinumero: customer.postalCode,
    Puhelin: customer.phone,
    Faksi: customer.fax,
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
      customerId: formState.Asiakastunnus.toUpperCase(),
      companyName: formState.YrityksenNimi,
      contactName: formState.Yhteyshenkilö,
      contactTitle: formState.Titteli,
      country: formState.Maa,
      address: formState.Osoite,
      city: formState.Kaupunki,
      region: formState.Alue,
      postalCode: formState.Postinumero,
      phone: formState.Puhelin,
      fax: formState.Faksi,
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
              value={value || ''}
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
