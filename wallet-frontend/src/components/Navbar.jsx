import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "20px" }}>
        Client
      </Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
