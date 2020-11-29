import React from 'react'
import * as formatDate from 'date-format'

export default function DateItem({ date }) {

  let day = formatDate.asString("MM/dd", new Date(date.start))

  let startTimeHour = formatDate.asString("hh", new Date(date.start))
  let startPM = false
  if (parseInt(startTimeHour, 10) > 12) {
    startTimeHour = parseInt(startTimeHour, 10) - 12
    startPM = true;
  }
  let startTimeMinute = formatDate.asString('mm', new Date(date.start))

  let endTimeHour = formatDate.asString("hh", new Date(date.end))
  let endPM = false
  if (parseInt(endTimeHour, 10) > 12) {
    endTimeHour = parseInt(endTimeHour, 10) - 12
    endPM = true;
  }
  let endTimeMinute = formatDate.asString('mm', new Date(date.end))

  return (
    <div className="event-detail__occurance">{`${day} @ ${startTimeHour}:${startTimeMinute}${startPM ? 'PM' : 'AM'} - ${endTimeHour}:${endTimeMinute}${endPM ? 'PM' : 'AM'}`}</div>
  )
}
