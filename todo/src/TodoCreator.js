import React, { useState } from "react";

function TodoCreator({callback}) {

    const [newItemText, setNewItemText] = useState("");

    const updateNewTextValue = (event) => {
        setNewItemText(event.target.value);
    }
    const createNewTodo = () => {
        if(newItemText !== "") {
            callback(newItemText);
            setNewItemText("");
        }
    }
    return (
        <div className="my-1">
            <input 
                className="form-control"
                value={ newItemText }
                onChange={ updateNewTextValue }
                /> 
            <button className="btn btn-primary my-1" onClick={ createNewTodo }>
                Add
            </button>
        </div>
    );
}

export default TodoCreator;