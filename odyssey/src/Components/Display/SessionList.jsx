import React from 'react';
import SessionListItem from './SessionListItem';

function SessionList(props) {
  const { sessions, viewItem } = props;

  return (
    <div className="container">
      {sessions.map((session) => (
        <SessionListItem
          key={session._id}
          date={session.date}
          subject={session.subject}
          duration={session.duration}
          title={session.title}
          method={session.method}
          comprehensionRating={session.comprehensionRating}
          satisfactionRating={session.satisfactionRating}
          successRating={session.successRating}
          notes={session.notes}
          strength={session.strength}
          opportunity={session.opportunity}
          viewItem={viewItem}
        />
      ))}
    </div>
  );
}

export default SessionList;
