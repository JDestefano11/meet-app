import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('Event component', () => {
    let eventComponent;
    const testEvent = mockData[0];

    beforeEach(() => {
        eventComponent = render(<Event event={testEvent} />);
    });

    test('shows event title', () => {
        const { queryByText } = eventComponent;
        const titleElement = queryByText(testEvent.summary);
        expect(titleElement).toBeTruthy();
    });

    test('shows event date', () => {
        const { queryByText } = eventComponent;
        const dateElement = queryByText(testEvent.created);
        expect(dateElement).toBeTruthy();
    });

    test('shows event location', () => {
        const { queryByText } = eventComponent;
        const locationElement = queryByText(testEvent.location);
        expect(locationElement).toBeTruthy();
    });

    test('has a show details button', () => {
        const { queryByRole } = eventComponent;
        const button = queryByRole('button', { name: /show details/i });
        expect(button).toBeTruthy();
    });
});
