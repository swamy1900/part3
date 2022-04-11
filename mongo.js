const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please provide password as argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://bharathj:Bharath@b6@cluster0.bz2or.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3 && name !== '' && number !== '') {
  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(response => {
    console.log('person saved!');
    console.log('response', response);
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}