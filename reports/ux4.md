# User Experience - Team *T13* 

The report summarizes user experience testing performed on the team's application.

Each developer should ask the user to accomplish one or more simple tasks while monitoring their efforts.  
The user should attempt to complete the tasks without any aid from the developer.
Use a pseudonym to identify the user below. 
Set a time limit and tasks for the user to perform.

 
### Tasks

Each user should complete the following tasks in 15 minutes.
Developers should not guide the user, but the user may ask for help as a last resort.  
Consider this a failure when it happens.  

1. Add an item from the map
2. Search For an item
3. Build a trip of any type
4. Name the trip
5. Reorder the trip
6. Save the trip
7. Refresh the page
8. Load the saved trip
9. Add the current location to the trip
10. Remove as many places from the trip as you want

### Post Tasks Questions 
Was it easy to complete all the tasks? If not, why?
How does this compare to other trip planning applications?
Would you use this application to plan your next trip? Why/why not?

### Demographics

Age, nationality, and other background information can sometimes be helpful understanding the problems a user encountered.

| Pseudonym | Demographics |
| :--- | :--- |
| Cube | 19, American, Male, Sophomore CS Major |


### Observations

Note the users interactions with the system for each of the tasks.
Record the success, failures, and problems the user encountered for each task.
Note any aid that wass given along with anything you notice from their use of the application.
Add issues to GitHub for any changes necessary to the system.

| Task | problem, aid, observation | hi/med/low | github# |
| :--- | :--- | :---: | :---: | 
| Add tooltips for icons | Icons weren't enough for Cube to know what each one does. He wished there were tooltips to know what they do without trial and error. | med | 533 |
| Show distances when an item in the itinerary is collapsed | Cube was didn't find the total distance useful at first. He didn't know you could expand the items in the itinerary. I had to help him there. Then he thought the distances were all from the starting place and didn't sum to the total. I had to explain that it was a round trip and that there was one more distance added to get the total. He thought it would be nice to see the distances without clicking into the list item. | low | 534 |
| Find alternative to "save changes" when trip is changed | Cube didn't like having to confirm changes every time he changed the trip and thought that it might be saving the trip to local storage. | low | 535 |
