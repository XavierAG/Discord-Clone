# Biscord

https://biscord.onrender.com/

## Project Summary

This is a collaborative project emulating user control of Servers, channels to populate Servers, and Messages to populate Channels. We utilized Socket.io to broadcast state changes in the features, so that a one demonstrating user may see the messages of another in real time. To optionally create profile pictures for either Users or the Servers they create, we implemented Amazon Web Services to store User file input into an S3 bucket.

## Screenshots

<!-- Include screenshots of your app in action (once completed). You can embed them using Markdown, like this: -->

![Screenshot 1](screenshot1.png)
![Screenshot 2](screenshot2.png)

## Technologies/Languages/Plugins/APIs Used

- HTML, CSS, JavaScript, Python
- React.js
- Node.js
- Express.js
- PostgreSQL
- Socket.io
- Amazon Web Services S3 Bucket

## To-Dos/Future Features

<!-- Outline any to-do items or future features you plan to add to the project. This could include new functionality, improvements, or bug fixes. -->

- Implement Google Oauth
- CSS adjustments
- Implement Search feature
- Friends full CRUD

## How to Build/Run the Project

<!-- Include detailed instructions on how to build and run your project. This should cover installation instructions, dependencies, and any other relevant setup steps. -->

To build this application locally, you will need the following:

- Node.js v16.20.1
- Python 3.9.4
- Python pip
- Amazon Web Services account and S3 Bucket (Bucket name, key, and secret key are required for the development environment variables)

Instructions:

1. Clone this repository (only branch: main)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. After seeding, to initiate the applicaiton from outside of the pipenv, you can use the command:

   ```bash
   pipenv run flask run
   ```

<!-- ## Technical Implementation Details

Provide insights into the technical aspects of your project. Describe how certain features or components were implemented. You can include code snippets or links to specific parts of your code.

For example, if you implemented user authentication, you can briefly describe the authentication process and provide a link to the relevant code file:

```javascript
// Link to authentication code file -->
