Feature: Sample Login Page Testing
Scenario: Select options and set fields
    Given user is on sample test page
    When user enters username "username" and password "password"
    When user selects "Option1" from listbox
    And user checks the subscribe checkbox
    And user selects "male" radio button
    
