import './App.css';


const Header = (props) => {
  return (
    <div>
      <h1>
      {props.course.title}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
    <p> 
      <span className="App-span"> Name:</span>  {props.parts[0].name}, 
      <span className="App-span"> Exercise</span> {props.parts[0].exercises}
    </p>

    <p> 
      <span className="App-span"> Name:</span>  {props.parts[1].name}, 
      <span className="App-span"> Exercise</span> {props.parts[1].exercises}
    </p>

    <p> 
      <span className="App-span"> Name:</span>  {props.parts[2].name}, 
      <span className="App-span"> Exercise</span> {props.parts[2].exercises}
    </p>
    </div>
  )
  
}

const Total = ({parts}) => {
  return (
    <div>
      <p>
        <span className="App-span">Number of exercises: </span>  {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </div>
  )
}

function App() {
 
  const course = {
    title: 'Half Stack application development',

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
    <div className="App">
      <Header course = {course} />
      <Content parts = {course['parts']} />
      <Total parts = {course['parts']} />

    </div>
  );
}

export default App;
