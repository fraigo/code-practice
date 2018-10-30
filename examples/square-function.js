// Square Function
// Level: Intermediate
// Objective: 
//  * Use of functions
//  * Passing parameters
//    x0 : start x coordinate
//    y0 : start y coordinate
//    size: width/height of square
//    color: line color (RED, GREEN, BLUE) 

function square(x0, y0, size, color){
  // Start point
  lineFrom(x0, y0);

  // Set color
  line.color = color

  // Square lines
  lineTo(x0 + size, y0);
  lineTo(x0 + size, y0 + size);
  lineTo(x0, y0 + size);
  lineTo(x0, y0);
  
}

square(100, 100, 100, RED);
square(110, 110,  80, GREEN);
square(120, 120,  60, BLUE);
