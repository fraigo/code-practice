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
lineFrom(0,0)

while(margin<size/2){
    lineTo(size-margin,margin);
    lineTo(size-margin,size-margin);
    lineTo(0+margin,size-margin);
    lineTo(0+margin,0+margin+step);
    margin += step;
}
