import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';

function ReadDirector(props) {
  //Set up director state and initialize every property with an empty string. This allows structure to be read without errors initially before axios requests resolve.  Once the requests come back, we setstate to the values recieved with useEffect hook and an empty array to trigger a one time rerender of the component. 

  const [director, setDirector] = useState([{
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
    window.location = url;
  }

  useEffect(() => {
    console.log('running');
    Axios.get(`/readDirector/${name}`).then((foundDirector) => {
      setDirector(foundDirector.data);
    }).catch((err) => console.error(err))
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="m-2">
          <div className="card-header bg-dark">
            <h1 className="text-white m-0">{director[0].name}</h1>
          </div>
        </div>
      <div className="card-body bg-light">
        <div className="m-2">
          <h6 className="text-secondary"><strong>Filmography:</strong></h6>
            <ul className="list-unstyled">
              {director[0].films.map((film, index) => (<li onClick={handleClick} className="h5" key={index}>{film.title}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>   
  )
}

export default ReadDirector;
