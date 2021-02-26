import React from 'react';
import Ratings from './Ratings';

function Session(props) {
  const { session } = props;

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <img src={''} />
          <Ratings success={session.successRating} satisfaction={session.satisfactionRating} grasp={session.comprehensionRating} />
        </div>
        <div className="col-9">{session.title}</div>
      </div>

      <div className="row">
        <h3 className="col">What Went Well</h3>
      </div>
      <div className="row">
        <div className="col">{session.strength.text}</div>
      </div>

      <div className="row">
        <h3 className="col">Ways To Improve</h3>
      </div>
      <div className="row">
        <div className="col">{session.opportunity.text}</div>
      </div>

      {session.notes.map((note, index) => {
        <div className="row">
          <h3 className="col">Note {index + 1}</h3>
        </div>;
        <div className="row">
          <div className="col">{note.text}</div>
        </div>;
      })}
    </div>
  );
}

export default Session;
