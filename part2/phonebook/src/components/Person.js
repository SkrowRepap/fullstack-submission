import React from 'react';


const Person = (props) => {

    return (
        <p className="inline">
            {`${props.name} - ${props.number}`}
        </p>
    )
}

export default Person