# Sprint 3 - _T13_ - _Penguinz_

## Goal

### _To allow users to add their current location to the trip. To inform users the distance of their trip and to allow users to export/load their trips to our platform._

## Sprint Leader:

### _William (Bill) Price_

## Definition of Done

- The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
- The design document (`design.md`) is updated.
- The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
- Complete Where Am I? Epic.
- Complete Distance Epic.
- Complete Load Trip Epic.
- Complete Save Trip Epic.
- Complete Trip Name Epic.

## Policies

### Mobile First Design

- Design for mobile, tablet, laptop, desktop in that order.
- Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code

- Code Climate maintainability of A.
- Minimize code smells and duplication.

### Test Driven Development

- Write the tests before the code.
- Unit tests are fully automated.

### Processes

- Main is never broken.
- All pull request builds and tests for Main are successful.
- All dependencies managed using Maven, npm, and WebPack.
- GitHub etiquette is followed always.

## Planned Epics

The first Epic to complete is named, "Where Am I?". This epic enhances our current Home button to actually locate the user, instead of using the Oval as the home location. In order to complete this epic we will need to change the current onClick method for the Home button to locate the user in browser.

The second Epic to complete is named, "Distances". This epic calculates the place by place distance of all the places in the user's trip. We will need to implement the Distance Protocol in order to recieve a distance request from the client and to recieve the response of the distances from the server. We will then take these distances and display them to the user as a running total for each place in their trip. At the bottom of their trip they will see the total distance for their trip.

The third Epic to complete is "Load Trip". This epic lets users load a previously saved trip that is stored locally. Supported options for loading trips will be CSV and JSON objects. We will have a button that opens a modal with an option to load a saved trip. This will have a similar look and feel to our interoperabililty modal.

The fourth Epic to complete is "Save Trip". This epic lets users save trips in local storage that they have made. We will utilize the same modal that the load trip option is on for the save trip feature. There will be options for saving the trips as a CSV or JSON object.

The fifth Epic we have planned it "Trip Name". This epic allows users to customize the name of their trips. We will change the title of the trip to an input box to allow the user to click in and change the name directly on the page.

## Metrics

| Statistic    | # Planned | # Completed |
| ------------ | --------: | ----------: |
| Epics        |       _5_ |     _count_ |
| Tasks        |      _20_ |     _count_ |
| Story Points |      _32_ |       _sum_ |

## Scrums

| Date       | Tasks closed             | Tasks in progress                                      | Impediments                            |
| :--------- | :----------------------- | :----------------------------------------------------- | :------------------------------------- |
| _10/04/21_ | _None_                   | _#220, #227, #228, #262_ <br> Sprint 3 plan in general | None                                   |
| _10/06/21_ | _#220, #227, #228, #262_ | _#233, #253, #254, #258_                               | Distance request being sent infinitely |

## Review

### Epics completed

### Epics not completed

## Retrospective

### Things that went well

### Things we need to improve

### One thing we will change next time
