import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';

// Mock the Event component
jest.mock('../components/Event', () => {
    return function DummyEvent() {
        return <li>Event</li>;
    }
});

describe('<EventList /> component', () => {
    test('has an element with "list" role', () => {
        const { queryByRole } = render(<EventList />);
        expect(queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', () => {
        const events = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        const { getAllByRole } = render(<EventList events={events} />);
        expect(getAllByRole("listitem")).toHaveLength(4);
    });
});
