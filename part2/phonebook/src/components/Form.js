import React from "react";

const Form = (props) => {

    return (
    <form onSubmit={props.onSubmit}>
        <div>
                name: <input value={props.personValue} onChange={props.onPersonChange} />
        </div>
        <div>
                number: <input value={props.numberValue} onChange={props.onNumberChange} />
        </div>
        <div>
            <button name="submit" type="submit">add</button>
        </div>
    </form>
    )
}


export default Form;