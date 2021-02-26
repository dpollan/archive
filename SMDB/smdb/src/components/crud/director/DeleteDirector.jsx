import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function DeleteDirector() {

  const [deleteDirector, setDeleteDirector] = useState({name: '', _id: '', createdBy: '', confirmDeleted: false});

  let {name} = useParams();

  useEffect(() => {
    
    axios.get(`/readDirector/${name}`).then((directorToDelete) => {
      setDeleteDirector({
        name: directorToDelete.data[0].name,
        _id: directorToDelete.data[0]._id,
        createdBy: directorToDelete.data[0].createdBy.username
      })
    })
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.post('/deleteDirector', {_id: deleteDirector._id}, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}).then((deletedDirector) => {
      setDeleteDirector({name: '', _id: '', createdBy: '', confirmDeleted: true});
    })
  }

  if (localStorage.getItem('username') === deleteDirector.createdBy) {
    return (
      <div className="container">
        <div className="card text-center">
          <div className="card-header text-white bg-danger">
            <h1>WARNING {deleteDirector.createdBy.toUpperCase()}</h1>
            <div className="h3 bg-danger">You are about to delete the director {" " + deleteDirector.name}</div>
          </div>
        <div className="card-body">
          <form className="form-group">
            <p>This action cannot be undone, once the director is deleted they will be removed from the database.  The movies associated with {deleteDirector.name} will remain in the database but will not show a director.</p>
          </form>
            <button className="btn btn-outline-danger text-center mr-3" onClick={handleDelete}>Delete Director</button>
            <button className="btn btn-outline-secondary text-center ml-3" onClick={() => window.location=`/readDirector/${deleteDirector.name}`}>Cancel</button> 
          </div>
        </div>
      </div>
    );
  } else {
    return deleteDirector.confirmDeleted ? (<div className="alert-success">Director Deleted</div>) : (<h1>Only the creater of a director can delete them</h1>)
  }
}


export default DeleteDirector;