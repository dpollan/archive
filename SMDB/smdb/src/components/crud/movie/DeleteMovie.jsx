import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeleteMovie() {

  const [deleteMovie, setDeleteMovie] = useState({title: '', _id: '', createdBy: '', confirmDeleted: false});

  let {title} = useParams();

  useEffect(() => {
    axios.get(`/readMovie/${title}`).then((movieToDelete) => {
      console.log(movieToDelete);
      setDeleteMovie({
        title: movieToDelete.data[0].title,
        _id: movieToDelete.data[0]._id,
        createdBy: movieToDelete.data[0].createdBy.username
      })
    })
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.post('/deleteMovie', {_id: deleteMovie._id}, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}).then((deletedMovie) => {
      setDeleteMovie({title: '', _id: '', createdBy: '', confirmDeleted: true});
    })
  }

  if (localStorage.getItem('username') === deleteMovie.createdBy) {
    return (
      <div className="container">
        <div className="card text-center">
          <div className="card-header text-white bg-danger">
            <h1>WARNING {deleteMovie.createdBy.toUpperCase()}</h1>
            <div className="h3 bg-danger">You are about to delete the movie {" " + deleteMovie.title}</div>
          </div>
        <div className="card-body">
          <form className="form-group">
            <p>This action cannot be undone, once the move is deleted it will be removed from the database.  The actors and directors associated with {deleteMovie.title} will remain in the database however the movie itelf will be completely removed from the database.</p>
          </form>
            <button className="btn btn-outline-danger text-center mr-3" onClick={handleDelete}>Delete Movie</button>
            <button className="btn btn-outline-secondary text-center ml-3" onClick={() => window.location=`/readMovie/${deleteMovie.title}`}>Cancel</button> 
          </div>
        </div>
      </div>
    );
  } else {
    return deleteMovie.confirmDeleted ? (<div className="alert-success">Moive Deleted</div>) : (<h1 className={deleteMovie.createdBy === '' ? 'd-none' : 'd-inline'}>Only the creater of a Movie can delete it</h1>)
  }
}

export default DeleteMovie;