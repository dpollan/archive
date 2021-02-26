import React from 'react';

function Error403(){
    return (
      <div className="container">
        <div className="card text-center">
          <h1 className="card-header bg-warning">Unauthorized Access</h1>
          <div className="card-body">
            <p>You have attempted to access a page that requires you to sign in.  You may either <a href="/login">sign in</a> to continue or <a href="/signup">Create an account</a> if you do not already have one.</p>
            <p>Any of the <a href='/crud/read'>Read</a> routes can be accessed, however only signed in users may access the <span className='text-info'>Create, Update and Delete</span> routes.</p>
          </div>
        </div>
      </div>
    )
  }

export default Error403;