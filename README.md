# MERN_eCommerce_BradTraversy
## Udemy Course "MERN eCommere from scratch" by Brad Traversy
## https://www.udemy.com/course/mern-ecommerce/

GitHub Repo:
https://github.com/bradtraversy/proshop_mern


Loose Collection of steps:

1) Set-Up React
    $ npx create-react-app frontend
    will create basic react app in newly created folder "frontend"

    THEN clean-up files

    move .gitignore file in root and adapt path > node_modules & node_modules/ & .env

2) go to root folder
    $ git init


3) React Bootstrap with Template from Bootswatch
1- <https://bootswatch.com/lux/#top> > download bootstrap.min.css and import in frontend/src folder
2- $ npm i react-bootstrap

4) Fontawesome CDN Link in public/index.html

5) first import products from js file in src and image folder in public
   
6) create components and screens
   rafce shortcut will create react arrow function with export

7) create routes
$ npm i react-router-dom react-router-bootstrap
import react router in index.html, app.js and respective components
exchange anchor tags with Link to="" and within bootstrap use LinkContainer to=""

8) create backend folder in root
9) in root $ npm init and go through steps
    install express $ npm i express
10) create server.js in backend folder and data folder > put product js file in there
11) set up basic express server listening on port 5000
12) add "start": "node backend/server" in package.json (root) and start backend app with $ npm start
13) set up api routes to get product data

14) install axios $ npm i axios
    http library > we use it to make http requests to our backend, you could use fetch request, but axios is more powerful
    > update fetching of products in HomeScreen and ProductScreen

15) add proxy in frontend/package.json > "proxy": "http://127.0.0.1:5000",
    to complete fetch urls towards backend

16) $ npm i -D nodemon concurrently
    add in scripts:
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend"

    start frontend and backend 
    - independently
    $ npm run client
    $ npm run server
    - both together
        add "dev": "concurrently \"npm run server\" \"npm run client\"" in root package.json/scripts
        $ npm run dev

17) $ npm i dotenv
    create .env file in root folder and add to .gitignore file
    add in server.js and exchange PORT with evn variable

18) ES Modules
    add "type": "module", in package.json
    now convert
    const express = require("express")
    > to
    import express from "express"
    ! add file extension when you want to bring in files

19) Set up MongoDB Atlas (Cloud version) & Compass
    create new project > database in MongoDB Atlas > via "Connect" get connection link for MongoDB Compass (connect Desktop application) and for MongoDB URI (add in .env)

20) install mongoose § npm i mongoose
    create "config" folder in backend with file "db.js" and add mongoose connection
    bring connection in server.js

21) install color package $ npm i color
    and add colors to console messages in db.js and server.js

22) create models in backend folder and create Schemas for order / product / user
    
23) create user.js file in data folder and put in some example data

24) Create data Seeder > separate script to import data

25) create backend routes and use them in server.js > app.use("url", handler)
    and use package "express-async-handler" to not use .then/.catch all the time

26) implement custom error handling with middleware functions
    folder middles and use them in server.js



Checkout with PayPal (sandbox account)
Admin Dashboard (create/edit/delete products, user, orders)
Deployment with Heroku



--
Links from Brad

Final Project Repo:
https://github.com/bradtraversy/proshop_mern

Download VSCode:
https://code.visualstudio.com/

Download Node.js
https://nodejs.org/en/

Download Git:
https://git-scm.com/

Download Postman:
https://www.postman.com/

React Docs:
https://reactjs.org/

Redux Docs:
https://redux.js.org/

MongoDB Website:
https://www.mongodb.com/

Heroku Website & CLI Docs:
https://www.heroku.com/
https://devcenter.heroku.com/articles/heroku-cli

Redux DevTools:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

React Bootstrap:
https://react-bootstrap.github.io/

Bootswatch:
https://bootswatch.com/

JWT.io
https://jwt.io/

Basir YouTube Channel & Website
https://www.youtube.com/channel/UC2xRE4hUCQ3xO3ymEtMh1Hw
https://codingwithbasir.com/

NPM Packages:
https://www.npmjs.com/package/express
https://www.npmjs.com/package/express-async-handler
https://www.npmjs.com/package/bcryptjs
https://www.npmjs.com/package/dotenv
https://www.npmjs.com/package/mongoose
https://www.npmjs.com/package/colors
https://www.npmjs.com/package/jsonwebtoken
https://www.npmjs.com/package/morgan
https://www.npmjs.com/package/multer
https://www.npmjs.com/package/concurrently
https://www.npmjs.com/package/nodemon

https://www.npmjs.com/package/react-bootstrap
https://www.npmjs.com/package/react-router-dom
https://www.npmjs.com/package/redux
https://www.npmjs.com/package/react-redux
https://www.npmjs.com/package/redux-thunk
https://www.npmjs.com/package/redux-devtools-extension
https://www.npmjs.com/package/react-paypal-button-v2
https://www.npmjs.com/package/react-helmet
https://www.npmjs.com/package/axios