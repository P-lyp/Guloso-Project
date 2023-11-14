const firebase = require("firebase");

const initializeFirebase = (config) => {
    firebase.initializeApp(config);
};

module.exports = { initializeFirebase };
