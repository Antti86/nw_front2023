import React, { useState } from 'react';
import CustomerService from '../Services/customer'
import Button from 'react-bootstrap/Button';
import '../Styles/Lists&Forms.css';

const CustomerForm = ({setAdding, reload, setreload, setMessage, setIsPositive, setShowMessage}) => {

  // Kaikki formissa olevat statit
  const [formState, setFormState] = useState({
    Asiakastunnus: '',
    YrityksenNimi: '',
    Yhteyshenkilö: '',
    Titteli: '',
    Osoite: '',
    Kaupunki: '',
    Maa: '',
    Alue: '',
    Postinumero: '',
    Puhelin: '',
    Faksi: '',
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

    const requiredFields = [
      'Asiakastunnus',
      'YrityksenNimi',
      'Maa',
      'Osoite',
      'Kaupunki'
    ];

    const isAnyFieldEmpty = requiredFields.some((field) => !formState[field]);
    
  if (isAnyFieldEmpty) {
    // Näytetään virheviesti, jos pakollisia kenttiä puuttuu
    setMessage('Täytä kaikki pakolliset kentät.');
    setIsPositive(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  }
  else {
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

  CustomerService.Add(newCustomer)
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
  setAdding(false)
  }

}
  return (
    <div className='Forms'>
      <h3>Lisää uusi asiakas</h3>
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
        <Button variant='danger' onClick={() => setAdding(false)}>Peruuta</Button>
      </form>
    </div>
  );

}
export default CustomerForm
