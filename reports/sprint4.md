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
| Tasks |  23  | 62 | 
| Story Points |  33  | 79 | 

Past Performance: Based on our team’s metrics from sprint #3, we should be able to complete all our planned epics and tasks. Last sprint our team planned 5 epics, 20, tasks, and 32 story points. As a team we managed to successfully complete all 5 epics, 84 total tasks, and 97 total story points.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 10/25/2021 | #403 | *#task, ...* | None |
| 11/1/2021 | #392, #402, #407, #413, #424, #434, #438, #301, #393, #396, #399, #400, #417, #420, #421, #422, #449, #404, #461, #398, #465, #482 | *#task, ...* |  |
| 11/8/2021 | #388, #397, #454, #469, #480, #485, #486, #488, #496, #379, #467, #479, #519, #215, #410, #411, #416, #405, #373, #376, #389, #504, #542, #543 | *#task, ...* |  |


## Review

### Epics completed
#### Modify Trip
The places in the itinerary can now be dragged using drag handles, allowing the user to modify the trip as they wish. We used the SortableContainer react component to implement this. We also addded some progressive disclosure for the items in the list. They now only show the beginning of the address of the place, and when the user clicks on that place it expands to shows the full address and the distance.

#### Shorter Trip
In this epic we were able to complete nearest neighbor and 2-opt. The user can load very large trips and we do as much optimization as we can in the given time limit. 

#### Highlight Place
The user can now select a place in the itinerary, and the marker to that place on the map. The item selected also gets highlighted in the list of places in the itinerary to further notify the user that it has been selected. This epic was fairly easy. The whole epic was completed in one day.

#### User Experience
Every member in the team did the same user test with someone and we had a meeting to decide what tasks to make. We all found from our users that the icons didn't convey their intended meanings as well as we hoped. There was also some confusion with saving trips, loading trips, and saving changes to a modified trips. Our biggest takeaways were our use of icons. We have changed some icons and put words next to others in a dropdown. There will also be tooltips for the ones not in a dropdown. Since the changes were mostly to icons and wording, this epic was pretty easy and quick.

### Epics not completed 
None

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
