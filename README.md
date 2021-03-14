# Securing Node.js RESTful APIs with JSON Web Tokens

This API will register the user and login them with valid credentials.
It uses JSON Web Token for authenticating and authorising the users.

POST
http://localhost:3000/register :-  
It is a POST request used to register users. It takes name, email, password and phone number in request body.

POST
http://localhost:3000/login :-  
It is a POST request to login the registered user with their email and password.

GET
http://localhost:3000/home  :-  
It is a GET request. It will direct the user to home page if the user is logged in.

GET
http://localhost:3000/logout  :-  
It is a GET request. It will log out the user.
