const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

 //Mongo DB conncection
//--------database configuration with Mongoose------------
let databaseUrl = 'mongodb://localhost/week18day3mongoose';
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}else {
  mongoose.connect(databaseUrl)
}
// --end database configuration -------
 var db = mongoose.connection;

 //show any mongoose errors
 db.on('error',function(err){
   console.log('Mongoose Error: ' , err);
 })
//once logged in to the db through mongoose, log a success message 
db.once('open', function(){
  console.log('Mongoose connection successful.')
})
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
