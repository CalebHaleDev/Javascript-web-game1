# Javascript-web-game Overview
In this project I wanted to learn more JavaScript and make a slightly more complex game in a browser page. I added graphics, instead of just formatted text like my previous project. I also started out with a hexagonal grid system and non-euclidean geometry, which I think was going well except I didn't go in with a good plan, didn't consistently test each part as I made it, so it got very unorganized and eventually the game stopped loading but wouldn't give an error message, so I decided first to carefully review the code, copying it piece by piece into a new program file, but I decided that I was wasting a lot of brainpower trying to be efficient and decided to start over simple and come back to the original file later if I wanted.
The game is meant to be exploring a cave, so there is a fading light source from the screen center (the character location). The initial program included a movement-array coordinate system that would track the player's path in order to determine their position, allowing different paths to lead to different places (like going in a circle to be in a different place, non-euclidean geometry). I made a coordinate checker that would remove redundant movements so the movement is consistent on the scale of the rendered screen, so the players wouldn't realize what was going on until they explored a bit and tried to go back.

[YouTube demonstration](http://youtube.link.goes.here)

# Development Environment

I used Visual Studio Code and an extension that allows hosting html files privately. The game was written in JavaScript, not using any libraries.

# Useful Websites

- [JavaScript Tutorial](https://www.youtube.com/watch?v=PkZNo7MFNFg&t=18s)
- [HTML DOM info W3schools](https://www.w3schools.com/js/js_htmldom.asp)
- [DOM methods W3schools](https://www.w3schools.com/js/js_htmldom_document.asp)
- [SVG reference for drawing](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [SVG reference for polygon](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon)
- [array.slice W3schools](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_slice_array2)
- [array splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [HSLA color selector for design] (hslpicker.com/)

# Future Work

- Fix x-coordinate color consistency (stripes)
- Fix y-coordinate proportional render reduction (shrinking screen)
- Reduce memory load to prevent page crashing (replace with text highlights or square characters?)
- Coordinates could be made non-euclidean again, although only with significant changes to the program
- Decrease lag
