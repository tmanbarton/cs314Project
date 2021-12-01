# Inspection - Team *T13* 

The goal of an Inspection is to find defects.
We first identify the code we wish to inspect, determine the time we wish to meet, and determine the checklist we will use to find faults in our code during the preparation before the meeting.

|  | Details |
| ----- | ----- |
| Subject | TourRequest.java |
| Meeting | 12/01/21 at 2:30pm MST, T13 |
| Checklist | checklist.md|

### Roles

We note the amount of time each person spent reviewing the code in preparation for the meeting.

| Name | Preparation Time |
| ---- | ---- |
| Andy H | 1hr |
| Amir | 1hr |
| Bill | 30min |
| Sonu | 30min |
| Tyler | 30min |


### Problems found

We list each potential defect we found in the code during our preparation so we can discuss them in the meeting.
We add a GitHub issue for each defect that requires a modification to the system.

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| 49 | NN should most likely be seperate file | hi | Andy <br> Amir | TBD |
| 69 | Might want to give less time | low | Andy | TBD |
| 74 | O(n<sup>2</sup>) is fairly slow-- don't know/think if it can be done faster but worth a look | low | Andy | TBD |
| 74 | O(n^2) is fairly slow-- don't know if it can be done faster | low | Andy | TBD |
| 23/24 and 108 | Might want to do an early time check in-case DS take too long to make | low | Andy | TBD |
|19| Could probably make into a method and test for more things| med | Amir | TBD|
|22-23| Can we call buildDataStructures in the constructor? May speed some things up | low | Amir|TBD|
| 69 | Needs less time, but wont optimize in time without it | med | Amir | TBD|
|74-98| This is probably one of the parts that's slowing us down the most. Not sure if we could add an early exit within the second for loop, or if there is a more effective way to go from hashmap to 2d array| hi | Amir | TBD |
|101| Lazy adding starting place to trip | med | Amir | TBD |
|117-119| Make into seperate function | low | Amir | TBD |
|111 & 120| Are these variables really necessary? We have have finalTrip as global, could we just use that? | med | Amir | TBD |
|121| Make into seperate function | low | Amir | TBD |
|193-194| Should be using System.arraycopy() instead of .clone() for speed. | med | Amir | TBD |
|181| Make into sperate function | low | Amir | TBD |
|159 - 161| we need to add an outOfTime check to while loop. | med | Amir | TBD | 
|126 - 131| This could probably be a seperate function | low | Bill | TBD |
|221 - 242| We could seperate these methods into their own file to reduce size | low | Bill | TBD |
|191 - 218| nearestNeighbor and 2_opt could be in their own file to reduce size/complexity | med | Bill | TBD|
|10| Change data structure to Array | high | Sonu | TBD|
|63| Use double instead of Long, so that smaller distances can be calculated | high | Sonu | TBD |
|95| Compute distance should return decimal values (Double)| high | Sonu | TBD | 
|101, 111, 120| Replace Places with places array| high | Sonu | TBD | 
|102-104| Should rearrange the trip in time.| high | Sonu | TBD | 
|121-125| Avoid creating new Places again, instead save only the index | high | Sonu | TBD |
|89-95| Avoid repeated calculations.| high | Sonu | TBD |
|129| Avoid creating new Places insted save an array of integers to save the index | high | Sonu | TBD |
|221, 237, 63| Use array instead of arraylist| high | Sonu | TBD | 
|245| If time runs out return the original tour array without optimizing | high | Sonu | TBD |
|all over| Change var to specific type declarations | low | Tyler | TBD |
|159| Variable Name is confusing, could be a little more clear | Tyler | TBD |

