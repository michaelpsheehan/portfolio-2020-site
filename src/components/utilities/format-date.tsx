import React from 'react'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const formatDate = (dateToFormat: Date) => (
  <time>{dateFormat.format(new Date(dateToFormat))}</time>
)

export default formatDate
