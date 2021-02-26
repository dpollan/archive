import React from 'react';

function SessionData(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 h-100 p-dark text-center">
          Date:<div>{props.date}</div>
        </div>
        <div className="col-3 p-lighten text-center">
          Hours:<div>{props.duration}</div>
        </div>
        <div className="col-3 p-darken text-center">
          Method:<div>{props.method}</div>
        </div>
        <div className="col-3 p-base text-center">
          Notes:<div>{props.notes}</div>
        </div>
      </div>
    </div>
  );
}

export default SessionData;
