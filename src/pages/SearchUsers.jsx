import { Link } from "react-router-dom";
const SearchUsers = () => {
  return (
    <div>
      <h3>SearchUsers</h3>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchUsers;
