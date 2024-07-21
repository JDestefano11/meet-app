import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
        const button = queryByRole('button', { name: 'Show Details' });
        expect(button).toBeTruthy();
    });

    test('details are hidden by default', () => {
        const { queryByTestId } = eventComponent;
        const detailsSection = queryByTestId('event-details');
        expect(detailsSection).not.toBeInTheDocument();
    });

    test('shows details when "Show Details" button is clicked', () => {
        const { getByRole, queryByTestId } = eventComponent;
        const button = getByRole('button', { name: 'Show Details' });
        fireEvent.click(button);
        const detailsSection = queryByTestId('event-details');
        expect(detailsSection).toBeInTheDocument();
    });

    test('hides details when "Hide Details" button is clicked', () => {
        const { getByRole, queryByTestId } = eventComponent;
        const showButton = getByRole('button', { name: 'Show Details' });
        fireEvent.click(showButton);

        const hideButton = getByRole('button', { name: 'Hide Details' });
        fireEvent.click(hideButton);

        const detailsSection = queryByTestId('event-details');
        expect(detailsSection).not.toBeInTheDocument();
    });

    test('toggles button text between "Show Details" and "Hide Details"', () => {
        const { getByRole } = eventComponent;
        const button = getByRole('button', { name: 'Show Details' });

        fireEvent.click(button);
        expect(button).toHaveTextContent('Hide Details');

        fireEvent.click(button);
        expect(button).toHaveTextContent('Show Details');
    });
});
