# PROJECT: MERN_eCommerce_BradTraversy
### [Udemy Course](https://www.udemy.com/course/mern-ecommerce/) "MERN eCommere from scratch" by Brad Traversy
### [GitHub Repo](https://github.com/bradtraversy/proshop_mern) from course


# Loose Collection of steps:

1) STARTING THE FRONT END
   
1.1) REACT SETUP & GIT INITIALIZE
    $ npx create-react-app frontend
    will create basic react app in newly created folder "frontend"

    THEN clean-up files

    move .gitignore file in root and adapt path > node_modules & node_modules/ & .env

    go to root folder
    $ git init

1.2) REACT-BOOTSTRAP SETUP
    React Bootstrap with Template from Bootswatch
    1- <https://bootswatch.com/lux/#top> > download bootstrap.min.css and import in frontend/src folder
    2- $ npm i react-bootstrap

1.3) Fontawesome CDN Link in public/index.html

1.4) first import products from js file in src and image folder in public
   
1.5) CREATE COMPONENTS AND SCREENS
    rafce shortcut will create react arrow function with export
    
    HEADER & FOOTER COMPONENT
    HOMESCREEN PRODUCT LISTING
    RATING COMPONENT
    PRODUCT DETAIL SCREEN

1.6) IMPLEMENTING REACT ROUTER
    create productRoutes
    $ npm i react-router-dom react-router-bootstrap
    import react router in index.html, app.js and respective components
    exchange anchor tags with Link to="" and within bootstrap use LinkContainer to=""

---
2) SERVING & FETCHING DATA FROM EXPRESS
2.1) SETUP
    create backend folder in root

    in root $ npm init and go through steps
    
    install express $ npm i express

    create server.js in backend folder
    create data folder > put product js file in there (placed in frontend folder before)

    set up basic express server listening on port 5000 in server.js

    add "start": "node backend/server" in package.json (root)
    start backend app with $ npm start

    set up Back End API Routes to get product data

2.2) FETCHING PRODUCTS FROM REACT (UseEffect)

    install axios $ npm i axios
    http library > we use it to make http requests to our backend, you could use fetch request, but axios is more powerful
    
    > update fetching of products in HomeScreen and ProductScreen

    add proxy in frontend/package.json > "proxy": "http://127.0.0.1:5000",
    to complete fetch urls towards backend

2.3) NODEMON & CONCURRENTLY SETUP
    $ npm i -D nodemon concurrently
   
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

2.4) ENVIRONMENT VARIABLES
    $ npm i dotenv
    create .env file in root folder and add to .gitignore file
    add in server.js and exchange PORT with evn variable

2.5) ES MODULES IN NODE.JS
    add "type": "module", in package.json
    now convert
    const express = require("express")
    > to
    import express from "express"
    ! add file extension when you want to bring in files

---
3) GETTING STARTED WITH MONGO DB
3.1) Set up MongoDB Atlas (Cloud version) & Compass
    create new project > database in MongoDB Atlas > via "Connect" get connection link for MongoDB Compass (connect Desktop application) and for MongoDB URI (add in .env)

3.2) CONNECTING TO THE DATABASE
    install mongoose § npm i mongoose
    create "config" folder in backend with file "db.js" and add mongoose connection
    bring connection in server.js

3.3) ADDING COLORS TO THE CONSOLE 
    install color package $ npm i color
    and add colors to console messages in db.js and server.js

3.4) MODELING OUR DATA
    create models in backend folder 
    and create Schemas for order / product / user
    
3.5) PREPARING SAMPLE DATA
    create user.js file in data folder and put in some example data

3.6) DATA SEEDER SCRIPT
    Create data Seeder > separate script to import data

3.7) FETCHING PRODUCTS FROM THE DATABASE
    create backend routes and use them in server.js > app.use("url", handler)
    and use package "express-async-handler" to not use .then/.catch all the time

3.8) SET-UP POSTMAN
    create new collection with sub-collections and each request

3.9) CUSTOM ERROR HANDLING
    implement custom error handling with middleware functions
    folder middles and use them in server.js

---
4) IMPLEMENTING REDUX FOR STATE MANAGEMENT

    Implement redux for product list and product detail list 

    add store > constants > reducer > action > add redux state in ui components (useDispatch & useSelector)

    create Message & Loader Components

---
5) ADDING THE SHOPPING CART
   
    Adding Shopping Cart with Qty Select, Add To Cart Button, redux state for Add To Cart and Remove From Cart functionality

---
6) BACK END USER AUTHENTICATION

6.1) CLEAN UP BY USING CONTROLLERS
    controllers should handle functionality
    routes should just point to controller methods

