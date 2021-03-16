
const mongoose = require('mongoose');

var Start = require('./src/start');

// Connect to db
  mongoose.connect(
    "mongodb+srv://$USER_ID:$USER_MDP@$DB_ADRESSE.mongodb.net/$DB_NAME?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then( () => {console.log("[", Date(), "] Db connected"); Start().catch(console.log("err in the start"));} )
  .catch( err => console.log("[", Date(), "] Error connecting to db: ", err) );
