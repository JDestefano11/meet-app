import React, { useState } from 'react';

const Event = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <li className={`event ${isExpanded ? 'event-expanded' : ''}`}>
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Hide Details' : 'Show Details'}
            </button>
            {isExpanded && (
                <div className="event-details" data-testid="event-details">
                    <h3>About event:</h3>
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
}

export default Event;
