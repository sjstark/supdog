import React, { useState, useEffect } from 'react'

import { fetch } from '../../store/csrf'

import './CategoryBar.css'


//returns an object of {r, g, b} if success, null if not. can take eithe '#a1b2c3' or 'a1b2c3'
const hexToRgb = (hex) => {
  // Use regex to parse r, g, b into result
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// takes hex background color and gets luminence to determine font color
const getFontColor = (backgroundColor) => {
  let color = hexToRgb(backgroundColor)

  let tracker = {}
  for (const key in color) {
    let c = color[key]
    c = c / 255
    if (c <= 0.03928) {
      tracker[key] = c / 12.92
    } else {
      tracker[key] = Math.pow(((c + 0.055) / 1.055), 2.4)
    }
  }
  const L = tracker.r * 0.2126 + tracker.g * 0.7152 + tracker.b * 0.0722

  return L > 0.179 ? '#000000' : '#ffffff'
}

function Category({ icon, title, color }) {
  const fontColor = getFontColor(color)

  return (
    <div className="category-bar__category-wrapper">
      <div className="category-bar__category-bubble" style={{ backgroundColor: color }}>
        <i className={icon} style={{ color: fontColor }} />
      </div>
      <span className="category-bar__category-title">{title}</span>
    </div>
  )
}


export default function CategoryBar() {
  const [categories, setCategories] = useState([])
  const [catLoaded, setCatLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      let res = await fetch('/api/categories')
      let categoriesJSON = res.data

      setCategories(categoriesJSON)
      setCatLoaded(true)
    })()
  }, [])

  return (
    <div className="category-bar">
      <h3 className="category-bar__title">Categories</h3>
      <div className="category-bar__categories">
        {catLoaded &&
          categories.map(category => {
            return (
              <Category key={`category-${category.id}`} icon={category.icon} title={category.title} color={category.color} />
            )
          })
        }
      </div>
    </div>
  )
}
