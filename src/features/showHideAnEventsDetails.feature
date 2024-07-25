Feature:Show/Hide Event Details

    Scenario: An event element is collapsed by default
        Given the user is viewing the list of events
        When the event elements are displayed
        Then each event element is collapsed by default, showing only the basic information

    Scenario: Expand an event to see its details
        Given the user is viewing the list of events
        When the user clicks on an event element
        Then the event element should expand, revealing the event details

    Scenario: Collapse an event to hide its details
        Given the user has expanded an event element
        When the user clicks on the expanded event element again
        Then the event element should collapse, hiding the event details