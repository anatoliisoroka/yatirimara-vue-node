const firebase = require('firebase-admin') ;
const serviceAccount = require('./firebase-admin.json');

const admin = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

const userVerify = (idToken) => {
  return new Promise((resolve, reject) => {
     admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
           resolve(decodedToken)
        })
        .catch((error) => {
           // Handle error
           reject(error)
        });
  })
}

module.exports = {admin, userVerify}
