

import React from "react";
import '../App.css';

const Notify = ({contactName, tag, message}) => {
    if (tag === null)
        return <div></div>
    
    if (tag === "Success") {
        return (
            <div className="notification success">
                {`${contactName} ${message}`}
            </div>
        )
    }

    if (tag === "Error") {
        return (
            <div className="notification">
                <p className="error"> {contactName} {message} </p>
            </div>
        )
    }
    
}

export default Notify;