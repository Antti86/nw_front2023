import React, { useState } from 'react';
import UserService from '../Services/user'

const LoginForm = ({setLoggedIn, setMessage, setIsPositive, setShowMessage}) => {

  const [formState, setFormState] = useState({
    UserName: '',
    Password: '',
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

    var credentieals = {
      username: formState.UserName,
      password: formState.Password,
  };

  UserService.Login(credentieals)
  .then(response => {
    if (response.status === 200)
    {
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        setMessage(`Logged in as: ${credentieals.username}`)
        setIsPositive(true)
        setShowMessage(true)
        setLoggedIn(response.data.userName)

        setTimeout(() => {
          setShowMessage(false)
      }, 4000);
    }

  })
  .catch(error => {
    setMessage(error.message)
    setIsPositive(true)
    setShowMessage(true)
        setTimeout(() => {
      setShowMessage(false)
      setLoggedIn("")
  }, 4000);
  })

  

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
export default LoginForm
