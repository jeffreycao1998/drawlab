# drawlab
Collaborative Drawing App (in progress)

## Problems Encountered

# Problem 1 
Problem: When you're drawing a line too fast the event listener isn't able to pick up on all the pixels your mouse went over.

Solution: Keep track of previous point encountered and connect it to the current mouse position with a straight line.

Future: Create/find an algorithm to smooth out lines

## Get Started

1. cd into the client folder

2. run 'npm install'

3. start the client server by running 'npm start'


4. in a seperate terminal cd into the server folder

5. run 'npm install'

6. start the backend server by running 'npm run server'

7. go to http://localhost:3000 to start drawing!

8. (optional) open another browser and go to http://localhost:3000 to draw collaboratively in real time!
