# 'Sup Dog

<img src="./assets/logos/'SupDog-Logo.png" align="center" alt="Never Forget logo" width="300">
<br>

**'SupDog** is an events forum designed to help schedule and spread knowledge of events. 'SupDog is a clone that uses [Eventbrite](https://www.eventbrite.com/) as content inpiration and [Popdog](https://popdog.com/) as style inspiration.

## Demo

Here is a working live demo: [https://supdog-app.herokuapp.com/](https://supdog-app.herokuapp.com/)

## Built With

<a href="#Built-With"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>
<a href="#Built-With"><img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" /></a>
<a href="#Built-With"><img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" /></a>
<a href="#Built-With"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<br>
<a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" /></a>
<a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" /></a>
<a href="https://heroku.com/"><img alt="Heroku" src="https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=Heroku&logoColor=white" /></a>
<br>
<a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" /></a>
<a href="https://sequelize.org/"><img alt="Sequelize" src="https://img.shields.io/badge/-Sequelize-336791?style=flat-square" /></a>
<a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=flat-square" /></a>

## Site

### Landing Page

<img src='./assets/screenshots/logged-out-splash.png' >

### User Authentication

#### Login

<img src='./assets/screenshots/login-modal.png' >

#### Signup

<img src='./assets/screenshots/signup-modal.png' >

#### Profile Options

<img src="./assets/screenshots/profile-modal.png">

### Application

#### Event Display

<img src="./assets/screenshots/event-display.gif">

<!-- <img src="./assets/screenshots/logged-in-splash.png">

<img src="./assets/screenshots/event-card.png">

<img src="./assets/screenshots/load-more-events.png"> -->

#### Categories

<img src="./assets/screenshots/categories.gif">

<!-- <img src="./assets/screenshots/categories-bar.png">

<img src="./assets/screenshots/category-view.png"> -->

#### Search

<!-- <img src="./assets/screenshots/search.png"> -->

<img src="./assets/screenshots/search.gif">

#### Event Details

<img src="./assets/screenshots/logged-in-event-detail.png">

#### Event Creation and Edit

<img src="./assets/screenshots/event-create.gif">

<!-- <img src="./assets/screenshots/event-create-details.png">

<img src="./assets/screenshots/event-create-image.png">

<img src="./assets/screenshots/event-create-dates.png">

<img src="./assets/screenshots/event-create-tickets.png"> -->

#### My Events

<img src="./assets/screenshots/my-events.png">

#### My Events

<img src="./assets/screenshots/my-tickets.png">

## Usage

### Development

Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository
- Create a new branch with `git checkout -b feature-branch-name`
- Make appropriate changes to the files and push back to github
- Create a Pull Request
  - Use a clear and descriptive title for the issue to identify the suggestion.
  - Include any relevant issue numbers in the PR body, not the title.
  - Provide a comprehensive description of all changes made.

#### Setting Up and Starting a Local Server

1. Download code and `npm install` in `/backend` to install all node dependencies for backend server
2. Create a psql db user with createdb privileges.
   - Duplicate the `.env.example` for the `dotenv` package.
   - Update the following variables:
     - `PORT` the port that the server will listen to, 8080 by default
     - `DB_USERNAME` the user of the created psql db user
     - `DB_PASSWORD` the password for the psql db user
     - `SESSION_SECRET` a session secret key for encrypting session id's in the database
     - All other variables should remain the same
3. Setup PostgreSQL database
   - Run `npx dotenv sequelize db:create`
   - Run `npx dotenv sequelize db:migrate`
   - Run `npx dotenv sequelize db:seed:all`
4. Setup AWS S3 Buckets.
   - Update `backend/credentials.json` based off the example for your AWS S3 Buckets
5. Start express server by running `npm start` in the `/backend` directory
6. The backend server will start on `http://localhost:5000`
7. Run `npm install` in `/frontend` to install dependencies for frontend server.
8. Run `npm start in the `/frontend` directory
9. The frontend server will be live on `http://localhost:3000` by default

### Bug / Feature Request

We love squashing bugs! If you find one, let our exterminators know by opening an issue [here](https://github.com/sjstark/supdog/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug). Screenshots or recordings greatly help!

If you'd like to request a new feature open up an issue [here](https://github.com/sjstark/supdog/issues). This project was created as part of [App Academy's](https://www.appacademy.io/) coursework, but we love dreaming up of ways to improve our work.

### TODOs

- Right now, this project is lacking server side database ordering. A branch has been started with steps towards implementing this.
- We'd love to go through and tidy up our code. We know theres several locations we can refactor and leave comments for easier use in the future.

## Created By

[Sam Stark](https://github.com/sjstark)
