import React, {useState} from 'react';
import Axios from 'axios';

function SignUp() {
    
  const [user, setUser] = useState({
    username: '',
    email: ''
  })

  function handleChange(e) {
    e.persist();
    const changeField = e.target.id;
    setUser( (prevState) => {
      prevState[changeField] = e.target.value;
      return {...prevState};
    })
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    Axios.post('/api/signup', user).then( (createdUser) => {
      if (createdUser.data.username) {
        //If we created a new user, sign them in and send them home

        Axios.post('/api/login', user).then((auth) => {
          if (auth.data.token) {
            //make sure we have a token
            localStorage.setItem('token', auth.data.token);
            localStorage.setItem('username', user.username);
          } 
        }).catch((err) => {
          setUser({username: '', email: ''});
          //TODO: display message to the user
          return console.error(err);
        }) 
        setTimeout(() => window.location.href='/', 400);
      }
      if (createdUser.data.msg) {
        //TODO handle message to user
        console.log(createdUser.data.msg);
      }
    }).catch((err) => {
      setUser({username: '', email: ''}); 
      console.error(err);
    })
  }


  return (
    <div className="login">
      <form onSubmit={() => null} id="signUpForm">
        <div className="signUpFields">
          <label>Username:
            <input id="username" type="text" value={user.username} onChange={handleChange} />
          </label>
          <label>Email:
            <input id="email" type="text" value={user.email} onChange={handleChange} />
          </label>       
          <a href="/home" onClick={handleSubmit}>Sign Up</a>
        </div>
      </form>
    </div>
  )    
}

export default SignUp;