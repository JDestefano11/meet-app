import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
    test('renders number of events input', () => {
        render(<NumberOfEvents />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
    });

    test('default value of the input field is 32', () => {
        render(<NumberOfEvents />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toHaveValue(32);
    });

    test('value changes when user types in the input', async () => {
        render(<NumberOfEvents setNumberOfEvents={() => { }} />);
        const numberInput = screen.getByRole('spinbutton');
        const user = userEvent.setup();

        await user.type(numberInput, '{backspace}{backspace}10');
        expect(numberInput).toHaveValue(10);
    });
});

describe('<App /> integration', () => {
    test('renders the correct number of events when user changes the number', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NumberOfEventsInput = AppDOM.querySelector('#number-of-events-input');
        await user.type(NumberOfEventsInput, "{backspace}{backspace}10");

        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(10);
        });
    });
});
