import React from "react";

const Form = (props) => {

    return (
    <form onSubmit={props.onSubmit}>
        <div>
                Name: <input value={props.personValue} onChange={props.onPersonChange} required="required" />
        </div>
        <div>
                Number: <input value={props.numberValue} onChange={props.onNumberChange} required="required"/>
        </div>
        <div>
            <button name="submit" type="submit">add</button>
        </div>
    </form>
    )
}


export default Form;