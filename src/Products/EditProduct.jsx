import React, { useState } from 'react';
import ProductService from '../Services/product'
import '../Styles/App.css';
import Button from 'react-bootstrap/Button';

const EditProduct = ({setEditing, reload, setreload, setMessage, setIsPositive, setShowMessage, product}) => {

  const [formState, setFormState] = useState({
    Tuote: product.productName,
    Toimittajanumero: product.supplierId,
    Kategorianumero: product.categoryId,
    Määrä_kpl: product.quantityPerUnit,
    Hinta: product.unitPrice,
    Hyllyssä: product.unitsInStock,
    Tilauksessa: product.unitsOnOrder,
    Tilaustaso: product.reorderLevel,
    Poistettu: product.discontinued,
    Kuvalinkki: product.imageLink
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);
    setFormState((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var newProduct = {
      productId: product.productId,
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

  ProductService.Update(newProduct)
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
        <Button variant='danger' onClick={() => setEditing(false)}>Peruuta</Button>
      </form>
    </div>
  );

}
export default EditProduct
