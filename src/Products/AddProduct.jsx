import React, { useState } from 'react';
import ProductService from '../Services/product'
import Button from 'react-bootstrap/Button';
import '../Styles/Customer.css';


const ProductForm = ({setAdding, reload, setreload, setMessage, setIsPositive, setShowMessage}) => {

  const [formState, setFormState] = useState({
    Tuote: '',
    Toimittajanumero: 0,
    Kategorianumero: 0,
    Määrä_kpl: 0,
    Hinta: 0,
    Hyllyssä: 0,
    Tilauksessa: 0,
    Tilaustaso: 0,
    Poistettu: false,
    Kuvalinkki: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'Tuote',
      'Hinta',
      'Hyllyssä',
      'Määrä_kpl'
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
    var newProduct = {
        productName: formState.Tuote.toUpperCase(),
        supplierId: formState.Toimittajanumero,
        categoryId: formState.Kategorianumero,
        quantityPerUnit: formState.Määrä_kpl,
        unitPrice: formState.Hinta,
        unitsInStock: formState.Hyllyssä,
        unitsOnOrder: formState.Tilauksessa,
        reorderLevel: formState.Tilaustaso,
        discontinued: formState.Poistettu,
        imageLink: formState.Kuvalinkki,
    };

  ProductService.Add(newProduct)
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
    <div className='CustomersForm'>
      <h3>Lisää uusi asiakas</h3>
      <form className='CustomersForm' id="Form" onSubmit={handleSubmit}>
        {Object.entries(formState).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            {key === "Poistettu" ? (
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={value}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={key === "Tuote" || key === "Kuvalinkki" ? "text" : "number"}
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
        <Button variant='success' type="submit">Tallenna</Button>
        <Button variant='danger' onClick={() => setAdding(false)}>Peruuta</Button>
      </form>
    </div>
  );
  

}
export default ProductForm
