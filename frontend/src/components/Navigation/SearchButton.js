import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { changeView } from '../../store/view'

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
    <div onClick={openSearch} className="navbar__search">
      <i className="fas fa-search"></i>
      {showSearchBar && (
        <input type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      )}
    </div>
  )
}