6.2) USER AUTHENTICATION ENDPOINT
    create userRoutes, userController
    for authentication a user we want to access the request body (with email and password) to ge able to do that we have to add "app.use(express.json())" in server.js

6.3) GENERATE A JSON WEB TOKEN - AUTHORIZATION
    $ npm i jsonwebtoken
    create "utils" folder with "generateToken.js" file 
    bring the generateToken function in userController.js

6.4) CUSTOM AUTHENTICATION MIDDLEWARE
    
    create getUserProfile handler function in userController.js and bring it in userRoutes
    
    create "middleware/authMiddleware.js" to protect the route and bring it in userRoutes

    INFO: In postman the token is send in Header > KEY Authorization  

6.5) SAVING THE TOKEN IN POSTMAN
    to not manually pass the header value. When user login we put the token in an environment variable
    In POST /api/users/login > Tests > pm.environment.set("TOKEN", pm.response.json().token)

    in GET /api/users/profile remove Headers Authorization and add Authorization > Type = Bearer Token > Token = {{Token}}

6.6) USER REGISTRATION & PASSWORD ENCRYPTION
    create /api/users route

    userController.js > registerUser handler function > export
    require in userRoutes

    in userModel add middleware to make sure that password is hashed before the user is created

---
7) FRONT END USER AUTHENTICATION % PROFILE

7.1) User Login Reducer & Action
    create userConstants file
    create userReducer file
    bring user state into store.js via adding userLogin: userLoginReducer to reducer variable
    create userAction.js
    in store.js add userInfoFromStorage and add to initialState

7.2) User Login Screen & Functionality
    create LoginScreen.js file
    add LoginScreen to App.js
    
    ** in localStorage (Inspect Tool > Application) you find userInfo with token

7.3) Show User in Navbar & Logout
    when user is signed in > show username and dropdown with profile and logout
    added in components/Header.js

    Logout Handler: create logout action in userActions.js and bring in into Header.js

7.4) User Register Reducer, Action & Screen
    create USER_REGISTER.. constants
    create userRegisterReducer
    add in store.js to reducer
    create action
    create RegisterScreen

7.5) Update Profile Endpoint
    in backend/controllers/userController create updateUserProfile
    add in userRoutes
    create new request in postman collection and test

7.6) Profile Screen & Get User Details
    create USER_DETAILS constants
    create userDetailsReducer
    bring it in store.js
    create getUserDetails Action
    create ProfileScreen.js
    bring it in App.js

7.7) Update User Profile
    create USER_UPDATE_PROFILE constants
    create userUpdateProfileReducer
    bring it in store.js
    create updateUserProfile action in userAction
    bring it in ProfileScreen submitHandler and add success message

---
8) CHECKOUT PROCESS

8.1) SHIPPING SCREEN & SAVE ADDRESS
   create ShippingScreen.js
   add in App.js
   create saveShippingAddress Action
   create CART_SAVE_SHIPPING_ADDRESS constant
   add case to cartReducer
   
   To make shippingAddress from localStorage available:
   - in store.js add loading shippingAddressFromStorage > add to initialState > add shippingAddress to cartReducer in initial State as well
   -  in ShippingScreen use useSelector hook to get state and set respective shippingAddress field as initial state

8.2) CHECKOUT STEPS COMPONENT
    create CheckoutSteps.js Component and define links for every checkout step
    add component to ShippingScreen.js and only add step1 and step2 > not added steps will be disabled > not available in the current step yet

8.3) PAYMENT SCREEN & SAVE PAYMENT METHOD
    create PaymentScreen.js
    create CART_SAVE_PAYMENT_METHOD constants
    create savePaymentMethod action
    add constant in cartReducer.js 
    add route to App.js

8.4) PLACE ORDER SCREEN
    create PlaceOrderScreen.js
    add route to App.js

8.5) ORDER CONTROLLER & ROUTE
    in backend/controllers create orderController.js
    create orderRouter.js
    add route in server.js

8.6) CREATE ORDER
    in frontend create orderConstants.js
    create orderCreateReducer in orderReducer.js
    bring it in store.js
    create orderAction.js


PART II

8.7) GET ORDER BY ID ENDPOINT
    in backend/controllers/orderController create getOrderById function
    add to orderRoutes.js

8.8) ORDER DETAILS REDUCER & ACTION
    in frontend add ORDER_DETAILS constants
    create orderDetailsReducer
    in store.js add orderDetailsReducer to reducer object
    create getOrderDetails action
    
8.9) ORDER SCREEN
    create OrderScreen
    add to app.js

8.10) UPDATE TO PAID ENDPOINT
    in backend/controllers/orderController add updateOrderToPaid function
    add to orderRoutes.js

