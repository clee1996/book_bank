![Alt Text](https://media.giphy.com/media/8J2MOphsMnQUo/giphy-downsized-large.gif)

# What Problem Was It Solving/ Purpose of this Project

* Purpose of this project was to put all of the technologies that I have learned into one project and to create an application where one can store all of the books that they read and keep track of them.
* Display the Diagram and go more in Depth into the technologies that were used in this project  
<a href="https://app.diagrams.net/#G1-GfLVkZGrDnST3QLuimNgzl35Hn_8Tth" target="_blank">Demo</a>
* Demo the Application

# Data Models (Persons, Books, Foreign Key) and why this was implemented. Explain Routes (REST API) and endpoints.


## Backend
* Poetry for dependencies
* Flask
* Flask-SQLAlchemy for ORM
* Flask-Marshmallow for serializing and deserializing objects for JSON
* Flask-CORS to help with CORS issues
* Flask-JWT-extended to implement authentication
* Flask-Bcrypt to hash passwords and store them into database
* Flask-Migrate to help with migrations to database
## Frontend
* Typescript
* Webpack
* React
* React-Router-Dom


## Discuss Authorization and Authentication and how that was implemented along with protected API endpoints. For example, using JWT tokens and firstly implementing them into localStorage but realizing that could be a security issue and by having access to JavaScript someone can get access to the token.

## Go into some challenges that were introduced with this project

1. Circular Import Errors and restructuring backend files.
2. How to let the frontend know that a user is logged in… learning React Context Api and useReducer


