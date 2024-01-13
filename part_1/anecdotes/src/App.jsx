import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const randomizeAnecdote = () => {
    const min = 0
    const max = anecdotes.length
    const rand = Math.floor(min + Math.random() * (max - min))
    setSelected(rand)
  }

  const voteHandle = (activeAnecdote) => {
    const votesCopy = [...votes]
    votesCopy[activeAnecdote] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <Anecdote title={"Anecdote of the day"} anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => randomizeAnecdote()}>next anecdote</button>
      <button onClick={() => voteHandle(selected)}>vote !</button>
      <Anecdote title={"Anecdote with most votes"} anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{anecdote}</h3>
      has {votes} votes !
    </div>
  )
}

export default App