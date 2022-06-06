const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

const generateId = () => {
  const id = Math.floor(Math.random() * 100000);
  const date = Date.now();

  return id + date;
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "Name missing" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "Number missing" });
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: "Person is already in phonebook" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const totalPersons = persons.length;
  const date = new Date();

  res.send(`
  <p>Phonebook has info for ${totalPersons} people</p>
  <p>${date}</p>
  `);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
