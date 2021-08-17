import React from 'react'

const Container = ( children : React.ReactNode) => {

    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Container