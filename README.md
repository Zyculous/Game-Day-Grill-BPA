# How to build and start the Game Day Grill website

## Prerequisites 

Both MongoDB Community Edition and NodeJS must be installed to use this server.

https://www.mongodb.com/try/download/community

https://nodejs.org/en

## MongoDB Setup

Create a database named `gamedaygrill` with two collections `users` and `reservations`.

You can optionally add `username` as a unique index in the `users` table.

## Setup

Run `npi i` in both the `/client` and `/server` directories.

Create a file names `.env` in the `/server` directory. \
Add an entry named `MONGODB_URI` to the `.env` file that matches your MongoDB connection URI. \
Example: `MONGODB_URI="mongodb://localhost:27017/"`

If the server will be accessed by another computer change the connection URLs in the client-side component files to a URL matching your domain or public IP.

## Starting the Server

If you are using this project in VSCode you can launch both launch profiles.

If you are not using this project in VSCode you can run the following: \
In the `/server` directory: `npm start` \
In the `/client` directory: `npm build; npm start`