Feature:Specify Number of Events

    Scenario: When user hasn't specified a number, 32 is the default number
        Given the user hasn't specified a number of events
        When the event list loads
        Then 32 events should be displayed by default

    Scenario:User can change the number of events displayed
        Given the user is viewing the list of events
        When the user changes the number of events to be displayed
        Then the event list should update to display the specified number of events