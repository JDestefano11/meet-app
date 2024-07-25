import React, { useState } from 'react';

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
    const [number, setNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value);

        if (value < 1 || value > 32 || isNaN(value)) {
            setErrorAlert("Please enter a number between 1 and 32");
        } else {
            setErrorAlert("");
            setNumberOfEvents(Number(value));
        }
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events:</label>
            <input
                type="number"
                id="number-of-events-input"
                value={number}
                onChange={handleInputChanged}
            />
        </div>
    );
};

export default NumberOfEvents;
