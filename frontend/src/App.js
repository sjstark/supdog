import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import EventDisplay from './components/EventDisplay';
import EventDetails from './components/EventDetails';
import NewEventForm from './components/NewEventForm';
import CategoryBar from './components/CategoryBar';
import TicketsDisplay from './components/TicketsDisplay';

import { restoreUser } from './store/session';
import { loadMoreEvents } from './store/event';

function App({view}) {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(loadMoreEvents(0, 10, view)))
      .then(() => setIsLoaded(true))
  }, [dispatch])


  /*

  Base level components
  - NavBar - Navigation links for home (logo), search, login, signup, and profile options
  - CatBar - Navigation links for categories, a list of category icons and titles
  - Events Display - The main content of the page.
    - All Events View
    - Search Events View
    - Category Events View
    - Create Event View
    - Tickets View


  */
  return (
    <div className="main-wrapper">
      <Navigation isLoaded={isLoaded} />
      <CategoryBar isLoaded={isLoaded} />

      <div className="main-content-wrapper">
        {isLoaded && (

          <Switch>
            <Route path="/events/:eventId/edit"><NewEventForm /></Route>
            <Route path="/events/:id"> <EventDetails /></Route>
            <Route path="/new-event"> <NewEventForm /> </Route>
            <Route path="/my-tickets"><TicketsDisplay /></Route>
            <Route path="/my-events"><EventDisplay myEvents={true} /></Route>
            <Route path="/"> <EventDisplay myEvents={false} /> </Route>
          </Switch>

        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({ events: state.events, view: state.view })


export default connect(mapStateToProps)(App);
