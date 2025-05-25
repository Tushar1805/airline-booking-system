# Node.js Project Template

This is a base node js project template, which anyonce can use as it has been prepared , by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` &rarr; Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make seperate tests folder)

Lets take a look inside the `src` folder

- `config` &rarr; In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server_config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should alos be done here.

- `routes` &rarr; In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` &rarr; They are jus going to intecept the incoming requests where can write our validators, authenticators etc.

- `controllers` &rarr; They are kind of the last middlewares as post them you call your business layer to execute the busuness logic. In controllers we just receive the incoming requests and data then pass it to the business layer, and once business layer returns the output, we structure the API response in controllers and sent the output.

- `repositories` &rarr; This folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `service` &rarr; Contains the business logic and interacts with repositories for data from the database.

- `utils` &rarr; Contains helper methods, error classess etc

## Setup the project

- Download this template from github and open it in your favourite text editor.
  ``` PORT=<port number of your choice> ```
  ex:
  ``` PORT=3000 ```

- Inside the `src/config` folder create a file named as `config.json` and write the following code:

  ```
    {
        "development": {
            "username": "root",
            "password": "mypassword",
            "database": "database_development",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "test": {
            "username": "root",
            "password": null,
            "database": "database_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": null,
            "database": "database_production",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }

  ```
