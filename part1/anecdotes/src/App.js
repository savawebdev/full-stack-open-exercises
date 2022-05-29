import { useState } from "react";

const MostVotes = ({ anecdotes, votes }) => {
  const index = Object.keys(votes).reduce(
    (a, b) => (votes[a] > votes[b] ? a : b),
    0
  );

  return <p>{anecdotes[index]}</p>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVoteClick = () => {
    if (votes[selected]) {
      setVotes({ ...votes, [selected]: votes[selected] + 1 });
    } else {
      setVotes({ ...votes, [selected]: 1 });
    }
  };

  const displayVotes = votes[selected] ? votes[selected] : 0;

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {displayVotes} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
