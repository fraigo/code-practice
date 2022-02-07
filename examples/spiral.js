// Spiral
// Level: Advanced
// Objective: 
//  * Use of loops
//  * Incremental variables

// controls velocity (ms)
timeout = 50
// set color (RED, GREEN, BLUE)
line.color = RED;

// spiral variables
margin = 0;
step = 10;
size = 350;
i = 0;

// start point
start(0,0)

while(margin<size/2){
    moveTo(size-margin,margin);
    moveTo(size-margin,size-margin);
    moveTo(0+margin,size-margin);
    moveTo(0+margin,0+margin+step);
    margin += step;
}
