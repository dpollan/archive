import React from 'react';
import LogoTitle from '../Display/LogoTitle';
import SessionData from '../Display/SessionData';
import SessionDataSmall from '../Display/SessionDataSmall';
import Ratings from '../Display/Ratings';
import { Row, Col } from 'react-bootstrap';

function Landing(props) {
  return (
    <div className="p-base text-center">
      <button
        onClick={() => {
          props.fakeAPICall(props.fakeProps);
        }}>
        FakeSignIn
      </button>
    </div>
  );
}
export default Landing;
