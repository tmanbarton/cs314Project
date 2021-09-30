# Sprint 2 - *T13* - *Penguinz*

## Goal
### *Find places to go. Ensure interoperability.*

## Sprint Leader: 
### *Andy Hantke*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
* The Find places epic is complete, along with each of its related tasks
* The interoperability epic is complete, along with each of its related tasks.

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
Find Places - This epic allows the user to search for a place and add it their trip. This means we will have to fully implement the 'Find Protocol' on our server, so that we are able to query our database against the match term. In addition to the backend changes we will also need to implement a new Search component on the front end so the user can interact with our find API.

Interoperability - This epic allows the user to switch servers and continue using the website. For this epic we plan on implementing a dropdown menu populated with the servers the user can switch to. Once the user makes a selection in the dropdown their server will be changed to their selection and they will be prompted with a modal window, that informs them about the available features on that server. If our front end supports a feature, but the server does not, we plan on disabling parts of the front end to reflect that.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *2* | *2* |
| Tasks |  *10*  | *84* | 
| Story Points |  *31*  | *102* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *9/14/21* | *none* | *#80, #81* | Trying to split epics into tasks | 
| *9/21/21* | *#86-167* | *#168,133* <br> Trying to get all surface level changes done for class 9/22/21 | Front end knowledge |
| *9/29/21* | *#161,163,168,174,177,183,186,189,191* | *#193,199* | Our changes to some of the components have broken the jest tests <br> Dev enviornments | 

## Review

### Epics completed
* Find Places
* Interoperability

### Epics not completed
* None

## Retrospective

### Things that went well
During this sprint there were a multiple parts of the process that went well. To start, we completed both planned epics for this sprint, find places, and interoperability. In executing these two epics we created a RESTful API to query the database as well as constructed a UI with UX in mind. Communication between team members has remained respectful and we continue to listen to each others ideas. As a team, we are begining to understand each others strengths and weaknesses in order to work more efficently.

### Things we need to improve
In terms of improvement, we should begin planning for the next sprint as soon as the current sprint ends. This is something that we did not do, which caused our planning process to be rushed/half-baked. We also plan to be more ambitious in selecting the amount of epics to complete during the sprint, since we only made a goal of 2. Our group also needs to do a better job of taking initiative on an individual level. Group members need to be able to assign themselves tasks in order to complete the planned epics. There should be no point during the sprint process where a group member is not actively working on a task. 

### One thing we will change next time
For the next sprint we will begin our planning process earlier in order to ensure our plan is well-thought out and complete. This will not only help with the overall organization of the sprint but will also allow us to take on more epics. 
