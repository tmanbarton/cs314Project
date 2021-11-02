# Inspection - Team _T13_

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|           | Details             |
| --------- | ------------------- |
| Subject   | _Itinerary.js_      |
| Meeting   | _date, time, teams_ |
| Checklist | _checklist.md_      |

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---------------- |
| Amir |  45mins          |

### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem                                                       | hi/med/low | who found | github# |
| --------- | ------------------------------------------------------------- | :--------: | :-------: | ------- |
| 84-105    | Could probably be moved into a different component.           |    Low     |   Amir    |         |
| 182 - 197 | Could be moved into another file (transformers.js).           |    Low     |   Amir    |         |
