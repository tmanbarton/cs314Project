# Sprint 4 - t13 - Penguinz

## Goal
### To allow user to find the optimized path in their trip. To allow user to change the order of each destination in their trip and to highlight places on map. Also collect survey responses about user experience.
## Sprint Leader: 
### Amir Raissi

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
* Complete Modify Trip Epic
* Complete Shorter Trip Epic
* Complete Highlight place epic
* Complete User Experience Epic

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio==0).
* Minimize code smells and duplication.
* Use Single Responsibility Principle.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
The first epic to complete is Modify Trip. This allows the user to make changes to the tour. There are primarily two tasks involved in this epic. The first task is to allow the user to change the order of each destination. To complete this task we need to add a click and drag function for each destination. The second task is to allow the user to reverse the order of tours. We will add a reverse button and clicking on this will reverse the order of destinations from starting location

The second epic to complete is a shorter trip. Adding this function to the website will allow the user to find the most optimized path i.e find the smallest total distance that covers all the destinations in the trip. To complete this task we will create a tour protocol, which sends a request from client to server and then server sends back the most optimized path. We will add a button to display the most optimized path and then the user can decide whether to keep the new tour or not.

The third epic to complete is Highlight Place. This epic allows the user to select a particular destination and have it highlighted with a marker on the map. To complete this epic we need to add an onclick event on each destination, so that when a user clicks on one of them it should highlight both the destination as well as the marker on the map.

The fourth epic is User Experience. This epic focuses on collecting survey responses from people outside the class about their experience using the website. Each team member should collect at least one response from a person outside the class and identify changes to improve the user experience.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *count* |
| Tasks |  23  | *count* | 
| Story Points |  33  | *sum* | 

Past Performance: Based on our team’s metrics from sprint #3, we should be able to complete all our planned epics and tasks. Last sprint our team planned 5 epics, 20, tasks, and 32 story points. As a team we managed to successfully complete all 5 epics, 84 total tasks, and 97 total story points.


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
