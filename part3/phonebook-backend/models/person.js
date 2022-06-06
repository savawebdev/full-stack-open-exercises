const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to Mongo DB");

mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo DB: ", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
