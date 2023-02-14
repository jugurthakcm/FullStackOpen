import React from "react";

const Persons = ({searchName, persons, handleDelete}) => {
  return (
    <div>
      {searchName
        ? persons
            ?.filter((person) =>
              person.name.toLowerCase().includes(searchName.toLowerCase())
            )
            ?.map((person) => (
              <p key={person._id}>
                {person.name} {person.number} <button onClick={()=>handleDelete(person._id)}>delete</button>
              </p>
            ))
        : persons?.map((person) => (
            <p key={person.name}>
              {person.name} {person.number} <button onClick={()=>handleDelete(person._id)}>delete</button>
            </p>
          ))}
    </div>
  );
};

export default Persons;
