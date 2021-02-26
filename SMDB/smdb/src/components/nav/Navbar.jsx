import React from 'react';

//TODO: Implement a dropdown menu using bootstrap for each of the crud operations allowing the user to select to perform that operation on movies, directors or actors.  Also a title and image need to be added to the navbar.

function Navbar () {
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
        <a className="navbar-brand">
          <img src="/logo.png"></img>
        </a>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link btn-light" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn-light align-text-bottom" href="/crud/create">Create</a>
            </li>
            <li>
              <a className="nav-link btn-light" href="/crud/read">Read</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn-light" href="/crud/update">Update</a>
            </li>
            <li className="nav-item btn-light">
              <a className="nav-link" href="/crud/delete">Delete</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar