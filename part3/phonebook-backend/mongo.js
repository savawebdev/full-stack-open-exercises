const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide all the arguments: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://andrei:${password}@cluster0.r9ulmys.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    if (process.argv.length === 3) {
      Person.find({}).then((res) => {
        res.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });

        return mongoose.connection.close();
      });
    } else {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save().then((res) => {
        console.log(`added ${res.name} number ${res.number} to phonebook`);
        return mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));
