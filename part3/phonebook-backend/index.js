require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('post', (req, res) => JSON.stringify(req.body));

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :post'),
);
app.use(cors());

const generateId = () => {
  const id = Math.floor(Math.random() * 100000);
  const date = Date.now();

  return id + date;
};

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
