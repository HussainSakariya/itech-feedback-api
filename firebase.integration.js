var admin = require("firebase-admin");
var serviceAccount = require("./itechnotion-feedback-firebase-adminsdk-ufin1-f8d886550a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://itechnotion-feedback-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

module.exports = db