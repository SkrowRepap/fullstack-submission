import React from 'react';
import '../App.css';

const Filter = (props) => {
    let data = props.filtered
    return (
    <div>
        <h1> Filter </h1>
            Search: <input className="inline" value={props.filterValue} onChange={props.onFilterChange} />
        
        {data ? 
        data.map((p) => 
            <p key={p.id}>
                {`${p.name} - ${p.number} `}
            </p>)
        : <p>Loading...</p>
        }
    </div>
    )


}

export default Filter;