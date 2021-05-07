import React from 'react'

const Container = ( children : any) => {
    console.log('the thing inside the wrapper === ', children)

    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Container