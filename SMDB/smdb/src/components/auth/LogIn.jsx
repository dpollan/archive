import React, {useState} from 'react';
import Axios from 'axios';

function Login () {

  const [login, setLogin] = useState({
    username: '',
    email: ''
  });

  const handleChange = (e) => {
    e.persist();
    const changeField = e.target.id;
    setLogin( (prevState) => {
      prevState[changeField] = e.target.value;
      return {...prevState};
    })
  } 

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('/api/login', login).then((auth) => {
      if (auth.data.token) {
        //make sure we have a token
        localStorage.setItem('token', auth.data.token);
        localStorage.setItem('username', login.username);
        setLogin({username: '', email: ''});
        window.location.href='/';
      } 
    }).catch((err) => {
      setLogin({username: '', email: ''});
      //TODO: display message to the user
      return console.error(err);
    })      
  }
  


  return (
    <div className="login">
      <form onSubmit={() => null} id="loginForm">
        <div className="loginFields">
          <label>Username:
            <input id="username" type="text" value={login.username} onChange={handleChange} />
          </label>
          <label>Email:
            <input id="email" type="text" value={login.email} onChange={handleChange} />
          </label>
          <button onClick={handleSubmit}>Log in</button>       
        </div>
      </form>
    </div>
  )
}

export default Login;