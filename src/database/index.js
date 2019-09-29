const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:sweet_nothing159@cluster0-yegnq.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
