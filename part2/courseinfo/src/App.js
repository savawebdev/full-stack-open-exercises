import Course from "./components/Course";

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
  const course = {
    id: 1,
    name: "Half stack application development",
    parts: [
      {
        name: "Fundamentales of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  //prettier-ignore
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return <Course course={course} />;
};

export default App;
