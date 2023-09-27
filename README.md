# CLI Program for Fetching and Storing User Data and User Posts

This command-line interface (CLI) program allows you to fetch and store user data and user posts from an external API to a MongoDB database. You can use it to interact with the API and populate your MongoDB database with user information and their associated posts.

## Prerequisites

Before running this CLI program, ensure you have the following prerequisites installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB (and a running MongoDB server)

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone (https://github.com/abhi267266/fetch-user-dummyio.git
   cd <repository-folder>
2. Install the required dependencies:

    ```shell
    npm install
    ```
3.Create a .env file in the root directory of the project and add your environment variables:
```shell
DB_URL=<your-mongodb-connection-url>
APP_ID=<your-api-app-id>

```
Replace <your-mongodb-connection-url> with your MongoDB connection URL and <your-api-app-id> with your API app ID.

#Usage

<strong>Fetch and Store User Data</strong>

#To fetch and store user data from the API, use the following command:

```shell
node fetch.js fetch-users

```
This command will retrieve user data from the API and store it in the MongoDB database.

#Fetch and Store User Posts
To fetch and store user posts from the API for a specific user, use the following command:
```
node cli.js fetch-posts <user-id>
```
Replace <user-id> with the ID of the user whose posts you want to fetch. This command will retrieve the user's posts from the API and store them in the MongoDB database.

#Can be acceced from postman

run:
```
npm start
```
to start the server

to fetch user use this url

```
/fetch-users
```
output message will contain list of all the userid added in the db

to fetch the post of a perticular user use this url

```
/fetch-post/:id
```

it will return you a success message which intern means that we have added the list of post realted to a user
