import React, { useState } from 'react'; 
import Character from './Character';
import EditToon from './EditToon';
import AddToon from './AddToon';
import SearchName from './SearchName';
import SearchShow from './SearchShow';
import NotFound from './NotFound';


function Welcome() {

  //create initial state
  const initialState = {
    _id: 0,
    first: '',
    last: '',
    sex: 0,
    image: '',
    quotes: [],
    show: '',
    rating: 0
  }

  //set up toonState for top level component
  const [toonState, toonSetState] = useState(initialState);


  //Set up a router state to handle which component to render
  const [router, routerSetState] = useState(
    {component: 0}
  )

  const handleAddClick = (e) => {
    e.preventDefault();
    routerSetState({'component': 1});
  } 

  //function to pass as a property to all other components, returns them to welome page
  const back = () => {
    //reset toonState to initial empty settings
    toonSetState(initialState);
    routerSetState({'component': 0})
  }

  const edit = () => {
    //open the Edit Toon component
    routerSetState({'component': 3})
  }

  if (router.component === 0) {
  return (
    <div className="container">
      <div>
        <h1 className="display-4">Welcome to the Cartoon Database</h1>
      </div>
      <div>
        Select Add toon to add a cartoon to the database.  Search for a cartoon by entering the cartoon's full name.  To find all cartoons in the database for a specific show, change the mode to Show and enter the name of the series in the box provided
      </div>
      <div>
        <form class="form-inline">
          <div>
            <SearchName toonSetState={toonSetState} routerSetState={routerSetState} handleAddClick={handleAddClick} />
          </div>
        </form>
      </div>
    </div>
    )
  } 

  if (router.component === 1) {
    return (
      <div>
        <AddToon back={back}/>
      </div>
    )
  }

  if (router.component === 2) {
    return (
      <div>
        <Character toon={toonState} edit={edit} back={back} />
      </div>
    )
  }

  if (router.component === 3) {
    return (
      <div>
        <EditToon toon={toonState} back={back} /> 
      </div>
    )
  }

  if (router.component === 4) {
    console.log(SearchShow);
  }

  if (router.component === 404) {
    return (
      <div>
        <NotFound back={back} />
      </div>
    )
  }
}
  



export default Welcome;