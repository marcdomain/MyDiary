# MyDiary

[![Build Status](https://travis-ci.org/marcdomain/MyDiary.svg?branch=develop)](https://travis-ci.org/marcodynamics/MyDiary) [![![Coverage Status](https://coveralls.io/repos/github/marcdomain/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/marcdomain/MyDiary?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b7a4ad4cabf47851d01d/maintainability)](https://codeclimate.com/github/marcdomain/MyDiary/maintainability)

## Application Description
MyDiary is an online journal where users can pen down their thoughts and feelings.
 <br/><b>UI-pages:</b> https://marcdomain.github.io/MyDiary/UI
 <br/><b> API documentation: </b> https://mydiary-marc.herokuapp.com/api/v1

## Table of Content

- [Features](#features)
- [Technology](#technologies)
- [Installation](#installation)
- [Start App](#start-mydiary-app)
- [Testing](#testing)
- [API End Points](#api-end-points)

## Features
Below are the features of MyDiary Application

###  Users

- Users can Signup on MyDiary App:
```
     Required Inputs
    {
        name:
        username:
        email:
        password:
    }
```
- Users can Signin on MyDiary App:
```
    Required Inputs
    {
        username:
        password:
    }
```
- Users can Post Diary Entries:
```
    Required Inputs
    {
        title:
        description:
    }
```
- Users can Get all Diary Entries<br/>
- Users can Get a Diary Entry<br/>
- Users can Modify a Diary Entry<br/>
- Users can Delete a Diary Entry<br/>
- Users can Create Reminders:
```
    Required Inputs
    {
        title:
        setdate:
        time:
    }
```
- Users can Delete Reminders

## Technologies

ES6: This a widely used version of Javascript
which competes healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more information.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Postgresql Database: PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone the repository below:
```
https://github.com/Marcodynamics/MyDiary
```
2. cd into the repository:
```
cd MyDiary
```
3. Open the repository in terminal and Install dependencies by running:
```
npm install
```
4. Create Database and run
```
npm creatTables
```

## Start MyDiary App
1. Start the application by running:
```
npm start
```
2. Use Postman to test the API Endpoints


## Testing
- run test using
```
npm test
```

## API End Points

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td>  <td>Signup a user</td></tr>

<tr><td>POST</td> <td>api/v1/auth/login</td>  <td>Login a user</td></tr>

<tr><td>GET</td> <td>api/v1/entries</td>  <td>GET all entries</td></tr>

<tr><td>GET</td> <td>api/v1/entries/:entryId</td>  <td>Get an entry</td></tr>

<tr><td>POST</td> <td>api/v1/entries</td>  <td>Post an entry</td></tr>

<tr><td>PUT</td> <td>api/v1/entries/:entryId</td> <td>Modify an entry</td></tr>

<tr><td>DELETE</td> <td>api/v1/entries/:entryId</td> <td>Delete an entry</td></tr>

<tr><td>POST</td> <td>api/v1/entries/reminders</td> <td>Post a reminder</td></tr>

<tr><td>DELETE</td> <td>api/v1/entries/reminders/:reminderId</td> <td>Delete a reminder</td></tr>
    </table>
