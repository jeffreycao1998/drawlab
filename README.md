# drawlab
Collaborative Drawing App (in progress)

## Problems Encountered

# Problem 1 
Problem: When you're drawing a line too fast the event listener isn't able to pick up on all the pixels your mouse went over.
Solution: Keep track of previous point encountered and connect it to the current mouse position with a straight line.
Future: Create/find an algorithm to smooth out lines
