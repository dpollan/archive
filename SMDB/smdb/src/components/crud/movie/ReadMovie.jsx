import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';

function ReadMovie() {
  //Set up movie state.  We pass empty strings and mirror the structure exactly. This is because if we don't build this structure on the initial render the component will attempt to access properties that are undefined.  
  const [movie, setMovie] = useState([{
    _id: '',
    title: '',
    year: '',
    genre: '',
    director: {name: ''},
    actors: [{name: ''}],
    createdBy: {username: ''},
    modifiedBy: {username: ''},
  }]);

  let {title} = useParams();

  useEffect(() => {
    Axios.get(`/readMovie/${title}`).then((foundMovie) => {
      setMovie(foundMovie.data);
    }).catch((err) => console.error(err))
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let val = e.target.innerHTML;
    let url = e.target.id === 'director' ? '/readDirector/' + val : '/readActor/' + val
    window.location = url;
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="m-2">
          <div className="card-header bg-dark">
            <h1 className="text-white m-0">{movie[0].title}</h1>
            <h6 className="pt-3 text-white m-0">{movie[0].year}</h6>
          </div>
        </div>
        <div className="card-body bg-light">
        <div className="m-2">
          <h6 className="text-secondary"><strong>Genre:</strong></h6>
          <h5>{movie[0].genre}</h5>
          </div>
          <div className="m-2">
          <h6 className="text-secondary"><strong>Directed By:</strong></h6>
          <h5 id="director" onClick={handleClick}>{movie[0].director ? movie[0].director.name : "Director Not Found"}</h5>
          </div>
          <div className="m-4">
          <h6 className="text-secondary"><strong>Starring:</strong></h6>
          <ul className="list-unstyled">
            {movie[0].actors.map((actor, index) => (<li onClick={handleClick} className="h5" key={index}>{actor.name}</li>))}
          </ul>
          </div>
          <div className="text-right">
            <p className="pr-5 text-secondary m-0">created by:</p>
            <p className="pr-5 font-italic">{movie[0].createdBy.username}</p>
            <p className="pr-5 m-0">{movie[0].modifiedBy ? "modified by: " : null}</p>
            <p className="pr-5 font-italic">{movie[0].modifiedBy ? movie[0].modifiedBy.username : null}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadMovie;
