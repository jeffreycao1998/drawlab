# drawlab
Collaborative Drawing App (in progress)

## Tough Problems Encountered

# Problem 1 
Problem: When you're drawing a line too fast the event listener isn't able to pick up on all the pixels your mouse went over. There'd be gaps of a couple pixels.

Solution: Keep track of previous point encountered and connect it to the current mouse position with a straight line.

# Problem 2
Problem: Detecting when a user was leaving the drawing page(room). window.location doesn't work with React-Router other than root path.
![](https://i.imgur.com/jI2kVw6.png)

Solution: Found the useLocation hook from React-Router.

# Problem 3
Problem: The mouse positions don't correlate with the positions on the canvas.

Solution: When emitting mouse locations, offset them by the same number of pixels the canvas is offsetted from the top left corner of browser.

## Future Feature
1. Smooth out lines when 

## Get Started

1. cd into the client folder

2. run 'npm install'

3. start the client server by running 'npm start'


4. in a seperate terminal cd into the server folder

5. run 'npm install'

6. start the backend server by running 'npm run server'

7. go to http://localhost:3000 to start drawing!

8. (optional) open another browser and go to http://localhost:3000 to draw collaboratively in real time!
