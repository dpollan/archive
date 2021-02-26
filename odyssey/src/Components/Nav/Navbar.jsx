import React from 'react';

function Navbar(props) {
  let { screen, handleNav } = props;
  return (
    <div className="p-dark text-center">
      <img className="img-rounded text-center my-2" src="http://via.placeholder.com/90x90" />
      <div className="container">
        <div className="row">
          <div className="col-4 text-left" onClick={() => handleNav(screen)}>
            {screen == 'list' ? 'Add' : screen == 'item' ? 'Edit' : screen == 'form' ? 'Save' : null}
          </div>
          <div className="col-4 text-center" onClick={() => handleNav(screen)}>
            {screen == 'list' ? 'Subject' : screen == 'item' ? 'Delete' : screen == 'form' ? 'Cancel' : null}
          </div>
          <div className="col-4 text-right" onClick={() => handleNav(screen)}>
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
