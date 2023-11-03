import React, { useState } from 'react';
import UserService from '../Services/user'

const UserAdd = ({setAdding, reload, setreload, setMessage, setIsPositive, setShowMessage}) => {

  const [formState, setFormState] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
    Phone: '',
    AccessLevelid: 0,
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

    if (formState.Password.length < 8) {
        setMessage("Salasanan on oltava vähintään 8 merkkiä pitkä.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 4000);
        return; 
      }

    var newUser = {
      firstName: formState.FirstName,
      lastName: formState.LastName,
      userName: formState.UserName,
      password: formState.Password,
      phone: formState.Phone,
      accessLevelid: formState.AccessLevelid,
  };

  UserService.addUser(newUser)
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
  return (
    <form id="Form" onSubmit={handleSubmit}>
      {Object.entries(formState).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key}>{key}:</label>
          <input
              type={
                key === 'Password' ? 'password' :
                key === 'AccessLevelid' ? 'number' :
                'text'}
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
export default UserAdd
