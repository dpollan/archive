import React from 'react';

function SessionDataSmall(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 p-light text-center">
          Date:<div>{props.date}</div>
        </div>
        <div className="col-6 p-base text-center">
          Hours:<div>{props.duration}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 p-dark text-center">
          Method:<div>{props.method}</div>
        </div>
        <div className="col-6 p-darken text-center">
          Notes:<div>{props.notes}</div>
        </div>
      </div>
    </div>
  );
}

export default SessionDataSmall;
