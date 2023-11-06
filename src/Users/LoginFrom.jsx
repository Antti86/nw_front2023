import React, { useState } from 'react';
import UserService from '../Services/user'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styles/Login.css';
import yetAnotherLogin from '../Pictures/yet_another_login.jpg';
import failedLogin from '../Pictures/access_denied.jpg';

const LoginForm = ({setLoggedIn}) => {

  const [showLoginError, setshowLoginError] = useState(false)

  const [formState, setFormState] = useState({
    Käyttäjänimi: '',
    Salasana: '',
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
      username: formState.Käyttäjänimi,
      password: formState.Salasana,
  };

  UserService.Login(credentieals)
  .then(response => {
    if (response.status === 200)
    {
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        setLoggedIn(response.data.userName)
    }
  })
  .catch(() => {
    setshowLoginError(true)
    setLoggedIn("")
        setTimeout(() => {
      setshowLoginError(false)
  }, 4000);
  })

  

}
return (
  <div>
    <div className='Login'>
      <Form id="Form" onSubmit={handleSubmit}>
        {Object.entries(formState).map(([key, value]) => (
          <Form.Group key={key}>
            <Form.Label htmlFor={key}>{key}:</Form.Label>
            <Form.Control

              type={
                key === 'Salasana' ? 'password' :
                key === 'AccessLevelid' ? 'number' :
                'text'}
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          </Form.Group>
        ))}
        <Button type="submit">Kirjaudu</Button>
      </Form>

      <img src={yetAnotherLogin} alt='No login meme' />
    </div>
    <div className='LoginError'>
    {/* <img src={failedLogin} alt='Login error meme' /> */}
      {showLoginError && (
        <img src={failedLogin} alt='Login error meme' />
      )}
    </div>


  </div>

);
}
export default LoginForm
