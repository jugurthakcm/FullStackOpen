import React from "react";

const Login = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" id="submitLogin" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
