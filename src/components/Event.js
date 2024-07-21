import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <li>
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button onClick={toggleDetails}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div data-testid="event-details">
                    <h3>About event:</h3>
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
}

export default Event;
