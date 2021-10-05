# Sprint 3 - *T13* - *Penguinz*

## Goal
### *To allow users to add their current location to the trip. To inform users the distance of their trip and to allow users to export/load their trips to our platform.*

## Sprint Leader: 
### *William (Bill) Price*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
* Complete Where Am I? Epic.
* Complete Distance Epic.
* Complete Load Trip Epic.
* Complete Save Trip Epic.
* Complete Trip Name Epic.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
The first Epic to complete is named, "Where Am I?". This epic enhances our current Home button to actually locate the user, instead of using the Oval as the home location. In order to complete this epic we will need to change the current onClick method for the Home button to locate the user in browser.

The second Epic to complete is named, "Distances". This epic calculates the place by place distance of all the places in the user's trip. We will need to implement the Distance Protocol in order to recieve a distance request from the client and to recieve the response of the distances from the server. We will then take these distances and display them to the user as a running total for each place in their trip. At the bottom of their trip they will see the total distance for their trip.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *count* | *count* |
| Tasks |  *count*   | *count* | 
| Story Points |  *sum*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 


## Review

### Epics completed  

### Epics not completed 

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
