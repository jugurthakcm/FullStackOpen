const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content content={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };
  
  const Header = ({name}) => {
    return <h1>{name}</h1>;
  };
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  
  const Content = ({content}) => {
    return content.map((e) => (
      <Part key={e.id} name={e.name} exercises={e.exercises} />
    ));
  };
  
  const Total = ({parts}) => {
    const total = parts.reduce((acc, val) => acc + val.exercises, 0);
    return <p>Total of {total} exercises</p>;
  };

  export default Course;