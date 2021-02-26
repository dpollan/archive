import React from 'react';

function LogoTitle(props) {
  const { title } = props;

  return (
    <div className="row">
      <div className="col-2">
        <img src="http://via.placeholder.com/50x50" alt="hello" className="img-rounded p-darken" />
      </div>
      <div className="col-10">
        <h2 className="base text-center">{title}</h2>
      </div>
    </div>
  );
}

export default LogoTitle;
