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
| Andy | t12  |      |
| Tyler| t22  |      |
|      | t16  |      |

### Client Problems found

We found these problems when connecting our client to another team's server.

| team | problem | github# |
| :--- | :------ | ------- |
|  t01    |   Do not get 'find' or 'distances' back as features. This disables our search feature and disables the ability to send a distance request.  |    NA    |

### Server Problems found

We found these problems when connecting the other team's client to our server.

| team | problem | github# |
| :--- | :------ | ------- |
| t01  | Client says 'Invalid Server URL!' when trying to connect to our server. This prevented further testing. | NA |