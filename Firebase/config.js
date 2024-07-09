const {initializeApp} = require("firebase/app");
const {getAnalytics,isSupported } = require("firebase/analytics");
const {getAuth}  = require("firebase/auth");


const firebaseConfig = {
    apiKey: "AIzaSyAIkDuqKxXI8xAudiygWmWXmEhnVvleJys",
    authDomain: "elixcent-849aa.firebaseapp.com",
    databaseURL: "https://elixcent-849aa-default-rtdb.firebaseio.com",
    projectId: "elixcent-849aa",
    storageBucket: "elixcent-849aa.appspot.com",
    messagingSenderId: "271814045315",
    appId: "1:271814045315:web:7b63656da3fbadad4eb5b6",
    measurementId: "G-FXZSW520NN"
  };
  

  const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const useAuth = getAuth(app); 

  module.exports = { app, analytics, useAuth };