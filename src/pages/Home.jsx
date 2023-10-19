import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>
        <h3>Hackatoon BCR</h3>
      </div>
      <div>
        <Link to={"/create-user"}>
          <button>Crear Usuario</button>
        </Link>
      </div>
      <div>
        <Link to={"search-users"}>
          <button>Buscar Usuario</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
