import axios from "axios";
import {useEffect, useState} from "react";

const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              {user.name} {user.blogs.length}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
