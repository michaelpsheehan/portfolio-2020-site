import React from 'react'

const PageTitle = ({ title, classes = '' }) =>
  title ? (
    <>
      <h1 className={`c-page-title ${classes}`}>{title}</h1>
      <hr className="c-page-title__underline" />
      {/* <div className="c-page-title__underline">underline</div> */}
    </>
  ) : null
export default PageTitle
