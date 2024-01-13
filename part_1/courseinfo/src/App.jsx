

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => <Part part={part} key={index} />)}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      Name: {part.name}<br />
      Exercises: {part.exercises}<br />
    </>
  )
}

const Total = ({ parts }) => {
  let total = 0
  parts.map(part => total = total + part.exercises)
  return (
    <>
      <h1>Total Exercies: {total}</h1><br />

    </>
  )
}

export default App
