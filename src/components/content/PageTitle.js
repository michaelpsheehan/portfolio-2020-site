import React from 'react'

const PageTitle = ({ title, underline, subtitle, classes = '' }) =>
  title ? (
    <div className={`c-page-title ${classes}`}>
      <h1 className="c-page-title__title">{title}</h1>
      {underline && <hr className="c-page-title__underline" />}
      <div className="c-page-title__subtitle">{subtitle && subtitle}</div>
    </div>
  ) : null
export default PageTitle
