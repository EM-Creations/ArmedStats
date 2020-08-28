# ArmedStats Server
Server implementation of ArmedStats.

![Made with NodeJS](https://img.shields.io/badge/Made%20With-NodeJS-green?style=for-the-badge)

## HowTo: Run the server
1. Navigate to `server` and run `npm install`
2. Modify `server/src/config.example.js` to include your MySQL database and user details
3. Rename the `server/src/config.example.js` file to `server/src/config.js`
4. Run the server by typing `node server/src/start.js`

## HowTo: Run server tests
1. Navigate to `server` and run `npm install`
2. Modify `server/test/config.example.js` to include your SQLite database and user details
3. Rename the `server/test/config.example.js` file to `server/test/config.js`
4. Run the tests by typing `npm test`
