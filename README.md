# NodeJS Rest API Scaffolding

This repo contain folder structure and example files for a user to quick-start a server using NodeJS, Express and MongoDB.

# Disclaimer

For all of the following functionalities to work, you should consider changing to Visual Studio Code and installing the following extensions:
- ESLint

# Functionalities

- Write ES6 with linting and standardization
  - Execute `npm run build` to tranpile your code into ES5 so it supports all versions of NodeJS. 
  - Linting and standardization will warn you about double-quotes, bad indentation, etc, to make your code clean and tidy.
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
