Project Hangout

**EVERYTHING BELOW HERE TO BE MODIFIED**

Description

Rainy Witch is a one-player computer game in which the player has to collect falling objects in order to gain points. It utilizes HTML, CSS, and JS.

The gameplay is as follows:

When the game loads, the player begins on a start screen. Upon clicking the “Start Game” button, the game launches Level 1.

If the player beats Level 1, they advance to Level 2. If the player loses either level, they will return to the start screen.

Each level is won by collecting 10 falling objects. Points are detracted in Level 2 for collecting the red potion instead of the green potion.

The player must monitor both their health and their points in order to advance.

Health is lost by flying into the rain. Health is regeberated by flying underneath the protective bar.

The witch is operated with the arrow keys on a standard keyboard, and can move up, right, left, or down.

Backlog Data structure

barra.js
pumpkin.js
rain.js
witches.js
game.js
index.html
style.css
READMe.md
images a. background.jpeg b. bonusBackground.jpg c. cauldron.png d. meltingWitch.png e. pumpkin.png f. rain.png g. redCauldron.png h. witchDown i. witchLeft j. witchLeft k. witchRight l. witchUp
sounds a. biteSound.m4a b. bubbling.m4a c. failSound.m4a d. gameMusic.mp3 e. witchLaugh.mp3
Functions required:

document.getElementById();
document.querySelector();
element.style.display;
element.volume;
element.getContext();
element.push();
element.forEach();
if () {} else if () {};
element.draw();
setInterval();
element.clearRect();
element.onclick();
element.play();
cancelAnimationFrame();
alert();
element.location.reload();
element.onload();
element.play();
requestAnimationFrame();
element.addEventListener();
Class constructors
JS Page Breakdown

barra.js This file creates a Barra class, which allows for the creation of different barras for each level. The Barra class constructor requires the following parameters (canvasValue, canvasContext, width), and has the following keys: this.canvas this.ctx
this.x this.y this.width this.height this.speed Additionally, the Barra class has a "draw" function, which also moves the barra automatically within the confines of the canvas.

pumpkin.js This file creates a Pumpkin class, which allows for the creation of different objects. These objects are used to fill an array, which then fall from the top of the canvas throughout the game. The Pumpkin class constructor requires the following parameters (canvasValue, canvasContext, image, speed), and has the following keys: this.canvas = canvasValue, this.ctx this.image this.x this.y this.height this.width this.speed Additionally, the Pumpkin class has three functions: draw() This draw function creates each image on the screen. move() This function creates the effect of falling objects, deleting them from memory if they fall off screen, and relocating them to the top of the screen if they fall onto the barra. checkForWitchContact() This function checks for contact with the witch in order to gain or lose points (depending on the object collected), and also removes the object from memory.

rain.js This file creates a Rain class, which allows for the creation of different rain drops. These rain drops are used to fill an array, which then fall from the top of the canvas throughout the game. The Rain class constructor requires the following parameters (canvasValue, canvasContext), and has the following keys: this.canvas this.ctx this.xPos this.yPos this.xRad this.yRad this.speed Additionally, the Rain class has two functions: draw() This draw function creates each rain drop on the screen. move() This function creates the effect of falling objects, deleting them from memory if they fall off screen, and relocating them to the top of the screen if they fall onto the barra.

witches.js This file is used for the creation of two classes, "littleWitches" and "Witch". Both classes have three functions: constructor(); draw(); This draw function creates each witch on the screen. move(); For littleWitches, this function calculates their path around the title on the game's title screen, moving in an endless loop according to the SetInterval function in which they are called.

  for Witch, this function defines the witch's movements acdording to each keystroke option (up, down, left, right), AS WELL AS what to do in case she collides with the barra. This function prevents her from flying through the barra or of screen.
game.js This file is the main game file. It is where each game loop is defined, and where all of the event listeners are defined. The file begins by defining different DOM components in order to be able to interact with the HTML during gameplay. Using comments, the game.js fiule is divided into compenents: a. HEALTH BAR COMPONENTS

b. SETITING UP THE PRE-GAME This allows for the display of all of the DOM components that we want to see on the start screen, and the hiding of all of the elements from gameplay that we want hidden until the "Start Game" is pressed.

c. DECLARATION OF VARIABLES

d. FUNCTIONS TO USE WITHIN GAMEPLAY Defining these functions out of each game loop allow for a more straightforward game loop that is more readable and easier to edit.

e. PRE-GAME ANIMATION This is where the littleWitches are called and put into motion on the page load event. Since they disappear when the game is started, they needed to be called before the game loop. Their display is turned off within the "Start Game" button click event.

f. CLICK EVENT AND START GAME The "Start Game" click event turns off all the display feature of all ot the elements from the start page and begins the game loop and game music.

  The gameLoop() and bonusGameLoop() functions are what allow for the gameplay of Level 1 and Level 2. They generate the falling objects, the protective bar, and the witch, which the player can operate using the keyboard's arrow keys. These loops are also where the health and points are regularly updated and requestAnimationFrame is called in order to run an infinite loop until the player wins or looses the Level.
Github Link https://dchilds05.github.io/Project-1/

URl for the project repo https://github.com/dchilds05/Project-1

Slides