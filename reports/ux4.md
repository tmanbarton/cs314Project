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
| Pseudonym | Was it easy to complete all the tasks? If not, why? | How does this compare to other trip planning applications? | Would you use this application to plan your next trip? Why/why not? |
| :--- | :--- | :---: | :---: |
| Isabel | Unclear how to modify trip besides basic dragging. | Easier to plan in advance/bulk than GPS maps. | Would use if already knew general idea of trip she would want to take. |
| Rob | User struggled to locate modify trip menu | Easier to plan large trips since most other applications don't involve uploading specific trip files | User would use to plan potential future trip ideas, however, probably wouldnt rely on it alone |
| Shai | Was able to use intuition to complete most taks, had trouble finding/using the modify trip menu. | Simple but more helpful in the area of transportation planning then other sites. | Maybe, but it is hard to plan a trip when you don't get any informatioon about where you are going. Could be used with the help of another application. |
| Pratyoosh | User had some trouble using the Modify trip function, was not sure about the functions of each button. | User found the application useful and simpler than other trip planning applications | User will definitely checkout this application for planning trips in the future |
### Demographics

Age, nationality, and other background information can sometimes be helpful understanding the problems a user encountered.

| Pseudonym | Demographics |
| :--- | :--- |
| Cube | 19, American, Male, Sophomore CS Major |
| Isabel | 20, White, Female, Communications Major Junior |
|Rob | 20, Male, 2nd year CS Major |
|Shai | 20, Female, Junior, Zoology Major |
|Pratyoosh | 25, Male, PhD Student, Agricultural Economics Major |
### Observations

Note the users interactions with the system for each of the tasks.
Record the success, failures, and problems the user encountered for each task.
Note any aid that wass given along with anything you notice from their use of the application.
Add issues to GitHub for any changes necessary to the system.

| Task | problem, aid, observation | hi/med/low | github# |
| :--- | :--- | :---: | :---: | 
| Add tooltips for icons | Icons weren't enough for Cube to know what each one does. He wished there were tooltips to know what they do without trial and error. | med | 533 |
| Show distances when an item in the itinerary is collapsed | Cube was didn't find the total distance useful at first. He didn't know you could expand the items in the itinerary. I had to help him there. Then he thought the distances were all from the starting place and didn't sum to the total. I had to explain that it was a round trip and that there was one more distance added to get the total. He thought it would be nice to see the distances without clicking into the list item. | low | NA |
| Find alternative to "save changes" when trip is changed | Cube didn't like having to confirm changes every time he changed the trip and thought that it might be saving the trip to local storage. | low | 535 |
| Make modify trip more clear | Isabel at first did not know where the modify trip buttons were located, until she had finished exploring the whole app. | low | 558 |
| Add showMessage or promt whenever appending a place | Isabel noted that the only way she knew a place was being added was when the distances updated. | med | TBD |
| Add units to total distances | Pretty self explanatory. | med | 555 |
| Add labels to buttons | same as above | Med | 533 |
| Make modify trip menu more visible | same as above | Med | 558 |
| Make trip toolbox more obvious | user struggled to find toolbox first try | Low | 572 |
| Add places through lat/lng | Allows for more a more custom trip without clicling on the map | Low | TBD |
| Add total found to search results | Shai wanted to be able to see if there was more results | med | 560 |
| Add "more results" to search results | If there was more results, Shai wanted to be able to add them | Low | 560 |
| A help button which explains the website and it's functionalities | A short explanation would be useful for Users to start with | Med | TBD |
