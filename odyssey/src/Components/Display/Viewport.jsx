import React, { Component } from 'react';
import Landing from '../Nav/Landing';
import SessionList from './SessionList';
import Session from './Session';
import Navbar from '../Nav/Navbar';

export class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'landing',
      sessions: [],
      activeSession: '',
    };
  }
  //TODO: Get individual session formatted correctly on both mobile and browser

  handleNav = () => {
    if (this.state.display === 'list') {
      alert('TODO set up navigation from ' + this.state.display);
    }
    if (this.state.display === 'item') {
      alert('TODO set up navigation from ' + this.state.display);
    }
    if (this.state.display === 'form') {
      alert('TODO set up navigation from ' + this.state.display);
    }
  };

  viewItem = (session) => {
    console.log('calledViewItem');
    this.setState({ display: 'item', activeSession: session });
  };

  fakeAPICall = (fakeProps) => {
    console.log(fakeProps.sessions);
    this.setState({ sessions: fakeProps.sessions, display: 'list' });
    console.log(this.state);
  };

  render() {
    // Begin fake API call, eventually this will be written to state using Axios with lifecycle hooks

    const props = {
      success: true,
      sessions: [
        {
          notes: [
            {
              _id: '5fcac009f2a1c305d5564fc2',
              text: 'You can use ternary operator to conditionally render components based on what gets passed down to props',
            },
            {
              _id: '5fcac019f2a1c305d5564fc3',
              text: 'You can do some other cool react stuff',
            },
          ],
          _id: '5fc99b25c6cd5b0a4925bf5b',
          subject: {
            _id: '5fc99b25c6cd5b0a4925bf5a',
            name: 'React',
            img: '/img/subjects/placeholder.png',
            __v: 0,
          },
          owner: '5fc99b13c6cd5b0a4925bf59',
          date: '11/10',
          duration: 2.5,
          title: 'Adding components with subcomponents that render only under certain conditions',
          method: 1,
          comprehensionRating: 8,
          satisfactionRating: 9,
          successRating: 10,
          __v: 2,
          opportunity: {
            _id: '5fc99b25c6cd5b0a4925bf5d',
            text: 'Create more modular code next time',
          },
          strength: {
            _id: '5fc99b25c6cd5b0a4925bf5c',
            text: 'Understanding component pattern, figured out how to use state to store data in props',
          },
        },
        {
          notes: [],
          _id: '5fcabf77f2a1c305d5564fbf',
          subject: {
            _id: '5fcabf77f2a1c305d5564fbe',
            name: 'JavaScript',
            img: '/img/subjects/placeholder.png',
            __v: 0,
          },
          owner: '5fc99b13c6cd5b0a4925bf59',
          date: '11/10',
          duration: 2.5,
          title: 'Did some JS stuff ',
          method: 1,
          comprehensionRating: 8,
          satisfactionRating: 9,
          successRating: 10,
          __v: 0,
          opportunity: {
            _id: '5fcabf77f2a1c305d5564fc1',
            text: 'mkee lssse tpyos',
          },
          strength: {
            _id: '5fcabf77f2a1c305d5564fc0',
            text: 'wrote clean code',
          },
        },
      ],
    };

    //         --------------------  END FAKE API CALL ---------------------------

    return (
      <div>
        <Navbar handleNav={this.handleNav} screen={this.state.display} />
        {/*Conditionally render the correct component based on display*/}
        {this.state.display === 'landing' ? <Landing fakeAPICall={this.fakeAPICall} fakeProps={props} screen={this.state.display} /> : null}
        {this.state.display === 'list' ? <SessionList sessions={this.state.sessions} viewItem={this.viewItem} /> : null}
        {this.state.display === 'item' ? <Session session={this.state.activeSession} /> : null}
        {this.state.display === 'form' ? null : null}
      </div>
    );
  }
}

export default Viewport;
