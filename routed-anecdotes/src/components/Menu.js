import {Link} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>

      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

export default Menu;
