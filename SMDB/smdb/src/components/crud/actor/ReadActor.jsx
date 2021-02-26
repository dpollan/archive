import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';
 
function ReadActor(props) {
  //Set up Actor state and initialize every property with an empty string. This allows structure to be read without errors initially before axios requests resolve.  Once the requests come back, we setstate to the values recieved with useEffect hook and an empty array to trigger a one time rerender of the component. 

  const [actor, setActor] = useState([{
    _id: '',
    name: '',
    films: [{title: ''}],
    createdBy: {username: ''},
    modifiedBy: {username: ''}
  }]);

  let {name} = useParams();

  const handleClick = (e) => {
    e.preventDefault();
    let val = e.target.innerHTML;
    let url = '/readMovie/' + val
    window.location=url;
  }

  useEffect(() => {
    Axios.get(`/readActor/${name}`).then((foundActor) => {
      setActor(foundActor.data);
    }).catch((err) => console.error(err))
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="m-2">
          <div className="card-header bg-dark">
            <h1 className="text-white m-0">{actor[0].name}</h1>
          </div>
        </div>
      <div className="card-body bg-light">
        <div className="m-2">
          <h6 className="text-secondary"><strong>Starring In:</strong></h6>
            <ul className="list-unstyled">
              {actor[0].films.map((film, index) => (<li onClick={handleClick} className="h5" key={index}>{film.title}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>   
  )
}

export default ReadActor;
