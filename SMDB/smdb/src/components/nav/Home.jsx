import React from 'react';

function Home(){
  return (
    <div className="container">
      <div className="card text-center">
        <h1 className="card-header">Welcome to SMDB</h1>
        <div className="card-body">
          <p>This is a very basic MERN stack example</p>
          <p><a href="/signup">Create an account</a> or <a href="/login">sign in</a> to create, update or delete entries.  Feel free to use <a href="/readMovie">read</a> link to search for movies, actors and directors entered by other users without logging in. Creating an account is easy, you only need to enter your username and email address.</p>
        </div>
      </div>
    </div>
  )
}

export default Home;