8.11) ORDER PAY REDUCER & ACTION
    in frontend create ORDER_PAY constants
    create orderPayReducer
    add to store.js reducer object
    create payOrder action

8.12) ADDING PAYPAL PAYMENTS
    go  to developer.paypal.com > log in
    two default accounts are created > Business and Personal
    create new app "MERN_eCommerce_BradTraversy" and get client_id
    put sandbox client id in .env file
    add route to server.js
    in OrderScreen addPayPalScript in useEffect and define sdkReady state
    include loading and success state in orderPay
    adjust dispatch 

    install $ npm install react-paypal-button-v2
    > because of some issue I installed it like:
    npm i react-paypal-button-v2 --legacy-peer-deps

    add check and successPaymentHandler on the bottom


8.13) SHOW ORDERS ON PROFILE
    in backend/controllers/orderControllers create getMyOrders
    bring in orderRoutes
    create postman request
    create ORDER_LIST_MY constants
    create orderListMyReducer
    bring in store.js in reducer object
    create listMyOrders action
    in ProfileScreen get the state via orderListMy, call listMyOrder action in useEffect

    WORKFLOW IMPLEMENTATION
    create backend route
    create constant, reducer, action
    create screen and bring the action in, call it and get what we want from the state

8.14) USER DETAILS & ORDERS RESET
    when another user log in they still see details and order items from previous logged user, because data is still in the state > reset
    create USER_DETAILS_RESET and ORDER_LIST_MY_RESET constants in userConstants and orderConstants 
    add case in userDetailsReducer and orderListMyReducer
    in userActions > logout function dispatch these two constants


---
9)  ADMIN SCREENS

9.1) ADMIN MIDDLEWARE & GET USERS ENDPOINT
    >> create endpoint to get all admin users
    in backend/controllers/userController create getUsers
    add admin check in authMiddleware.js
    add get user in userRoutes as protected and isAdmin

    create new request in postman collection and test with admin true and false user

9.2) ADMIN USER LIST
    create USER_LIST constants
    create userListReducer reducer
    bring in store.js reducer object
    create listUsers action
    create UserListScreen.js
    add admin/userlist route in App.js

    create Admin menu in Header.js component


9.3) ADMIN SCREEN ACCESS SECURITY
    first security issue
    >> make sure that url is not accessible for non admin users
    in UserListScreen get userLogin state and adjust useEffect with if/else statement

    second security issue
    >> when admin is on user list > then logs out >> he remains on user list
    !! I could not confirm this case with my code
        create USER_LIST_RESET in userConstants
        add case to userListReducer
        in userAction dispatch USER_LIST_RESET constant within logout function

9.4) ADMIN USER DELETE
    in backend/controllers/userController create deleteUser function
    bring it in userRoutes

    add new request to postman collection and test

    in frontend add USER_DELETE constants
    create userDeleteReducer in userReducers
    bring userDeleteReducer in reducer object in store.js
    create deleteUser action
    bring in deleteUser action in UserListScreen and get that part of state with userDelete
    > add successDelete to userEffect dependencies (to track changes) and dispatch deleteUser within deleteHandler from delete button

9.5) GET USER BY ID & UPDATE USER ENDPOINT
    in backend/controllers/userController create getUserById and updateUser function
    bring them in userRoutes

    create two new requests in postman collection and test

9.6) USER EDIT SCREEN & GET USER DETAILS
    create UserEditScreen
    bring in App.js

9.7) UPDATE USER FUNCTIONALITY
    >> make edit user work
    create USER_UPDATE constants
    create userUpdateReducer
    bring in store.js reducer object
    create updateUser action
    update UserEditScreen


PART II

9.8) ADMIN PRODUCT LIST
    create ProductListScreen
    bring in App.js

9.9) ADMIN DELETE PRODUCTS
    in backend/controllers/productController create deleteProduct function
    bring in productRoutes

    in frontend/constants/productConstants create PRODUCT_DELETE constants
    create productDeleteReducer
    bring in store.js reducer object
    create deleteProduct action
    update ProductListScreen

9.10) CREATE & UPDATE PRODUCT ENDPOINTS
    >> createProduct (create sample product and redirect user to update product) & updateProduct (separate screen)
    in backend/controllers/productController create createProduct & updateProduct function
    bring in productRoutes

    add request in postman collection an test

9.11) ADMIN CREATE PRODUCT
    in frontend
    create PRODUCT_CREATE constants
    create productCreateReducer
    add to store reducer object
    create createProduct action
    bring in ProductListScreen > adapt useEffect, dispatch action in createProductHandler

9.12)  EDIT PRODUCT SCREEN
    >> build screen for edit products by admin (after creation > auto redirect or when admin press edit button on productlist)

    create ProductEditScreen
    add in App.js


