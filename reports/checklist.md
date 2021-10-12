# Inspection Checklist for t13

The goal of an Inspection is to find defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults

- Are all program variables initialized before their values are used?
- Have all constants been named?
- Should the upper bound of arrays be equal to the size of the array or size-1?
- If character strings are used, is a delimiter explicitly assigned?
- Is there any possibility of a buffer overflow?
- Does the variable need to be constant? Should it be if it is not?
- Do all variables have a descriptive, yet concise name that follows the naming convention deicded on?

### Control faults

- For each conditional statement, is the condition correct?
- Is each loop certain to terminate?
- Are compound statements correctly bracketed?
- In case statements, are all possible cases accounted for?
- If a break is required after each case in case statements, has it been included?
- Are loop termination conditions obvious and invariably achievable?
- Are indexes or subscripts properly initialized, just prior to the loop?
- Can any statements that are enclosed within loops be placed outside the loops?

### Parameter faults

- Are all input variables used?
- Are values assigned to all output variables before they are output?
- Can unexpected inputs cause corruption?

### Interface faults

- Do all functions and methods have the correct number of parameters?
- Do formal and actual parameter types match?
- Are the parameters in the right order?
- Do all components use a consistent model for shared memory structure?

### Storage faults

- If a linked structure is modified, have all links been correctly diagnosed?
- If dynamic storage is used, has space been allocated correctly?
- Is space explicitly deallocated after it is no longer required?

### Exception faults

- Have all possible error conditions been considered?

### Reusability

- Are all available libraries being used effectively?
- Is the code as generalized/abstracted as it could be?
- Is the same code being written more than once or is there copied-and-pasted code from another class.
