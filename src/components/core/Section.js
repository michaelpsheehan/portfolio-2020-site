import React from 'react'

const Section = ({ content, container, classes = '' }) =>
  container ? (
    <section className={`c-section ${classes}`}>
      <div className="container">{content}</div>
    </section>
  ) : (
    <section className={`c-section ${classes}`}>{content}</section>
  )
export default Section
