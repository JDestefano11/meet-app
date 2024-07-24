import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../mock-data';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('Display all events when no city is searched', ({ given, when, then }) => {
        let AppComponent;

        given('the user hasn\'t searched for any city', () => {
        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see a list of all upcoming events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });


    test('Display suggestions when searching for a city', ({ given, when, then }) => {
        let AppComponent;

        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        let CitySearchDOM;
        when('the user starts typing in the city search box', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });


        then('the user should receive a list of city suggestions that match what they\'ve typed', () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });
    });



    test('Select a city from the suggested list', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let citySearchInput;
        let suggestionListItems;

        given('the user was typing "Berlin" in the city textbox and the list of suggested cities is showing', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., "Berlin, Germany") from the list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city (i.e., "Berlin, Germany") and the user should receive a list of upcoming events in that city', async () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');

        });
    });
});
