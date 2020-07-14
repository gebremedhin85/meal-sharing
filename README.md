# meal-sharing
📝 Table of Contents
About
Getting Started
Deployment
Usage
Built Using
TODO
Contributing
Authors
Acknowledgments
🧐 About
This project is an exercise for HackYourFuture students to learn the concepts of full stack development with a focus on the connection between:

Database <--> Webserver

🏁 Getting Started
Check your node/week3 folder in the hyf-homework repo on your computer. If there already is a src folder, package.json etc, then you can just start working in that folder!

If not: copy the code for the template from this folder into the node/week3 folder in your hyf-homework repo on your computer.

Environment variables
All sensitive data like fx passwords and usernames, we dont want to add to git! This problem we solve by having environment variables. Environment variables are not committed to git and have a key value structure.

In the project there is a file called .env.example that has the correct structure. Copy this file and rename the copied file to .env. Now edit the credentials for your database.

The environment variables are then used in node using process.env.DB_HOST, you can see that in the src/server/database.js file.

Prerequisites
Postman
MySQL Workbench
Installing
To install run npm install

🎈 Usage
To run npm run dev

The api can now be found on http://localhost:3000/api/ an example is http://localhost:3000/api/meals

If you go to http://localhost:3000/ is will throw an error, dont mind this error! You will be working only on the api!

⛏️ Built Using
Mysql - Database
Express - Server Framework
NodeJs - Server Environment
✍️ Authors
@benna100 - Idea & Initial work
