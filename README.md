# Reddit Scroller

Reddit Scroller is a web application to search Reddit's subreddits only for the pictures, and present them in a scrollable form. <br>
It uses React and Reddit's API as its main technologies. It's built in a responsive layout and perfect for mobile.

## How Does It work?

Pretty simple: You type the subreddit and hit the "SCROLL!" button. This gives you the first page of that subreddit, and <br>
more images get loaded as you keep scrolling down. The limit is your RAM.

![ScrollReddit Page](https://imgur.com/VQhDK2B.png)

## Live Demo

Click [here](https://reddit-scroller.herokuapp.com) for the live demo.

## To Run Locally

After downloading the repository, run "npm install" command inside the client folder to install dependencies. <br>
Then run "npm start" to run the application. It should open a browser but if it doesn't, you can connect the app <br>
via address localhost:3000 on any browser.  

## Current Bugs

- ~~The button that redirects you to the original post doesn't work.~~
- ~~-If the given subreddit has no pictures in one of its pages, fetching of new pictures stop there.~~ 
- ~~Fetching continues even when data flow is cut~~


## Most Recent Updates ~V.12 

With the new version, the corrections stated below are made:
- Button linking to the original post is fixed.
- Now each scroll guarantees you a number of images between 15-25
- Gifs are also supported
- If subreddit consists less than 2 images per page on average, scrolling will stop.
- If you search a subreddit with no pictures, loading will stop after 20 pages and average is calculated. This takes around ~8 seconds and you will see an error message.
- If you exceed 500 pages, scrolling will stop.
- Toggle switch added to include/exclude gifs.

## Upcoming Features
- Maybe a toolbar
- Some optimization work

## Credits

- To Twitter, and flaticon.com for the icon used.
- Scrolller.com and its developer Simoen Owesen-Lein for the advices regarding development. 
- Lity is used for lightboxes, from https://sorgalla.com/lity/
- Google's MaterialUI is used for the UI development.
