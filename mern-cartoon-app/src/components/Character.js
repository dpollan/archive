import React, {useState} from 'react'; 
import DeleteConfirm from './DeleteConfirm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faChevronCircleLeft, faUserEdit, faTrashAlt, faMars, faVenus} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronCircleLeft, faUserEdit, faTrashAlt, faMars, faVenus)

function Character(props) {
  const doEdit = () => {
    props.edit();
  };

//Create state for displaying delete confirmation box
const [confirm, confirmSetState] = useState({open: false});

function toggleConfirm() {
  confirmSetState({isOpen: !confirm.isOpen})
}

  return (
    <div>
    {confirm.isOpen && (<DeleteConfirm toggleConfirm={toggleConfirm} back={props.back} first={props.toon.first} last={props.toon.last} _id={props.toon._id} />)}
      <div className="header">
        <h2 className="d-block bg-primary text-light text-center display-1">{props.toon.first + " " + props.toon.last + ""}</h2>
      </div>
      <div className="toonBody">
        <div className="topRow">
          <img className="float-left ml-4 border border-primary" src={props.toon.image} alt=''/>
          <h4 className="display-4 text-primary">{props.toon.first + '\n' + props.toon.last}
          <p className="d-inline display-4 text-primary ml-4">{props.toon.sex ? <FontAwesomeIcon icon={faMars} /> : <FontAwesomeIcon icon={faVenus} /> }</p>
          </h4>
        </div>
        <div className="middleRow">
          <blockquote className="blockquote text-center">
            <p>{'"' + props.toon.quotes[Math.floor(Math.random() * props.toon.quotes.length)] + '"'}</p>
            <footer className="blockquote-footer">{props.toon.first + " " + props.toon.last}</footer>
            <cite>{props.toon.show.title}</cite>
          </blockquote>
        </div>
        <div className="bottomRow">
          <button className="btn btn-primary ml-2" onClick={props.back}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </button>
          <button className="btn btn-primary ml-2" onClick={doEdit}>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
          <button className="btn btn-primary ml-2" onClick={toggleConfirm}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>    
      </div>
    </div>
  )
}

export default Character;
  
