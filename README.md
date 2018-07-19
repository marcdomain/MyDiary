# MyDiary

[![Build Status](https://travis-ci.org/marcodynamics/MyDiary.svg?branch=develop)](https://travis-ci.org/marcodynamics/MyDiary) [![Coverage Status](https://coveralls.io/repos/github/marcodynamics/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/marcodynamics/MyDiary?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b7a4ad4cabf47851d01d/maintainability)](https://codeclimate.com/github/marcodynamics/MyDiary/maintainability) 

## Application Description
MyDiary is an online journal where users can pen down their thoughts and feelings.
 <br/><b>UI-pages:</b> https://marcodynamics.github.io/MyDiary/UI
 <br/><b> API documentation: </b> https://mydiary-marc.herokuapp.com/api/v1

## Table of Content

- [Features](#features) <br>
- [Technology](#technology) <br>
- [Installation](#installation) <br>
- [Start](#start) <br>
- [Testing](#testing) <br>
- [API End Points](#api-end-points) <br>

## Features
Below are the features of MyDiary Application

###  Users

- Users can Signup on MyDiary App<br/>
- Users can Signin on MyDiary App<br/>
- Users can Post Diary Entries<br/>
- Users can Get all Diary Entries<br/>
- Users can Get a Diary Entry<br/>
- Users can Modify a Diary Entry<br/>

## Technologies

ES2015: This a widely used version of Javascript
which competes healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more information.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Dummy Database: User data was stored in array objects.

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

## Start
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

<tr><td>POST</td> <td>api/v1/users/signup</td>  <td>Signup a user</td></tr>

<tr><td>POST</td> <td>api/v1/users/signin</td>  <td>Signin a user</td></tr>

<tr><td>GET</td> <td>api/v1/entries</td>  <td>GET all entries</td></tr>

<tr><td>GET</td> <td>api/v1/entries/:entryId</td>  <td>Get an entry</td></tr>

<tr><td>POST</td> <td>api/v1/entries</td>  <td>Post an entry</td></tr>

<tr><td>PUT</td> <td>api/v1/entries/:entryId</td> <td>Modify an entry</td></tr>
    </table>
