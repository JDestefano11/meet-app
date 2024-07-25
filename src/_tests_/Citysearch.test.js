import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/Citysearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';


describe('<CitySearch /> component', () => {
    test('renders text input', () => {
        const { queryByRole } = render(<CitySearch />);
        const cityTextBox = queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const { queryByRole } = render(<CitySearch />);
        const suggestionList = queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const { queryByRole, getByRole } = render(<CitySearch allLocations={[]} />);
        const user = userEvent.setup();
        const cityTextBox = getByRole('textbox');
        await user.click(cityTextBox);

        // Wait for the suggestions to be rendered
        await waitFor(() => {
            const suggestionList = queryByRole('list');
            expect(suggestionList).toBeInTheDocument();
            expect(suggestionList).toHaveClass('suggestions');
        });
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        const { queryByRole, queryAllByRole } = render(<CitySearch allLocations={allLocations} setInfoAlert={() => { }} />);

        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        const suggestions = allLocations ? allLocations.filter((location) => {
            a
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }) : [];

        const suggestionListItems = queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        const { queryByRole, queryAllByRole } = render(
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={() => { }}
                setInfoAlert={() => { }}
            />
        );

        const cityTextBox = queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        const BerlinGermanySuggestion = queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});