# Interop for t13

Interoperability testing allows us to verify correct operation when connected to another team's client or server.
Each team member must verify interoperability with the client and server from another team.
Each of the different aspects of the protocol must be verified.
We will discuss these issues with the other team and create defects in GitHub for any problems found in our system.

### Other Teams

This table lists each student in the team, the team they verified interoperability with, and the time to complete the testing.

| Name | Team | Time |
| ---- | ---- | ---- |
| Amir | t01  |20mins|
| Andy | t12  |  15min    |
| Tyler| t22  |      |
| Bill | t16  |15mins|

### Client Problems found

We found these problems when connecting our client to another team's server.

| team | problem | github# |
| :--- | :------ | ------- |
|  t01    |   None found, client correctly sent config and find request. This is everything their client supports.  |    NA    |
| t16  | Distances is not a supported feature | NA |
| t12  | No Issues Found | NA |

### Server Problems found

We found these problems when connecting the other team's client to our server.

| team | problem | github# |
| :--- | :------ | ------- |
| t01  | Find Request - it does not appear that the limit set by our client is being respect (expected:5, got:10). We are also only getting a found value of 10 for every query. Our servers also populated different results for the same query, looks like they are searching by alphabetical order? <br> Distances Request - didn't get back 'distances' in features array so our distance request never sends.  | NA |
|t16| Console says "Server config response json is invalid. Check the Server." upon switching. Nothing more could be done regarding switching servers. | NA |
|t12   | Console logs "Server config response json is invalid. Check the Server." upon switching. As well as other errors. | NA |
|t12   | Straight up not allowed to access servers that don't have all the same features. | NA |
