

import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";


const Filter = (props) => {

    const filterChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        props.setFilter(filter)
    }

    const inputStyle = {
        marginLeft: 15
    }

    return (
        <div>
            <h3 style={{display: 'inline-block'}}>Filter</h3> 
            <input name="filter" style={inputStyle} onChange={filterChange}/>
        </div>
    )
}

const ConnectedFilter = connect(
    null,
    { setFilter }
)(Filter)

export default ConnectedFilter