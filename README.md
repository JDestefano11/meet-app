# EventWave: Features and Scenarios

## Table of Contents
1. [Filter Events By City](#feature-1-filter-events-by-city)
2. [Show/Hide Event Details](#feature-2-showhide-event-details)
3. [Specify Number of Events](#feature-3-specify-number-of-events)
4. [Use the App When Offline](#feature-4-use-the-app-when-offline)
5. [Add an App Shortcut to the Home Screen](#feature-5-add-an-app-shortcut-to-the-home-screen)
6. [Display Charts Visualizing Event Details](#feature-6-display-charts-visualizing-event-details)

## Feature 1: Filter Events By City

### Scenario 1: Display all events when no city is searched
- **Given** the user hasn't searched for any city
- **When** the user opens the app
- **Then** the user should see a list of all upcoming events

### Scenario 2: Display suggestions when searching for a city
- **Given** the main page is open
- **When** the user starts typing in the city search box
- **Then** the user should receive a list of city suggestions that match what they've typed

### Scenario 3: Select a city from the suggested list
- **Given** the user was typing "Berlin" in the city textbox and the list of suggested cities is showing
- **When** the user selects a city (e.g., "Berlin, Germany") from the list
- **Then** their city should be changed to that city (i.e., "Berlin, Germany") and the user should receive a list of upcoming events in that city

## Feature 2: Show/Hide Event Details

### Scenario 1: An event element is collapsed by default
- **Given** the user is viewing the list of events
- **When** the event elements are displayed
- **Then** each event element is collapsed by default, showing only the basic information

### Scenario 2: Expand an event to see its details
- **Given** the user is viewing the list of events
- **When** the user clicks on an event element
- **Then** the event element should expand, revealing the event details

### Scenario 3: Collapse an event to hide its details
- **Given** the user has expanded an event element
- **When** the user clicks on the expanded event element again
- **Then** the event element should collapse, hiding the event details

## Feature 3: Specify Number of Events

### Scenario 1: When user hasn't specified a number, 32 is the default number
- **Given** the user hasn't specified a number of events
- **When** the event list loads
- **Then** 32 events should be displayed by default

### Scenario 2: User can change the number of events displayed
- **Given** the user is viewing the list of events
- **When** the user changes the number of events to be displayed
- **Then** the event list should update to display the specified number of events

## Feature 4: Use the App When Offline

### Scenario 1: Show cached data when there's no internet connection
- **Given** the app has cached data
- **When** the user accesses the app without an internet connection
- **Then** the app should display the events using the cached data

### Scenario 2: Show error when user changes search settings while offline
- **Given** the app is offline
- **When** the user attempts to change search settings (city, time range, etc.)
- **Then** the app should display an error message

## Feature 5: Add an App Shortcut to the Home Screen

### Scenario 1: User can install the meet app as a shortcut on their device home screen
- **Given** the user is accessing the app on a mobile device
- **When** the user selects the "Add to Home Screen" option
- **Then** the app should be installed on the user's home screen as a shortcut

## Feature 6: Display Charts Visualizing Event Details

### Scenario 1: Show a chart with the number of upcoming events in each city
- **Given** the user is viewing the events page
- **When** the page loads
- **Then** a chart should be displayed showing the number of upcoming events in each city
