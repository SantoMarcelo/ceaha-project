
Feature: Login
    As a regular user
    I can access the sistem with my credentials
    To see the list of participants
    
    Scenario: User login

        Given I access the main page
        When I login with "eu@papito.io" and pass "abc123"
        Then I have to authenticate

    Scenario: Email not registred

        Given I access the main page
        When I try to login with not registred email
        Then I have to see the alert message "Email e ou senha incorretos."

    Cenario: INcorrect password

        Given I access the main page
         When I try to login with incorrect password
        Then I have to see the alert message "Email e ou senha incorretos."