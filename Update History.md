<div id="user-content-toc">
  <ul>
    <summary><h1 style="display: inline-block;">Update History</h1></summary>
  </ul>
</div>

<h3>JAVASCRIPT (NODE) BACK END Completion FOR RECOMMENDATION AND DETECTION FEATURES with bugs fixed - November 5th 2023</h3>

_Committed on November 5, 2023_

1. Add JOI models for validation for crop and fertilizer recommendation.
2. Update Crop controller and routes to recieve data at the Javascript (NODE) Backend.
   
<h3>Feature 4: Disease Prediction FRONT END Completion with bugs fixed - October 29th 2023</h3>

_Committed on October 29, 2023_

1. Update Plant Disease Detection view.
2. Add Update Image.js file.
   
<h3>Feature 3: Fertilizer Recommendation FRONT END Completion with bugs fixed - October 23rd 2023</h3>

_Committed on October 23, 2023_

1. Update Fertilizer Recommendation view.
   
<h3>Feature 2: Crop Recommendation FRONT END Completion with bugs fixed - October 22nd 2023</h3>

_Committed on October 22, 2023_

1. Update Crop Recommendation view.
2. Add Select Districts.js file.
   
<h3>Feature 1: Stories Completion with bugs fixed - October 20th 2023</h3>

_Committed on October 20, 2023_

1. Added views for other features and removed star ratings.
2. Tested for bugs, fixed them, and finalized Feature 1: Stories.

_Committed on October 19, 2023_

1. Installed connect-mongo to create MongoStore to replace MemoryStore.
2. Installed readline-sync to improve interactivity while seeding data.
3. Modified Add Stories to Database file to improve interactivity with the user.

_Committed on October 17, 2023_

1. Installed express-mongo-sanitize to avoid Mongo Injection.
2. Modified views, installed and configured helmet node module to secure Kheti Sahayak.
3. Modified models and extended joi to support HTML sanitization using sanitize-html to prevent XSS.

_Committed on October 11, 2023_

1. Removed inline styles from all files.

_Committed on October 10, 2023_

1. Modified all views to support media queries.
2. Added Manage view and redesigned route to manage story images.
3. Modified Show and Index views to support managing of story images.
4. Modified Edit and Remove views to update or delete stories (except for images).
5. Modified Story Schema to support Image Schema virtual properties 'cardImage' and 'thumbnail'.
6. Modified Add Stories to Database file to support image upload.

_Committed on October 9, 2023_

1. Updated Add Stories to Database file.
2. Updated Index view to display multiple images using Bootstrap 5 carousel.

_Committed on October 3, 2023_

1. Installed dotenv node module, created .env file to store confidential data.
2. Installed node modules multer and cloudinary and configured them to support image upload.
3. Updated new view, created route and story model to support image upload using cloudinary.

_Committed on October 2, 2023_

1. Updated all files and folders.

_Committed on October 1, 2023_

1. Added star ratings to show view.

_Committed on September 29, 2023_

1. Added controllers and refactored routes of all models.

_Committed on September 27, 2023_

1. Added middleware function to authorize a user to delete a comment.
2. Modified Comment joi schema and mongoose schema to associate Comment Model with User Model.
3. Modified Comment delete route and Story Show view to authorize the user using middleware function.

_Committed on September 24, 2023_

1. Modified Story routes and views to associate Story Model with User Model.
2. Modified Add Stories to Database to associate default stories with a default user.
3. Modified Story joi schema and mongoose schema to associate Story Model with User Model.
4. Added middleware function to authorize a user to edit or delete a story.
5. Modified Story edit and delete routes to authorize the user using middleware function.

_Committed on September 23, 2023_

1. Defined middleware functions to login or logout a user.
2. Modified routes to add protection by authenticating a user.
3. Modified Navbar partial to support login, register, and logout of a user.

_Committed on September 17, 2023_

1. Removed login-signup using Twilio.
2. Defined Mongoose schema, Joi schema, and created User Model.
3. Installed passport, passport-local, passport-local-mongoose node modules.
4. Added Login and Register views, routes to support authentication using Passport.js.

_Committed on September 13, 2023_

1. Installed connect-flash and cors node modules.
2. Added Flash partial to show success and error messages to the user.
3. Modified models, routes, views, layout, and KethiSahayak to support Flash.

_Committed on September 12, 2023_

1. Separated Story and Comment-based routes from KhetiSahayak.
2. Installed express-session node module and configured sessions.
3. Separated Bootstrap Form Validations from the boilerplate layout.

_Committed on September 11, 2023_

1. Removed legacy code from KhetiSahayak.
2. Defined mongoose schema and joi schema for Comment Model.
3. Established a one-to-many relationship between Story and Comment Model.

_Committed on September 7, 2023_

1. Installed morgan node module.
2. Created a utilities folder and added files.
3. Modified KhetiSahayak to support Error Handling.
4. Modified Add Stories to Database and Story Schema.
5. Modified all views and updated PageNotFound to ErrorPage view.

_Committed on September 4, 2023_

1. Modified New and Edit views.
2. Modified boilerplate layout.
3. Added Bootstrap client-side form validations.

_Committed on September 2, 2023_

1. Styled Show and Remove views.

_Committed on September 1, 2023_

1. Modified Update route to support images.
2. Styled New and Edit views.

_Committed on August 31, 2023_

1. Modified boilerplate layout and footer partial.
2. Styled Index, HomePage, and PageNotFound views.
3. Added (seed) image URL into the database.
4. Modified Story Schema and Show view to support images.

_Committed on August 30, 2023_

1. Created a footer using Bootstrap classes.
2. Created a footer partial and added it to the boilerplate layout.

_Committed on August 29, 2023_

1. Created a navbar using Bootstrap classes.
2. Created a navbar partial and added it to the boilerplate layout.
3. Installed ejs-mate node module along with Bootstrap 5.
4. Created a boilerplate layout and added it to every view.
5. Created Remove view.
6. Modified Index and Show views.
7. Simplified Show and Edit routes.
8. Listened to the Server at Remove and Delete routes.

_Committed on August 28, 2023_

1. Created Edit view.
2. Modified Index and Show views.
3. Listened to the Server at Edit and Update routes.
4. Created New view and Modified Index view.
5. Listened to the Server at New and Create routes.
6. Created Show view.
7. Created Index view.
8. Modified HomePage and PageNotFound views.
9. Listened to the Server at Index and Show routes.
10. Defined Story Schema and Created Story Model.
11. Added (seed) Story data into the Database.

_Committed on August 27, 2023_

1. Required Mongoose & Connected to MongoDB using Mongoose.
2. Listened to the Server at the Home route and any other route.
3. Enhanced OTP security from 4-digit pin to 6-digit pin.

_Committed on August 26, 2023_

1. Refactored "Kheti Sahayak.js" and "Login Signup Script.js" files.
2. Searched for better alternatives to Twilio (paid and only for verified numbers).

_Committed on August 22, 2023_

1. Installed dotenv node module.
2. Added mobile OTP verification through Twilio (Paid).

_Committed on August 19, 2023_

1. Initialized NPM.
2. Installed Express, ejs, nodemon, and twilio node modules.
3. Created Server "Kheti Sahayak.js".

_Committed on August 16, 2023_

1. Added OTP to Login Page.
2. Added OTP to Signup Page.

_Committed on August 15, 2023_

1. Styled Login Page.
2. Styled Signup Page.

_Committed on August 13, 2023_

1. Initialized Git.
2. Added Contributors.
3. Updated README file.