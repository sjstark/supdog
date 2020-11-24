import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import EventDisplay from './components/EventDisplay';
import NewEventForm from './components/NewEventForm';
import ImageUpload from './components/ImageCropper/ImageInput'

import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route path="/new-event"> <NewEventForm /> </Route>
            <Route path='/image-test'> <ImageUpload aspect={1} /> </Route>
            <Route exact path="/" component={EventDisplay} />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
