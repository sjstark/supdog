import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { clearEvents, loadMoreEvents, loadInitialEvents } from '../../store/event'


import { fetch } from '../../store/csrf'

import EventCard from '../EventCard'
import Footer from '../Footer'

import './EventDisplay.css'

function EventDisplay({ events, view, myEvents }) {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewName, setViewName] = useState('All Events')
  const [loadMore, setLoadMore] = useState(true)

  const changeViewName = async (view) => {

    if (view === null) {
      return setViewName('All Events')
    }
    if (view.startsWith('SEARCH:')) {
      let searchParam = view.slice(7)
      return setViewName(`Search for: ${searchParam}`)
    }
    if (view === 'MY-EVENTS') {
      return setViewName(`Your Created Events`)
    }
    if (view.startsWith('CATEGORY:')) {
      let categoryId = view.slice(9)
      let res = await fetch(`/api/categories/${categoryId}/title`)
      return setViewName(`Category: ${res.data}`)
    }

  }

  useEffect(() => {
    setLoadMore(true)
  }, [events])


  useEffect(() => {
    if (view && view.startsWith('SEARCH:')) {
      return (async () => {
        setIsLoaded(false)
        await dispatch(loadInitialEvents(view))
        await changeViewName(view)
        setIsLoaded(true)
      })()
    }
    else {
      (async () => {
        setIsLoaded(false)
        await dispatch(clearEvents())
        await dispatch(loadMoreEvents(0, 10, view))
        await changeViewName(view)
        setIsLoaded(true)
      })()
    }
  }, [view])

  const getMoreEvents = async (e) => {
    e.stopPropagation();
    setIsLoaded(false)
    let loadedEvents = await dispatch(loadMoreEvents(events.length, 10, view))
    if (~loadedEvents || loadedEvents.length < 10) setLoadMore(false)
    setIsLoaded(true)
  }

  return (
    <div className="event-display-container">
      <h1 className="event-display-title">{viewName}</h1>
      <ul className="event-display-list">
        {isLoaded && (
          <>
            {events.length === 0 && (
              <div style={{ height: '50vh' }}> There are no events for this yet!</div>
            )}
            {events && events
              .map((event) => {

                return (
                  <EventCard key={`event-${event.id}`} event={event} />
                )
              })}
          </>
        )}
      </ul>
      {isLoaded && (
        <>
          {(
            <div className="event-display__show-more-wrapper">
              <div className="event-display__show-more-line" />
              {loadMore && (
                <div className="event-display__show-more-button-wrapper">
                  <div onClick={getMoreEvents} className="button button--primary button--large">Load More Events</div>
                </div>
              )}
              {!loadMore && (
                <div className="event-display__show-more-button-wrapper">
                  <div className="button button--primary button--large button--disabled">All Events Loaded</div>
                </div>
              )}

            </div>
          )}
          <Footer />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({ events: state.events, view: state.view })


export default connect(mapStateToProps)(EventDisplay)
