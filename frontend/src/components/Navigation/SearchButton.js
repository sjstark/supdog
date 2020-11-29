import React, { useState, useEffect, useRef } from 'react'

import { useDispatch } from 'react-redux'
import { clearEvents } from '../../store/event'

import { changeView } from '../../store/view'

function SearchField({ searchValue, setSearchValue, closeSearch }) {
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  const checkEnter = (e) => {
    e.stopPropagation()

    if (e.key !== 'Enter') return
    closeSearch()
  }

  return (
    <input ref={searchRef} type='text' placeholder="Search for event titles" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyUp={checkEnter} />
  )
}


export default function SearchButton() {
  const dispatch = useDispatch()

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const openSearch = (e) => {
    e.stopPropagation();
    setSearchValue('')
    if (!showSearchBar) {
      setShowSearchBar(true)
    }
  }

  const closeSearch = (e) => {
    setShowSearchBar(false)
  }

  useEffect(() => {
    let timeoutId
    if (searchValue) {
      timeoutId = setTimeout(() => dispatch(changeView(`SEARCH:${searchValue}`)),250)
    } else {
      timeoutId = setTimeout(dispatch(changeView(null)))
    }
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  useEffect(() => {
    if (!showSearchBar) return

    document.addEventListener('click', closeSearch)

    return () => {
      document.removeEventListener('click', closeSearch)

    }
  }, [showSearchBar])



  return (
    <div onClick={openSearch} className={`navbar__search ${showSearchBar ? 'navbar__search--open' : 'navbar__search--closed'}`} >
      <i className="fas fa-search"></i>
      {showSearchBar && (
        <SearchField searchValue={searchValue} setSearchValue={setSearchValue} closeSearch={closeSearch} />
      )}
    </div>
  )
}
