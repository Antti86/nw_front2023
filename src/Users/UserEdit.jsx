import React, { useState } from 'react';
import UserService from '../Services/user'
import Button from 'react-bootstrap/Button';
import '../Styles/Customer.css';


const UserEdit = ({setEditing, reload, setreload, setMessage, setIsPositive, setShowMessage, user}) => {

  const [userId] = useState(user.userId);
  const [formState, setFormState] = useState({
    Etunimi: user.firstName,
    Sukunimi: user.lastName,
    Käyttäjänimi: user.userName,
    Puhelin: user.phone,
    Admin: user.accessLevelid === 1 ? "yes" : "no",
    Salasana: '',
    SalasananVahvistus: '',
  });

  const [passwordMatching, setPasswordMatching] = useState(false);

  const [passwordLength, setpasswordLength] = useState(false);

  //Select valikkoa varten
  const options = [
    { value: 'no', label: 'Ei' },
    { value: 'yes', label: 'Kyllä' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    //Dynaaminen tarkistus salasanan pituudelle ja vahvistukselle
    //Pitää käyttää value ===, Salasana === SalasananVahvistus sijasta, koska setFormState funktio on ilmeisesti async
    //Ja päivitys ei ehdi aina seuraaviin tarkistuksiin
    if (name === 'Salasana' || name === 'SalasananVahvistus') {
      if (value === formState.Salasana || value === formState.SalasananVahvistus) {
        setPasswordMatching(true);
      } else {
        setPasswordMatching(false);
      }
    }
    if (name === 'Salasana') {
      if (value.length > 7) {
        setpasswordLength(true);
      } else {
        setpasswordLength(false);
      }
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordLength || !passwordMatching) {
        setMessage("Salasanan on täytettävä vaatimukset!");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 4000);
        return; 
      }

    var newUser = {
      userId: userId,
      firstName: formState.Etunimi,
      lastName: formState.Sukunimi,
      userName: formState.Käyttäjänimi,
      phone: formState.Puhelin,
      //Admin === 1 ja peruskäyttäjä === 0
      accessLevelid: formState.Admin === "yes" ? 1 : 0,
      password: formState.Salasana
  };

  UserService.Update(newUser)
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
    <h3>Muokkaa käyttäjää</h3>
    <form id="Form" onSubmit={handleSubmit}>
      {Object.entries(formState).map(([key, value]) => (
        <div key={key}>
          {key === "Admin" ? (
            <div>
              <label htmlFor={key}>{key}</label>
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor={key}>
                {key === "SalasananVahvistus" ? "Vahvista Salasana" : key}:
              </label>
              <input
                type={
                  key === 'Salasana' ? 'password' :
                  key === 'SalasananVahvistus' ? 'password' :
                  'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      ))}
      <Button variant='success' type="submit">Tallenna</Button>
      <Button variant='danger' onClick={() => setEditing(false)}>Peruuta</Button>
      <div className='Varoitusteksti'>
       {!passwordMatching && (<label>Vahvista salasana</label>)}
      </div>
      <div className='Varoitusteksti'>
      {!passwordLength && (<label>Salasanan on oltava vähintään 8 merkkiä</label>)}
      </div>
    </form>
  </div>
);

}
export default UserEdit
