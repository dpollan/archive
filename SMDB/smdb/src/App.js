import React, {useState} from 'react';
import {BrowserRouter, Route, useParams} from 'react-router-dom';
import './App.css';
import './bootstrap.css';

//Import Auth Components
import Login from './components/auth/LogIn.jsx';
import SignUp from './components/auth/SignUp.jsx';

// Import all CRUD Components  

// Movie
import CreateMovie from './components/crud/movie/CreateMovie.jsx';
import ReadMovie from './components/crud/movie/ReadMovie.jsx';
import UpdateMovie from './components/crud/movie/UpdateMovie.jsx';
import DeleteMovie from './components/crud/movie/DeleteMovie.jsx';

// Director
import CreateDirector from './components/crud/director/CreateDirector.jsx';
import ReadDirector from './components/crud/director/ReadDirector.jsx';
import UpdateDirector from './components/crud/director/UpdateDirector.jsx';
import DeleteDirector from './components/crud/director/DeleteDirector.jsx';

// Actor
import CreateActor from './components/crud/actor/CreateActor.jsx';
import ReadActor from './components/crud/actor/ReadActor.jsx';
import UpdateActor from './components/crud/actor/UpdateActor.jsx';
import DeleteActor from './components/crud/actor/DeleteActor.jsx';

//Import navigation Components
import Navbar from './components/nav/Navbar.jsx';
import Error403 from './components/nav/Error403.jsx'
import Home from './components/nav/Home.jsx';
import ItemSelector from './components/nav/ItemSelector.jsx';
import Footer from './components/nav/Footer.jsx';

function App() {

  return (
    <div className="mainContainer">
      <Navbar />
      <BrowserRouter>
        <div className="app">
          
          {/*Login and Nav Routes*/}
          <Route path="/login" component={() => (<Login />)} />
          <Route path="/signUp" component={() => (<SignUp />)} />
          <Route path="/403" component={() => (<Error403 />)} />

          <Route exact path="/" component={() => (<Home />)} />
          <Route path="/home" component={() => (<Home />)} />

          <Route path="/crud/:action" children={<ItemSelector />} />

          <Route path="/selector/:action" children={<ItemSelector />} />

          {/*Movie Routes*/}         
          <Route path="/createMovie" component={() => (<CreateMovie />)} />
          <Route path="/readMovie/:title" children={<ReadMovie />} />
          <Route path="/UpdateMovie/:title" children={<UpdateMovie />} />
          <Route path="/DeleteMovie/:title" children={<DeleteMovie />} />

          {/*Director Routes*/}
          <Route path="/CreateDirector" component={() => (<CreateDirector />)} />
          <Route path="/ReadDirector/:name" children={<ReadDirector />} />
          <Route path="/UpdateDirector/:name" children={<UpdateDirector />} />
          <Route path="/DeleteDirector/:name" children={<DeleteDirector />} />

          {/*Actor Routes*/}
          <Route path="/CreateActor" component={() => <CreateActor />} />
          <Route path="/ReadActor/:name" children={<ReadActor />} />
          <Route path="/UpdateActor/:name" children={<UpdateActor />} />
          <Route path="/DeleteActor/:name" children={<DeleteActor />} />

        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

