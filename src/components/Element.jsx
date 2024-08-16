import React, { useState } from 'react';

export default function ProfileElement({ element, onRename }) {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(element);

    function handleSubmit(event) {
        event.preventDefault();
        setEditMode(false);
        onRename(inputValue);
    }

    return (
        <li className="user-data">
            {!editMode && (
                <a
                    className="user-element"
                    onClick={() => {
                        if (!element.includes('@')) {
                            console.log(element);
                            setEditMode(true)
                        }
                    }}
                >
                    {element}
                </a>
            )}
            {editMode && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
        </li>
    );
}
