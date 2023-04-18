const Users = ({users}) => {
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
