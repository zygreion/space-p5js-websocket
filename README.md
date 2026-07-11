
# 🚀 Space Art p5js Websocket

A creative coding installation using p5.js and WebSocket. Visitors draw and color space-themed objects on their devices, then submit them to a shared projection. Drawings from multiple users are synchronized in real time and remain on the projection until the projection page is refreshed or closed.

**Draw and Project**
> <img width="auto" height="300" alt="Draw and Project" src="https://github.com/user-attachments/assets/8f7377bf-09da-43bf-aa05-1077b8bf2481" />

**Animated Projection**

> <img width="auto" height="250" alt="Animated Projection" src="https://github.com/user-attachments/assets/4057534d-4404-4217-82c9-271c9d7ee732" />


## ✨ Inspiration

Not long ago, I visited an installation by LZY Visual, an interactive media studio. Their installation allowed visitors to draw space-themed objects (using real paper and crayons), scan them, and see their drawings projected onto a wall as part of an interactive scene. 

Inspired by that experience, I created a web-based version using p5.js and WebSocket, where participants can draw on their own devices and instantly send their creations to a shared projection in real time.

#### Art Installation
> <img width="auto" height="150" alt="Big Wall" src="https://github.com/user-attachments/assets/cc6b8019-0e21-4d13-a33d-4639b6aa27c8" />

> <img width="auto" height="150" alt="Detailed Wall" src="https://github.com/user-attachments/assets/a3e6dd48-516c-46cb-adb1-552f07bd6c84" />

#### Coding

- [The Coding Train — WebSockets & p5.js](https://thecodingtrain.com/tracks/web-sockets-and-p5js/)


## 🏋️ Challenges & Solutions

#### 1. Coding References
*Challenge*: It's been a long time since I make something in p5js, and this project use of a lot of p5js functions and parameters.

*Solution*: I had to jump into p5js reference site a lot to know how to do certain things.

#### 2. Connect `draw` and `projection` sketch using Websocket
*Challenge*: Back in the days I only make an art per an index.html, and this project need to be run on different devices (at least 1 for drawing and 1 for projection).

*Solution*: Watching The Coding Train's video about websocket.

#### 3. Assets collection
*Challenge*: In this typical of project, I don't want to use AI generated art.

*Solution*: Jump into free-royalty asset sites like pixabay (for audio), vecteezy and flaticon (for drawing template). Also because the drawing templates are transparent, I had to fill the proper area of each template into white in Photopea so the default result has a baseline color.

#### 4. Package / libraries
*Challenge*: Usually, CDN is just enough for typical p5js projects, but this project need to be run on a server due to how Websocket works. Also, it turned out p5js is a little bit `extra`. 

*Solution:* I ask LLM, they tell me to use combination of `npm` packages for `express` and `socket.io`, while using downloaded `p5.min.js` for p5js.

#### 5. Deploy to Railway
*Challenge*: It runs on my localhost, why not in the production?

*Solution*: Adjust PORT configuration in `server.js` and change `io.connect()` within both sketch.js (`draw` and `projection` sub-folder). Thanks to LLM.

