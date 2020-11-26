import React, { useState, useEffect, useRef } from 'react'

import { useDispatch } from 'react-redux'

import { changeView } from '../../store/view'

function SearchField({ searchValue, setSearchValue }) {
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  return (
    <input ref={searchRef} type='text' placeholder="Search for event titles" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
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

  useEffect(() => {
    if (searchValue) {
      dispatch(changeView(`SEARCH:${searchValue}`))
    } else {
      dispatch(changeView(null))
    }
  }, [searchValue])

  useEffect(() => {
    if (!showSearchBar) return


    const closeSearch = (e) => {
      setShowSearchBar(false)
    }

    document.addEventListener('click', closeSearch)

    return () => {
      document.removeEventListener('click', closeSearch)
    }
  }, [showSearchBar])

  return (
    <div onClick={openSearch} className={`navbar__search ${showSearchBar ? 'navbar__search--open' : 'navbar__search--closed'}`}>
      <i className="fas fa-search"></i>
      {showSearchBar && (
        <SearchField searchValue={searchValue} setSearchValue={setSearchValue} />
      )}
    </div>
  )
}
