Feature: Filter Events By City
    Scenario: Display all events when no city is searched
        Given the user hasn't searched for any city
        When the user opens the app
        Then the user should see a list of all upcoming events

    Scenario: Display suggestions when searching for a city
        Given the main page is open
        When the user starts typing in the city search box
        Then the user should receive a list of city suggestions that match what they've typed

    Scenario: Select a city from the suggested list
        Given the user was typing "Berlin" in the city textbox and the list of suggested cities is showing
        When the user selects a city (e.g., "Berlin, Germany") from the list
        Then their city should be changed to that city (i.e., "Berlin, Germany") and the user should receive a list of upcoming events in that city