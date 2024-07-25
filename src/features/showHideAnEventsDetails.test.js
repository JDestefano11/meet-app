import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the user is viewing the list of events', () => {
        });

        when('the event elements are displayed', () => {
        });

        then('each event element is collapsed by default, showing only the basic information', () => {
        });
    });

    test('Expand an event to see its details', ({ given, when, then }) => {
        given('the user is viewing the list of events', () => {
        });

        when('the user clicks on an event element', () => {
        });

        then('the event element should expand, revealing the event details', () => {
        });
    });

    test('Collapse an event to hide its details', ({ given, when, then }) => {
        given('the user has expanded an event element', () => {
        });

        when('the user clicks on the expanded event element again', () => {
        });

        then('the event element should collapse, hiding the event details', () => {
        });
    });
});
