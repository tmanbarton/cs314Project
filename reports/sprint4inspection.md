# Inspection - Team _T13_

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|           | Details             |
| --------- | ------------------- |
| Subject   | _Itinerary.js_      |
| Meeting   | 11/03/2021, 5:30 pm, T13 |
| Checklist | _checklist.md_      |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---------------- |
| Amir |  45mins          |
| Andy |  45mins          |
| Tyler | 45 mins         |
| Bill | 45mins           |
| Sonu | 40mins           |

### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem                                                       | hi/med/low | who found | github# |
| --------- | ------------------------------------------------------------- | :--------: | :-------: | ------- |
| 84-105    | Could probably be moved into a different component.           |    Low     |   Amir    |         |
| 182 - 197 | Could be moved into another file (transformers.js).           |    Low     |   Amir    |         |
| 22-31     | Takes a lot of props (9) / could potentially be further broken up.|    Low     |   Andy    |         |
| 120-146   | Solves styling issue with manual styling, shouldn't be needed.  |    Low     |   Andy    |         |
| 22-31     | Takes a lot of props (9) / could potentially be further broken up.|    Low     |   Andy    |         |
| 246-249   | Could make this a for in loop.                                |    Low     |   Tyler   |         |
| 122-144   | React components instead of HTML tags?                        |    Low     |   Tyler   |         |
|242-251 | Could be put into a different file that contains calculations on places | Low | Bill | |
| 63-111 | Header as a whole could probably be broken up into atleast two components | Low | Bill | |
| 182-end | Could restructure bottom of file so components are first, other funcs last for better readability | Low | Bill | |
| 139 | Table does not necessarily has to display location. Details has to be shown only in the map | Low | Sonu | |
