import {Link} from "react-router-dom";

const Users = ({users}) => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}> {user.name} </Link>
              {user.blogs.length}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
