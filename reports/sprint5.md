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
| Epics        |         4 |         4   |
| Tasks        |        25 |         51  |
| Story Points |        30 |         71  |

## Scrums

| Date       | Tasks closed                 | Tasks in progress                                        | Impediments              |
| :--------- | :--------------------------- | :------------------------------------------------------- | :----------------------- |
| _11-15-21_ | _NA_                         | _#599,#606,#607,#616,#617,#624,#625,#629_                | Speeding up Tour Request |
| _11-29-21_ | _#594-598, #604, #638, #642_ | _#560,#613,#618,#621,#631,#635,#636,#646,#652,#654,#659_ | Map zoom and center      |
| _12-6-21_  | _#603,#641,#674_             | _#675, #667_                                             | None                     |

## Review

### Epics completed

- Where is
  - Allows the user to search by lat/lng. The input can be inserted in different ways and is validated before the query happens. Overall, this epic was fairly easy for the team to complete.
  
- Random Places
  - Allows the user to search for random places. This feature is moreso for fun then it is for functionality-- although does provide the user with a potentially useful interaction. This epic was also fairly easy to complete.

- Maps
  - Allows the user to pick different maps, as well as improving the map functionality. This epic was slightly harder then the other due to the poor leaflet docs and version issues. 

- UX
  - Small interface and interaction tweaks to improve the users experience on our application. This epic was fairly easy but required lots of research and information in order to complete.

### Epics not completed

We completed all planned epics.

## Retrospective

### Things that went well
Overall, sprint 5 went smoothly. We accomplished everything we had planned. One of our main focuses this sprint was UX. We had ongoing UX throughout the sprint, 
addressing issues as they were discovered. Through this process we were able to refine the UI so that it is as accessible and user friendly as possible.
Although we may have gotten more done in sprint 4, the value of what we accomplished this time around is just as important.

### Things we need to improve
One thing that fell off a bit this sprint was communication. Keeping communication constant and frequent is imperative.

### One thing we will change next time
Next time around our team would focus more on testing and clean code. Although we did test and create clean code, our main focus was on UI. Our UI turned out great, but we could have devoted more time to testing and such.
