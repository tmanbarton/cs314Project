# Inspection - Team _T13_

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|           | Details                       |
| --------- | ----------------------------- |
| Subject   | _Footer.js. Entire Componet._ |
| Meeting   | _10/14/21 5pm on Teams_       |
| Checklist | _checklist.md_                |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---------------- |
| Amir | 1h30min          |
| Bill | 45 min           |
| Andy | 1 hr             |
| Tyler| 45 min           |

### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem                                                                                                  | hi/med/low | who found | github# |
| --------- | -------------------------------------------------------------------------------------------------------- | :--------: | :-------: | ------- |
| 47-60     | evaluateFeatures not needed for every feature. Unnessary checks.                                         |    med     |   Amir    |         |
| 23, 29    | stateMethods and stateVariables could probably be const.                                                 |    low     |   Amir    |         |
| 50-56     | If statement to disableSearch, could probably be cleaned up or put in a function for better readability. |    med     |   Amir    |         |
| 89-150     | ServerInformation function could possibly be broken up into multiple less complex functions for better readibility and reduced complexity |    low     |   Bill    |   #332 |     
|     18     | Not dynamic, could we pull this information from the backend? | low | Andy | #331 |
| 62-87    | Could be broken up into multiple functions for readablility | med | Andy| |
| 89-152   | I think the parent and thier child componets should be next to eachother with helper functions defined after. Makes the file more readable. | low | Andy | | 
| 51-54    | This is a large and tough to read condition. Maybe there could be a small function that does that check to make it more readable. | low | Tyler | | 

