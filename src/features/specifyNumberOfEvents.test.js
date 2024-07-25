import { loadFeature, defineFeature } from 'jest-cucumber';

defineFeature(loadFeature('./src/features/specifyNumberOfEvents.feature'), test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user hasn\'t specified a number of events', () => {

        });

        when('the event list loads', () => {

        });

        then('32 events should be displayed by default', () => {

        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
        given('the user is viewing the list of events', () => {

        });

        when('the user changes the number of events to be displayed', () => {

        });

        then('the event list should update to display the specified number of events', () => {

        });
    });
});