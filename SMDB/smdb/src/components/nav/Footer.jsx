import React from 'react';

function Footer() {
    return (
        <div className="container bg-light">
            <p className={localStorage.getItem('username') ? "btn btn-light text-center" : "d-none"}>Signed in as <span className="badge badge-secondary">{localStorage.getItem('username')}</span></p>
            <p className={!localStorage.getItem('username') ? "btn btn-light" : "d-none"}>Not Signed In <span className="btn badge badge-secondary" onClick={() => window.location='/login'}>Sign In</span> or <span className="btn badge badge-secondary" onClick={() => window.location='/signup'}>Create Account</span></p>
            <p className={localStorage.getItem('username') ? "btn badge badge-secondary float-right mt-2" : "d-none"} onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('username'); window.location='/home'}}>Sign Out</p>
        </div>
    )
}

export default Footer;

