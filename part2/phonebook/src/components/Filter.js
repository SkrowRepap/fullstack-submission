import React from 'react';
import '../App.css';

const Filter = (props) => {
    return (
    <div>
        <h1> Filter </h1>
        <form onSubmit={props.onSubmit}>
            search: <input className="inline" value={props.filterValue} onChange={props.onFilterChange} />
            <button type="submit" className="inline">Search</button>
        </form>
        <h2>Results</h2>
        {props.filtered.map((p) => 
            <p key={p.id}>
                {`${p.name} - ${p.number} `}
            </p>
        )}
    </div>
    )


}

export default Filter;