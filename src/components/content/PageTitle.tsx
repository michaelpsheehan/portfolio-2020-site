import React from 'react'

interface IProps {
    title: string;
    classes: string;
    underline?: string;
    subtitle?: JSX.Element | null;
}

const PageTitle = ({ title, underline, subtitle, classes = '' }: IProps) => {
    if(!title) return null

    return (
    
        <div className={`c-page-title ${classes}`}>
          <h1 className="c-page-title__title">{title}</h1>
          {underline && <hr className="c-page-title__underline" />}
          {subtitle && <div className="c-page-title__subtitle">{subtitle}</div>}
        </div>
    )

}
export default PageTitle
