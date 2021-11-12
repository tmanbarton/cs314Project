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
| Epics | 4 | 4 |
| Tasks |  23  | 105 | 
| Story Points |  33  | 118 | 

Past Performance: Based on our team’s metrics from sprint #3, we should be able to complete all our planned epics and tasks. Last sprint our team planned 5 epics, 20, tasks, and 32 story points. As a team we managed to successfully complete all 5 epics, 84 total tasks, and 97 total story points.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 10/25/2021 | #403 | #406-#482 | None |
| 11/1/2021 | #392, #402, #407, #413, #424, #434, #438, #301, #393, #396, #399, #400, #417, #420, #421, #422, #449, #404, #461, #398, #465, #482 | #483-#543 | Revert Trip, Tour Request  |
| 11/8/2021 | #388, #397, #454, #469, #480, #485, #486, #488, #496, #379, #467, #479, #519, #215, #410, #411, #416, #405, #373, #376, #389, #504, #542, #543 | #545+ | None |


## Review

### Epics completed  
#### Highlight Place
When the user clicks on places in their trip, the application will now highlight that place in CSU gold and pull up the marker on the map! This epic was fairly easy to complete and we didn't really run into issues completing it.

#### Shorter Place
The user can now optimize the distance of an added trip! This epic required a lot of work on both the front-end and back-end of the application. It took the most time out of all the epics to complete and we did run into numerous issues throughout this epic. For the most part it seems to be working, although we will need to further test our tour API to ensure that is the case.

#### Modify Trip
The user can now move places around, and they have fun new commands they use on their trip! This epic was fairly easy to complete but did take the second most time to implement. 

#### User Experience
We each conducted user interviews and made small UI tweaks to improve the experience of users. This epic was fairly easy to complete and we didn't run into any issues completing it.

### Epics not completed 
## None

## Retrospective

### Things that went well
Communication and team contribution was much better this sprint. We also planned fairly well this sprint and made sure we were testing our code as we went along.

### Things we need to improve
 Some of our github eddiqute has been poor (slight changes as pq, failed checks, ect.) but could also be a result of other coding practices. This next sprint we plan on honing in our software skills and providing entire solutions when we make changes.

#### One thing we will change next time
 We will further tighten clean code and TDD in mind while developing. This way we are contributing complete solutions (when not bug finding/error testing) when adding changes.
