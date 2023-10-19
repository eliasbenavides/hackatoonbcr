import { Link } from "react-router-dom";
const CreateUser = () => {
  return (
    <div>
      <h3>Create User</h3>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateUser;
