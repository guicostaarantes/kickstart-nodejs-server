# NodeJS Rest API Scaffolding

This repo contains a folder structure and example files for a user to kick-start a server using NodeJS, Express and MongoDB.

# Disclaimer

For all of the following functionalities to work, you should consider changing to Visual Studio Code and installing the following extensions:
- ESLint

# Functionalities

- Write ES8 with linting and standardization
  - Execute `npm run build` to transpile your code into ES5 so it supports all versions of NodeJS.
  - Linting and standardization will warn you about double-quotes, bad indentation, etc, to make your code clean and tidy.
  - ESLint rules are set to endorse async/await over promises and callbacks, throwing errors. Those can be changed in `package.json` if you prefer using promises (please don't prefer callbacks :) ).
- Live reload debugging in VSCode
  - For this to work you need to open a terminal and execute `npm run debug-build`.
  - If you want live reload with no debug, simply run `npm run dev`.
- Error handling
  - At `./src/utils/errorHandler.js`, you will find an multitude of error messages to send to the user, which you should extend to meet your project needs.
  - To throw a known error (like wrong password), simply write: `next(new Error(xxx))`, where xxx is the key in the error messages object.
  - You may also specify what errors should be logged in `./error.log`. By default it will log errors whose message is not in any key of the error message object (basically every error that you did not throw) and also errors with message 1001, which are errors you throw but usually require attention.
- JSON schema validator
  - Includes a middleware that validates JSON in request bodies to avoid errors and hacker injections.
  - Create validation schemas following the example in `./src/utils/jsonschema/example.js`. Then import both the validation middleware (`./src/utils/jsonschema/validate.js`) and the schemas to the routes, and use them like the example in `./src/routes/example.js`
- Passport authentication with Password and JsonWebToken
  - Use the password provided by the user to authenticate them and retrieve a token. Then, use the token to access all the endpoints.
  - Use the `jwtMiddleware` function in the routes to check for a token in the header: `{"Authorization": "Bearer INSERT_TOKEN_HERE"}`. If it's valid, the middleware will insert the content of the token in `req.user`.
  - `jwtMiddleware` just checks whether the token is valid (signed and not expired) and whether the user is active. You still need to add extra protection for cases like when only a certain user can do something (i.e.: only a resource owner may update such resource).
  - Important: change the `secretKey` value in `./src/utils/config.js`. For safety, make it large and random, and do not distribute it.
- MongoDB
  - Database choice is highly dependant on your project and your team expertise. A implementation of MongoDB is in this scaffolding just for the sake of making it work out of the box.
  - In case you decide to go on with MongoDB, your collections can be changed by importing `./src/utils/mongodb.js` and using it in an async function (see example in `./src/views/user.js`).
  - No schema related framework like mongoose was implemented, because I believe that JSON schema validation + clean code + testing is enough to guarantee consistency.
