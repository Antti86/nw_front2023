import React, {useState} from "react"
import './App.css'
import CustomerService from './Services/customer'

const CustomerAdd = ({setAdding, reload, setreload}) => {

    // State määritys
  const [CustomerId, setCustomerId] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [ContactName, setContactName] = useState('');
  const [ContactTitle, setContactTitle] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Country, setCountry] = useState('');
  const [Region, setRegion] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [Phone, setPhone] = useState('');
  const [Fax, setFax] = useState('');

  // Formin submitointifunktio
  const submitForm = (event) => {
    event.preventDefault()
    var newCustomer = {
      customerId: CustomerId.toUpperCase(),
      companyName: CompanyName,
      contactName: ContactName,
      contactTitle: ContactTitle,
      country: Country,
      address: Address,
      city: City,
      region: Region,
      postalCode: PostalCode,
      phone: Phone,
      fax: Fax
  }
  
  CustomerService.addNew(newCustomer)
  .then(data => alert(data))
  setreload(!reload)
  setAdding(false)
}

 return(
     <div>
        <h4>Adding new Customer</h4>
        <form onSubmit={submitForm}>
            <input type="text" value={CustomerId} onChange={({target}) => setCustomerId(target.value)} placeholder="ID" />
            <input type="text" value={CompanyName} onChange={({target}) => setCompanyName(target.value)} placeholder="Company name" />
            <input type="text" value={ContactName} onChange={({target}) => setContactName(target.value)} placeholder="Contact name" />
            <input type="text" value={ContactTitle} onChange={({target}) => setContactTitle(target.value)} placeholder="Contact title" />
            <input type="text" value={Address} onChange={({target}) => setAddress(target.value)} placeholder="Address" />
            <input type="text" value={City} onChange={({target}) => setCity(target.value)} placeholder="City" />
            <input type="text" value={Country} onChange={({target}) => setCountry(target.value)} placeholder="Country" />
            <input type="text" value={Region} onChange={({target}) => setRegion(target.value)} placeholder="Region" />
            <input type="text" value={PostalCode} onChange={({target}) => setPostalCode(target.value)} placeholder="Postal code" />
            <input type="text" value={Phone} onChange={({target}) => setPhone(target.value)} placeholder="Phone" />
            <input type="text" value={Fax} onChange={({target}) => setFax(target.value)} placeholder="Fax" />
            <input type="submit" value="Save" />
        </form>      
    </div>
  )
}

export default CustomerAdd