# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before Running the app

Run `npm install`

## Available Scripts

To run the app:

### `npm run app`

Serves up the application 
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches JEST 

## Known Issues and Comments
* I never worked Social Media Posts into my algorithm which was just a complete oversight on my part. I instead only used the price to determine whether a user should BUY, SELL, or HOLD
* I over-engineered my original algorithm and tried to use a Standard Deviation method which cut into my time WAY too much which ultimately caused bullet point 1
* Label text is black in filter dopdown because I used a component linrary (https://mui.com/material-ui/) and I never got around to digging deep into changing the color. If I had more time I would've created a theme and set the values in there then wrapped the labels in a ThemeProvider that would then control the styling
* I removed the test files for each component. I  hadn't written tests for them which was causing JEST to throw failed test results because the tests were empty
* ERROR HANDLING!! I normally catch this stuff as I'm writing unit tests so I completely glossed over some error handling this time. I hope there's no QA person reviewing this
* I also know absolutely nothing about stock trading which is probably fairly evident from my buy/sell decisions. I'm not sure if there's a need to comment on it but it was very sobering realizing I'll never be the next Warren Buffet