9.13) ADMIN UPDATE PRODUCT
    create PRODUCT_UPDATE constants
    create productUpdateReducer
    bring in store.js reducer object
    create updateProduct action

    bring it in ProductEditScreen > get productUpdate state (add loading and error on Update), add successUpdate to useEffect > dispatch updateProduct in submitHandler function 

9.14) IMAGE UPLOAD CONFIG & ENDPOINT
    >> enable server to handle file uploads > create endpoint /api/upload and use Multer to handle multipart/form-data > primarily used for uploading files
    https://www.npmjs.com/package/multer

    create "uploads" folder in root
    create "file.txt" in uploads folder and put "Add to git repo" in >> so it will be added to our git repository although empty

    in backend/routes add uploadRoutes.js >> put route and config & validation for multer in
    bring in server.js

    make uploads folder static
    >> so that it can get loaded in the browser
    in server.js add following lines:
        const __dirname = path.resolve()
        app.use("/uploads", express.static(path.join(__dirname)))
    

9.15) FRONT END IMAGE UPLOAD
    >> in ProductListScreen add button to upload files
    add uploading and setUploading state
    extent image Form.Group and add uploadFileHandler functionality


9.16) ADMIN ORDER LIST
    in backend/controller/orderController create getOrders
    bring in orderRoutes

    in frontend
    create ORDER_LIST constants
    create orderListReducer
    bring in store.js in reducer object
    create listOrders action
    create OrderListScreen
    bring in app.js

9.17) MARK ORDER AS DELIVERED
    in backend/controllers/orderController create updateOrderToDelivered
    bring in orderRoutes

    in frontend
    create ORDER_DELIVER constants
    create orderDeliverReducer
    bring in store.js reducer object
    create deliverOrder action
    bring deliverOrder and ORDER_DELIVER-RESET in OrderScreen
    > create button with deliverHandler

---
10)    PRODUCT REVIEWS, SEARCH & MORE

10.0) INSTALL MORGAN
    $ npm i morgan
    in server.js add following lines
    if(process.env.NODE_ENV === "development") {
        app.use(morgan("dev"))
    }

    whenever one of the backend routes is hit, we see request details in terminal


10.1) CREATE REVIEW ENDPOINT
    update productModel reviewSchema and extend with user
    in backend/controller/productController create createProductReview
    bring in productRoutes
    add request to postman collection and test


10.2) FRONT END PRODUCT REVIEWS
    create PRODUCT_CREATE_REVIEW constants
    create productReviewCreateReducer
    bring in store.js reducer object
    create createProductReview action
    bring in ProductScreen > second row

10.3) PRODUCT SEARCH
    create Search Box component
    add /search/:keyword route in App.js
    embed SearchBox component in Header.js

    In HomeScreen get keyword from url and pass into listProducts action in useEffect
    in productActions.js pass in keyword (default empty) and add keyword query string to backend get call (axios) >> ?keyword=${keyword}

    in backend productControllers in getProducts function add keyword ternary operator and spread in Product.find query

10.4) PRODUCT PAGINATION
ADD FUNCTIONALITY
    in backend productController add paginate functionality in getProducts function

    in frontend productActions: listProducts function set pageNumber as prop and in get request as paramter
    &pageNumber=${pageNumber}

    in productReducers extend PRODUCT_LIST_SUCCESS with pages and page (according to changed productController)

ADD LINKS
    in App.js add routes
    "/search/:keyword/page/:pageNumber"
    "/page/:pageNumber"

    in HomeScreen get pageNumbers and extend listProducts props and dependencies

    create Paginate component (Pagination available in react-bootstrap)

    bring Paginate component in HomeScreen 

    to add for Admin/productlist
    add Paginate component to ProductListScreen
    add /admin/productlist/:pageNumber to routes in App.js


10.5) TOP PRODUCTS CAROUSEL
    in backend/controllers/productControllers create getTopProducts 
    bring in productRoutes.js

    in frontend
    create PRODUCT_TOP constants
    create productTopRatedReducer
    bring in store.js reducer object
    create listTopProducts action

    create ProductCarousel
    bring in HomeScreen

10.6) CUSTOM PAGE TITLES & META
    Helmet package to bring in custom HTML Tags
    in frontend install $ npm i react-helmet

---
1)    APP DEPLOYMENT WITH HEROKU



BUG FIX 
> Update Username in Header after update in profile
    in updateUserProfile action dispatch USER_LOGIN_SUCCESS and update localStorage

    in userConstants & userUpdateProfileReducer add USER_UPDATE_PROFILE_RESET
    bring in ProfileScreen

---
### Links from Brad

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