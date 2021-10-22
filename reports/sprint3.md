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
| Epics        |       _5_ |     _5_     |
| Tasks        |      _20_ |     _84_    |
| Story Points |      _32_ |       _97_  |

## Scrums

| Date       | Tasks closed             | Tasks in progress                                      | Impediments                            |
| :--------- | :----------------------- | :----------------------------------------------------- | :------------------------------------- |
| _10/04/21_ | _None_                   | _#220, #227, #228, #262_ <br> Sprint 3 plan in general | None                                   |
| _10/06/21_ | _#220, #227, #228, #262_ | _#233, #253, #254, #258_                               | Distance request being sent infinitely |
| _10/11/21_ | _#233, #264, #278, #279, #281, #280, #284, #286, #287, #237, #241, #254, #288, #289_ | _#290, #292, #298, #300, #303, #294, #295_ | Total distance not updating when removing a place. <br> We used the wrong formula to calculate distances. |

## Review

### Epics completed
#### Where am I?
The user is now able to add their current location to the trip. The Web App will prompt the User to allow premission to do this. This epic went fairly smoothly and we ran into very little issues completing it. With this epic completed the User will have an improved trip experience.

#### Distances
The User is now able to see two seperate statistics regarding the distances in their trip. First, they will now be able to easily see the round trip length of all items in the trip. They will also get a chance to see a "running" distance, so that they can tell how far away each place is from eachother. This epic was harder then 'Where am I?' but was still accomplished relatively struggle free.

#### Load Trip
The User is now able to load a privously saved trip into the Web App or a trip they created on a different platform. The Web App only takes CSV and JSON files but then loads them into the trip. Load Trip was one of the harder epics given issues with asyc events. While this epic was completed, there could be some slight tweaks made.

#### Save Trip
The User is now able to save their current trip. They can save the trip as either JSON or CSV to their local file system. This allows for Users to store trips over multiple sessions without losing any of their data. This Epic was also fairly easy, but there was some slightl struggles getting it to work at the start.

#### Name Trip
The User is now able to name their trip. Naming the trip as 2 features: on-load and on-save. On-load, the file name is set to the trip name. On-save the trip name is set to the exported file name. This epic was very easy to complete and did not take much time.

### Epics not completed
- None

## Retrospective

### Things that went well
In terms of things that went well, this sprint everyone contributed and communicated more. Last sprint we barely completed 2 epics and this sprint we completed 5. The team is also communicating a lot more in the Slack channel to keep everyone up to date with current workflow or problems we are incountering. This increase in communication led to the overall increase in productivity and allowed us to finish 1 day before the sprint deadline. 

### Things we need to improve
Although we improved a lot from last Sprint in terms of our productivity and communication, there are still areas we could improve appon as a group. One of these areas is increasing the code coverage of our client tests. Currently we have tests in place that only test if the UI components are avaliable, and not the logic those UI components are responsible for. Testing in Jest is something that's new to all of us and as a team we are working on improving are skills in that department. Compared to last sprint we have improved but we need to continue to improve so we can build better and more complete tests. Another aspect we can improve apon is remaining consistent throughout the entire sprint in terms of productivity. If you take a look at our burndown chart we started out exteremly strong; however, during the middle-end of the sprint we started to fall behind and productivity decreased.   

### One thing we will change next time
Overall sprint 3 has been our most productive yet, however, there is still plenty of room to grow. As a group we did much better when it came to splitting up the epics into tasks and dividing up the work. Although we were able to accomplish much more than last sprint, we continued to fall short of our testing goals for our completed tasks. Some members of the team write more, and better tests than others, given this, our goal for next sprint is to have all team members writing good tests and lots of them.
