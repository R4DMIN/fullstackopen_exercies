import { useState } from "react"

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandle = (answer) => {
    if (answer === 'good') {
      setGood(good + 1)
    }
    if (answer === 'neutral') {
      setNeutral(neutral + 1)
    }
    if (answer === 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <>
      <h1>give feedback</h1>
      <FeedbackButton clickHandle={clickHandle} value={'good'} />
      <FeedbackButton clickHandle={clickHandle} value={'neutral'} />
      <FeedbackButton clickHandle={clickHandle} value={'bad'} />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const FeedbackButton = ({ clickHandle, value }) => {
  return (
    <>
      <button onClick={() => clickHandle(value)}>{value}</button>
    </>
  )
}

const Statistic = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = ((good * 1 + bad * -1) / all).toFixed(1)
  const postive = (good / all * 100).toFixed(1) + "%"

  if (all === 0) {
    return (
      <div>
        <h1>statistic</h1>
        no feedback
      </div>
    )
  }

  return (
    <div>
      <h1>statistic</h1>
      <table>
        <tbody>
          <StatisticLine name={"good"} value={good} />
          <StatisticLine name={"neutral"} value={neutral} />
          <StatisticLine name={"bad"} value={bad} />
          <StatisticLine name={"all"} value={all} />
          <StatisticLine name={"average"} value={avg} />
          <StatisticLine name={"postive"} value={postive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App
