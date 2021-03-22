# Pre-work - *Memory Game*

The Memorizer is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Brandon Egger**

Time spent: **9** hours spent in total

Link to project: https://glitch.com/edit/#!/the-memorizer

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Prevent user interaction with buttons while the clue is being played, that way it doesn't interfere with playback
- [x] Only consider user input after clue is done being played, in base tutorial users could simply follow alongside the clue
- [x] Add input field to allow for selection of how many buttons the user would like to play with (2-10)
- [x] Any invalid input or losing the game plays the windows error sound! (from the good ol' XP days of course)
- [x] Made buttons slightly adjust in size for smaller browser windows.

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](http://g.recordit.co/2AUUHBKjDA.gif)
![](http://g.recordit.co/2fKdW9LTUi.gif)
![](http://g.recordit.co/En4At422PP.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
    - Reference to see method for checking length of an Array in javascript.
  - https://www.w3schools.com/tags/tag_input.asp
    - Referenced to see how to implement an input field allowing user selection of boxes.
  - https://stackoverflow.com/questions/49820106/add-a-button-using-javascript-to-an-existing-div
    - Reference to see how to create elements in JavaScript and append them manually.
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    - Referenced to see built in functions available to the Map object in JS.
  - https://www.w3schools.com/js/js_random.asp
    - Referenced to see how random numbers are handled in JavaScript
  - https://www.w3schools.com/cssref/css_colors.asp
    - For a list of common colors and their codes in CSS
  - https://css-tricks.com/adding-stroke-to-web-text/
    - For adding stroke to error message

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
[One of the biggest challenges I came across was adding the scalability of buttons. What made this difficult was that you couldn't add psuedo classes directly to the elements you create with JavaScript
therefore the only feasible way to manage when a user clicked them without using JavaScript was to create all the possible CSS button id's and give them their given color when clicked property. In my project,
it is clear I could've just done this by adding button1-10 and their specified color and then just assign those id's when creating them in JavaScript, however I was against this because I wanted the game to be scalable.
Eventually, I would create a color and frequency generator, in which case the buttons could go from 1-x, where x could be any value greater than 1. In theory, this could currently be implemented now if I made the change to the buttonGenerator function
where it goes back to the beginning of the color map once reaching the end (colors would repeat after 10 buttons). In order to allow for this endless generation of buttons I used the mousedown and mouseup properties to call a JavaScript function that would then change the color
according to the given button id the element had been assigned. This allowed for me to create a similar effect to the browser handling the button interaction. I followed the format of the frequency map to create a color map
which assigned color-when-pressed to the color-when-not-pressed (i.e. color-when-not-pressed: color-when-pressed). While I'm not a huge fan of using JavaScript to handle this interaction, the solution seems to work fairly reliably
although I'm not sure entirely the performance tradeoffs of using this method over the orignal css stylesheet handling the click color change, but overall this solution seems to do the job for this game.]

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[While working on this project and doing lots of googling on how to implement certain features into the game, I came across many mentions to libraries like React and things like bootstrap. I have lots of questions regarding these
libraries, and more specifically how to get into interactive and response web development. I also have always wanted to learn more about how websites like Twitter/Facebook or any website where the majority of the content
displayed to the user is custom to the user are created. We all use the same url (twitter.com) to get the website, so how are the able to make the site different according to the account signed in. I'd really like to see how this
data is streamed to the page for the user, and generated in such a structural way that it can vary depending on many factors.]

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[If I had more time, I'd like to make the colors and frequency of tone per button generated automatically. This would allow the max number of buttons generated to go above 10 and in theory to any number of buttons you
would like. If the randomly generated colors and tones are not very 'attractive', I would instead implement a way for the buttons to start over in the frequency and color map and start repeating colors and frequencies when
it goes to a number of buttons greater than the entries in the map. Lastly, I'd like to make a lot more changes to the overall look of the website. Most importantly, I want to tinker with the css to allow for all elements
to be seen on the screen by the user no matter the window size (within reason). Buttons would shrink and enlarge to fit the window that way the user never would need to scroll to see all the buttons on larger games.]



## License

    Copyright Brandon Egger

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
