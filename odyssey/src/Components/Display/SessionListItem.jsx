import React from 'react';
import LogoTitle from '../Display/LogoTitle';
import SessionData from '../Display/SessionData';
import SessionDataSmall from '../Display/SessionDataSmall';
import Ratings from '../Display/Ratings';
import { Row, Col } from 'react-bootstrap';

function SessionListItem(props) {
  const { notes, subject, owner, date, duration, title, method, comprehensionRating, satisfactionRating, successRating, strength, opportunity, viewItem } = props;
  const session = { notes, subject, owner, date, duration, title, method, comprehensionRating, satisfactionRating, successRating, strength, opportunity };

  const id = props._id;

  // Id will be used to track items for api calls later, it's important to have but not used yet.

  return (
    <div onClick={() => viewItem(session)}>
      <div className="p-base">
        <div className="d-none d-md-block">
          <Row>
            <Col md={8}>
              <LogoTitle title={title} img={'image server setup coming soon subject.img'} />
            </Col>
            <Col md={4}>
              <SessionData date={date} duration={duration} method={method} notes={notes.length} />
            </Col>
          </Row>
          <Ratings success={successRating} satisfaction={satisfactionRating} grasp={comprehensionRating} />
        </div>

        <div className="d-block d-md-none">
          <LogoTitle title={title} img={'image server setup coming soon subject.img'} />
          <SessionDataSmall date={date} duration={duration} method={method} notes={notes.length} />
          <Ratings success={successRating} satisfaction={satisfactionRating} grasp={comprehensionRating} />
        </div>
      </div>
    </div>
  );
}

export default SessionListItem;
