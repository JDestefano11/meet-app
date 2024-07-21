import React from 'react';

const Event = ({ event }) => {
    return (
        <li>
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button>Show Details</button>
        </li>
    );
}

export default Event;
