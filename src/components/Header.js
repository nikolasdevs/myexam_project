import logo from "../e-logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      {" "}
      <Link to="/">
        <img src={logo} alt="logo" className=" w-16 h-16 my-3 mx-auto" />
      </Link>
    </div>
  );
}
