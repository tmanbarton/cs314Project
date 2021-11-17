# Sprint 5 - _t13_ - _Penguinz_

## Goal
To allow the user to find and add places by latitude and longitude combinations. To allow the user to select different background maps. To pick random places from the database and display it when there is no user input in the search bar. To improve UX to help user understand the functions of each button in itinerary.  

## Sprint Leader:

### _Sonu Dileep_

## Definition of Done

- The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
- The design document (`design.md`) is updated.
- The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
- Complete where is, random places, maps, ux epics.

## Policies

### Mobile First Design

- Design for mobile, tablet, laptop, desktop in that order.
- Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code

- Code Climate maintainability of A (technical debt ratio==0).
- Minimize code smells and duplication.
- Use Single Responsibility Principle.

### Test Driven Development

- Write the tests before the code.
- Unit tests are fully automated.
- Code coverage is 70%

### Processes

- Incremental development. No big bangs.
- Main is never broken.
- All pull request builds and tests for Main are successful.
- All dependencies managed using Maven, npm, and WebPack.
- GitHub etiquette is followed always.

## Planned Epics
The first epic to complete is Where is. This allows the user to search and add places to the trip by coordinates, latitude and longitude. The latitude and longitude can be entered in multiple formats and require validation. Once the entered coordinates are validated the map should move the marker to the location and ask the user whether the place needs to be added to the trip. Finally the trip and marker should show additional details about the place using reverse geocoding.

The second epic that we are focusing on is Random places. The search bar finds and shows some random places from the database if there is no user input. 

The third epic to complete is Maps. This allows the user to pick different background maps. Also the selected map will be saved for any future sessions until the user changes it.

The fourth epic is improving UX to help the user identify the function of each button in the itinerary.

## Metrics

| Statistic    | # Planned | # Completed |
| ------------ | --------: | ----------: |
| Epics        |   4       |     N/A |
| Tasks        |   25      |     N/A |
| Story Points |   30      |     N/A |

## Scrums

| Date   | Tasks closed | Tasks in progress | Impediments |
| :----- | :----------- | :---------------- | :---------- |
| _date_ | _#task, ..._ | _#task, ..._      |             |

## Review

### Epics completed

### Epics not completed

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
