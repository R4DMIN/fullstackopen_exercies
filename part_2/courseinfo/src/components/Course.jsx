const Course = ({course}) => {
    return(
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
    const total = parts.reduce((accumulator, currentValue) => {
      console.log("accumulator", accumulator);
      console.log("currentValue", currentValue);
      return accumulator + currentValue.exercises
    }, 0);
  
    return (
      <>
        <h1>Total Exercies: {total}</h1><br />
  
      </>
    )
  }

  export default Course