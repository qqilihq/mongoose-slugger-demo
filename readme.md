Slugger for Mongoose Demo Application
=====================================

Demo for [Mongoose Slugger](https://github.com/qqilihq/mongoose-slugger) using [Express](http://expressjs.com).

This service allows adding “users” to the database and creates unique slugs in regard to the `city` property.

## Usage

1. Install dependencies with Yarn

   ```
   $ yarn
   ```

2. Make sure a MongoDB is running at `mongodb://localhost:27017`. Use e.g. Docker:

   ```
   $ docker run -p 27017:27017 --name slugger-demo -d --rm mongo:3.4.6
   ```

3. Start the server

    ```
    $ yarn start
    ```

## Routes

The following routes are defined:

* `GET /users` -- get all users
* `GET /users/:city` -- get all users within a city
* `GET /users/:city/:slug` -- get one specific user
* `POST /users` -- add a new user by `POST`ing JSON data


## Example

1. Create 'John Doe' in Denver. For an empty database, he’ll get the slug `john-doe`:

   ```console
   $ curl -H "Content-Type: application/json" -X POST -d '{ "firstname": "john", "lastname": "doe", "city": "denver" }' http://localhost:3000/users
   {"_id":"5adb08ffaac24808f18fa057","firstname":"john","lastname":"doe","city":"denver","slug":"john-doe","__v":0}
   ```

2. Create another 'John Doe' in Denver. He’ll get the slug `john-doe-2`:

   ```console
   $ curl -H "Content-Type: application/json" -X POST -d '{ "firstname": "john", "lastname": "doe", "city": "denver" }' http://localhost:3000/users
   {"_id":"5adb090faac24808f18fa058","firstname":"john","lastname":"doe","city":"denver","slug":"john-doe-2","__v":0}
   ```

3. Create 'John Doe' in Memphis. He’ll get slug `john-doe`, because there’s no other John Doe in Memphis yet:

   ```console
   $ curl -H "Content-Type: application/json" -X POST -d '{ "firstname": "john", "lastname": "doe", "city": "memphis" }' http://localhost:3000/users
   {"_id":"5adb0926aac24808f18fa059","firstname":"john","lastname":"doe","city":"memphis","slug":"john-doe","__v":0}
   ```

4. Get a specific entry by city and slug (e.g. `john-doe-2` in Denver):

   ```console
   $ curl http://localhost:3000/users/denver/john-doe-2
   {"_id":"5adb090faac24808f18fa058","firstname":"john","lastname":"doe","city":"denver","slug":"john-doe-2","__v":0}
   ```

- - -

Copyright Philipp Katz, [LineUpr GmbH](http://lineupr.com), 2018
